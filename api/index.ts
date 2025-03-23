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
  HELP_MESSAGE = `CLU let's you nagivate the complexity of the Cloudflare API easily.
Use it as you would use a native CLI client, try what's intuitive. It's pretty smart.
Vibe Clouding.

usage: [cmd] [product] [options]\n`;

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

  async processCmd(socket: WebSocket, cmd: string) {
    try {
      console.log("calling", cmd);
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

      let response: string;
      console.log("result", result);
      if (result && "response" in result) {
        response = (result as AiTextGenerationResult).response;
        if (response === "<help/>") {
          socket.send(JSON.stringify({ type: "cli", data: this.HELP_MESSAGE }));
          return;
        }
        const data = await this.callEndpoint(response);
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
