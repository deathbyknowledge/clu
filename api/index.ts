import {
  Agent,
  Connection,
  ConnectionContext,
  getAgentByName,
  WSMessage,
} from "agents";
import cliPrompt from "./prompts/cli";

type State = {
  history: {
    role: "user" | "assistant";
    content: string;
  }[];
  env: Map<string, string>;
  API_TOKEN: string;
};

// Define types for AI response
interface AiTextGenerationResult {
  response: string;
}

export class Clu extends Agent<Env, State> {
  HELP_MESSAGE = `\`clu\` let's you nagivate the complexity of the Cloudflare API easily.
Use it as you would use a native CLI client, try what's intuitive. It's pretty smart.
Vibe Clouding.

usage: [cmd] [product] [options]\n`;

  onStart(): void | Promise<void> {
    this.setState({
      history: [],
      env: new Map(),
      API_TOKEN: "",
    });
  }

  onConnect(
    connection: Connection,
    ctx: ConnectionContext
  ): void | Promise<void> {
    const token = ctx.request.headers.get("X-Auth");
    if (!token) {
      connection.close(1, "missing creds, how did they let you in?");
      return;
    }
    this.setState({ ...this.state, API_TOKEN: token });
  }

  onRequest(_request: Request): Response | Promise<Response> {
    return new Response("React to respond.");
  }

  onMessage(connection: Connection, message: WSMessage): void | Promise<void> {
    try {
      if (typeof message === "string") {
        const { type, data } = JSON.parse(message);
        switch (type) {
          case "cli":
            this.processCmd(connection, data);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  async processCmd(socket: WebSocket, cmd: string) {
    console.log("Processing command: ", cmd);
    try {
      const result = await this.env.AI.run(
        "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
        {
          messages: [
            { role: "system", content: cliPrompt },
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

      // Handle different possible return types from AI
      let response: string;
      if (result && "response" in result) {
        response = (result as AiTextGenerationResult).response;
      } else {
        socket.send(
          JSON.stringify({
            type: "cli",
            data: "Failed to get response from AI",
          })
        );
        return;
      }

      console.log("Found: ", response);

      if (response === "<help/>") {
        socket.send(JSON.stringify({ type: "cli", data: this.HELP_MESSAGE }));
        return;
      }
      const data = await this.callEndpoint(response);
      console.log("Got data: ", data);
      socket.send(JSON.stringify({ type: "cli", data: data }));
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
    }
  }

  async callEndpoint(endpoint: string) {
    try {
      const response = await fetch(
        `https://api.cloudflare.com/client/v4${endpoint}`,
        {
          method: "GET",
          headers: {
            Authorization: this.state.API_TOKEN,
          },
        }
      );

      const responseData = (await response.json()) as {
        result?: unknown;
        error?: unknown;
      };
      if (!responseData.result && responseData.error) {
        return responseData.error;
      }
      return responseData.result;
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
      const cookie = request.headers
        .get("cookie")
        ?.split(" ")
        .find((val) => val.startsWith("X-Auth"));
      if (!cookie) return new Response("missing auth", { status: 400 });

      let token = cookie.split("=")[1];
      console.log(token)
      if (token.endsWith(";")) token = token.slice(0, -1);

      console.log(token)
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
      console.log(data);
      if ("error" in data) console.log(data.error);
      const cfUserId = data?.result?.id;
      if (!cfUserId) return new Response("ur creds dont work", { status: 403 });

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
