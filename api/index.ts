import {
  Agent,
  Connection,
  ConnectionContext,
  getAgentByName,
  WSMessage,
} from "agents";
import cliPrompt from "./prompts/cli";
import grabPrompt from "./prompts/grab";
import { HELP_MESSAGE } from "./constants";
import jmespath from "jmespath";

type State = {
  history: string[];
  env: Map<string, string>;
  API_TOKEN: string;
  HELP_MESSAGE: string;
  status: "ready" | "thinking" | "fetching";
};

// Define types for AI response
interface AiTextGenerationResult {
  response: string;
}

export class Clu extends Agent<Env, State> {
  onStart() {
    this.setState({
      ...this.state,
      env: new Map(),
      HELP_MESSAGE,
      history: [],
      status: "ready",
    });
  }

  onConnect(
    connection: Connection,
    ctx: ConnectionContext
  ): void | Promise<void> {
    const token = ctx.request.headers.get("X-Auth");
    if (!token) {
      console.log("[ERROR] Connection without proper token set");
      connection.close(1, "missing creds, how did they let you in?");
      return;
    }
    this.setState({
      ...this.state,
      API_TOKEN: token,
      status: "ready",
    });
  }

  async onRequest(_request: Request): Promise<Response> {
    return new Response("React to respond.");
  }

  onMessage(connection: Connection, message: WSMessage): void | Promise<void> {
    try {
      if (typeof message === "string") {
        const { type, data } = JSON.parse(message);
        switch (type) {
          case "cli":
            this.processCmd(connection, data);
            break;
          case "kill":
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  shutdown() {
    for (let conn of this.getConnections()) {
      conn.close();
    }
    this.ctx.storage.deleteAll();
    this.ctx.abort("killing...");
  }

  async findSimilarEndpoints(cmd: string, topK = 20) {
    const { data } = await this.env.AI.run(
      "@cf/baai/bge-large-en-v1.5",
      {
        text: [cmd],
      },
      {
        gateway: {
          id: "clu-gateway",
          skipCache: false,
          cacheTtl: 3360,
        },
      }
    );
    const vectors = await this.env.VECTORIZE.query(data[0], {
      returnMetadata: "all",
      topK,
    });

    console.log("You've been RAGged");
    // Build a string with several lines of [endpoint path]:[endpoint description].
    const endpointsRAG = vectors.matches
      .map(({ metadata }) => `${metadata?.path}:${metadata?.description}`)
      .join("\n");
    return endpointsRAG;
  }

  async useGrab(query: string, json: any) {
    const result = await this.env.AI.run(
      "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
      {
        messages: [
          { role: "system", content: grabPrompt },
          {
            role: "user",
            content: `<query>${query}</query>\n<json>${JSON.stringify(
              json
            )}</json>`,
          },
        ],
      },
      {
        gateway: {
          id: "clu-gateway",
          skipCache: false,
          cacheTtl: 3360,
        },
      }
    );

    console.log('grabbed:', result);
    if ("response" in result) return jmespath.search(json, result.response!);
    else return json;
  }

  async processCmd(socket: WebSocket, cmd: string) {
    try {
      let newHistory = [...this.state.history];
      const overflows = newHistory.push(cmd) > 50;
      if (overflows) newHistory.shift();
      this.setState({ ...this.state, history: newHistory, status: "thinking" });
      const needsGrab = cmd.includes("| grab");
      let query;
      if (needsGrab) {
        [cmd, query] = cmd.split('| grab');
      }

      // RAG
      const endpointsRAG = await this.findSimilarEndpoints(cmd);
      let prompt = cliPrompt + `<endpoints>\n${endpointsRAG}\n</endpoints>`;

      const result = await this.env.AI.run(
        "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
        {
          messages: [
            { role: "system", content: prompt },
            { role: "user", content: cmd },
          ],
        },
        {
          gateway: {
            id: "clu-gateway",
            skipCache: false,
            cacheTtl: 3360,
          },
        }
      );

      let response: string;
      console.log("result", result);
      if (result && "response" in result) {
        response = (result as AiTextGenerationResult).response;
        if (response === "<help/>") {
          socket.send(JSON.stringify({ type: "cli", data: HELP_MESSAGE }));
          return;
        }
        this.setState({ ...this.state, status: "fetching" });
        let data = await this.callEndpoint(response);

        if (needsGrab) {
          data = await this.useGrab(query!, data);
        }

        socket.send(JSON.stringify({ type: "cli", data: data }));
      } else {
        socket.send(
          JSON.stringify({
            type: "cli",
            data: "Failed to get response from AI",
          })
        );
        return;
      }
    } catch (error) {
      console.error("AI.run ERROR:", error);
      socket.send(
        JSON.stringify({
          type: "cli",
          data: `Error processing command: ${
            error instanceof Error ? error.message : "Unknown error"
          }`,
        })
      );
    } finally {
      this.setState({ ...this.state, status: "ready" });
    }
  }

  async callEndpoint(endpoint: string) {
    try {
      const response = await fetch(
        `https://api.cloudflare.com/client/v4${endpoint}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.state.API_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      const { success, errors, messages, result } = (await response.json()) as {
        success: boolean;
        result?: unknown;
        errors?: unknown;
        messages?: unknown;
      };
      if (!success) {
        console.log("Failed calling endpoint. Tried to call", endpoint);
        return { errors, messages };
      }
      return result;
    } catch (error) {
      console.error("API error:", error);
      return `Error: ${
        error instanceof Error ? error.message : "Failed to call endpoint"
      }`;
    }
  }
}

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/")) {
      // Verify endpoint for client checks on tokens.
      if (url.pathname === "/api/verify") {
        const token = request.headers.get("X-Auth");
        if (!token) return new Response("missing token", { status: 400 });
        const response = await fetch(
          `https://api.cloudflare.com/client/v4/user/tokens/verify`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data: any = await response.json();
        if (data?.result?.status === "active") {
          return new Response(null, { status: 200 });
        } else {
          return new Response(null, { status: 401 });
        }
      }

      // Authenticate request before connecting to agent.
      const cookie = request.headers
        .get("cookie")
        ?.split(" ")
        .find((val) => val.startsWith("X-Auth"));
      if (!cookie) return new Response("missing auth", { status: 400 });

      let token = cookie.split("=")[1];
      if (token.endsWith(";")) token = token.slice(0, -1);

      const response = await fetch(
        `https://api.cloudflare.com/client/v4/user`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data: any = await response.json();
      if ("error" in data) console.log("[AUTH ERROR]", data.error);
      const cfUserId = data?.result?.id;
      if (!cfUserId) {
        console.log("[ERROR] No user ID found from CF");
        return new Response("ur creds dont work", { status: 403 });
      }

      let newReq = new Request(request.url, {
        method: "GET",
        headers: {
          "X-Auth": token,
          Upgrade: "websocket",
        },
      });
      const namedAgent = getAgentByName<Env, Clu>(env.Clu, cfUserId);
      const namedResp = (await namedAgent).fetch(newReq);
      return namedResp;
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;

// Keeping it here as I might need it at some point. This poor soul of code is what I used to pre-process the endpoints for RAG.
// `endpoints` was an array of  { path: string, description: string }.
// I also pre-processed the endpoints from the OpenAPI schema a little bit. I made sure to update endpoints so the same variables were always
// named the same, e.g. 2 different endpoitns would have `/zones/{zone_id}/...` and `/zone/{zone_tag}/...`. Better for the LLM pattern matching.

/*
    let endpoints = [..._endpoints]; // miniflare kept crashing if I tried to send these ina request, so I put the JSON in a file and read it.

    const BATCH_SIZE = 100;
    let count = 0;
    while (true) {
      // Prepare 100 items to process.
      const endpointsToProcess = endpoints.slice(
        0,
        endpoints.length > BATCH_SIZE ? BATCH_SIZE : endpoints.length
      );

      console.log(`[BATCH ${count}] START PROCESSING`);
      let descriptions: string[] = [];
      let paths: string[] = [];
      endpointsToProcess.forEach(({ path, description }) => {
        descriptions.push(description);
        paths.push(path);
      });

      const { data } = await env.AI.run(
        "@cf/baai/bge-large-en-v1.5",
        {
          text: descriptions,
        },
        {
          gateway: {
            id: "clu-gateway",
            skipCache: false,
            cacheTtl: 3360,
          },
        }
      );
      console.log(`[BATCH ${count}] COMPUTED EMBEDDINGS`);

      const vectorizeInput = data.map((values, idx) => ({
        id: crypto.randomUUID(),
        metadata: { path: paths[idx] },
        values,
      }));
      await env.VECTORIZE.insert(vectorizeInput);
      console.log(`[BATCH ${count}] EMBEDDINGS IN VECTORIZE. NEXT.`);

      if (endpoints.length > BATCH_SIZE)
        endpoints = endpoints.slice(BATCH_SIZE);
      else return new Response("DONE");
    }
  */
