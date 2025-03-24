import React, { useState, useEffect, useRef } from "react";
import "./Terminal.css";
import { useAppContext } from "../context/AppContext";
import LoadingBorderWrapper from "./LoadingBorderWrapper";
import { useAuthContext } from "../context/AuthContext";

export const WELCOME_MESSAGE = `sam@grid:~/$ ./clu.sh\n
Launching Cloudflare Logging Utility...

Securing the edge perimeter... Done.
Accelerating to CDN speed... Done.
Routing traffic through the global network in 3... 2... 1...

Welcome to
:'######::'##::::::::'##::::'##:
'##... ##: ##:::::::: ##:::: ##:
 ##:::..:: ##:::::::: ##:::: ##:
 ##::::::: ##:::::::: ##:::: ##:
 ##::::::: ##:::::::: ##:::: ##:
 ##::: ##: ##:::::::: ##:::: ##:
. ######:: ########::. #######::
:......:::........:::.......::::

`;

enum Prompt {
  Clu = "clu>",
  Host = "sam@grid:~/$",
}

export const AUTH_REQUIRED = `Authorization required.
CLU requires a Cloudflare read-only token. Run \`token create\` to create one.

Once you have one, set it by running \`token set <TOKEN>\`. 
`;

const Terminal: React.FC = () => {
  const { agent, loading, messages, setMessages, setLoading, agentState } =
    useAppContext();
  const { CF_TOKEN, setToken } = useAuthContext();
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [historyIdx, setHistoryIdx] = useState(0);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (!loading && !CF_TOKEN)
      setMessages([{ role: "assistant", content: AUTH_REQUIRED }]);
  }, [CF_TOKEN, loading]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [messages]);

  // Auto-focus input on terminal click
  useEffect(() => {
    const handleClick = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    const terminal = terminalRef.current;
    if (terminal) {
      terminal.addEventListener("click", handleClick);
    }

    return () => {
      if (terminal) {
        terminal.removeEventListener("click", handleClick);
      }
    };
  }, []);

  const processInput = async (userInput: string) => {
    userInput = userInput.trim();
    const cmd = userInput.toLowerCase();

    // Handle clear command
    if (cmd === "clear") {
      setMessages([]);
      return;
    }
    // Add user message to the list
    setMessages((prev: any) => [...prev, { role: "user", content: userInput }]);

    if (cmd === "help") {
      setMessages((prev: any) => [
        ...prev,
        { role: "assistant", content: agentState?.HELP_MESSAGE },
      ]);
      return;
    }

    if (cmd === "token create") {
      setMessages((prev: any[]) => [
        ...prev,
        { role: "assistant", content: "Redirecting...\n" },
      ]);
      window.open("https://dash.cloudflare.com/profile/api-tokens");
      return;
    }

    // Token set
    else if (cmd.startsWith("token set")) {
      const [_token, _set, token] = userInput.split(" ");
      if (token) {
        const res = await fetch("/api/verify", {
          headers: {
            "X-Auth": token,
          },
        });
        if (res.ok) {
          setToken!(token);
          location.reload();
        } else {
          setMessages((prev: any[]) => [
            ...prev,
            { role: "assistant", content: "Invalid token.\n" },
          ]);
        }
        return;
      }
      setMessages((prev: any[]) => [
        ...prev,
        {
          role: "assistant",
          content: "Missing token.\n\nUsage: token set <TOKEN>\n",
        },
      ]);
      return;
    }

    // Send message to WebSocket if connected
    try {
      agent?.send(JSON.stringify({ type: "cli", data: userInput }));
    } catch (error) {
      setMessages((prev: any) => [
        ...prev,
        {
          role: "assistant",
          content: "[Error] Could not send command to server.",
        },
      ]);
    }
  };

  const handleInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "ArrowUp") {
      if (agentState && agentState.history?.length > historyIdx){
        setInput(agentState.history.reverse()[historyIdx]);
        setHistoryIdx(historyIdx + 1);
      }
    } else if (event.key === "ArrowDown") {
      if (agentState && agentState.history && historyIdx > 0){
        setInput(agentState.history.reverse()[historyIdx]);
        setHistoryIdx(historyIdx - 1);
      }
    } else if (event.key === "Enter" && input.trim() !== "") {
      processInput(input);
      setInput("");
    }
  };

  return (
    <LoadingBorderWrapper
      borderColor="var(--color-line)"
      animationSpeed={1.5}
      onFinish={() => {
        setLoading(false);
      }}
    >
      {!loading && (
        <div id="terminal" ref={terminalRef}>
          <div id="messages">
            {messages.map((message, index) => (
              <span key={index} className="message">
                {message.role === "user"
                  ? `${
                      CF_TOKEN && CF_TOKEN !== "" ? Prompt.Clu : Prompt.Host
                    } ${message.content}`
                  : message.content}
              </span>
            ))}
          </div>
          {messages.length === 0 ||
          messages[messages.length - 1]?.role !== "user" ? (
            <div id="input-container">
              <span>
                {CF_TOKEN && CF_TOKEN !== "" ? Prompt.Clu : Prompt.Host}&nbsp;
              </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleInputKeyPress}
                autoComplete="off"
                autoFocus
              />
            </div>
          ) : (
            <>
              {agentState?.status === "thinking" && (
                <span>Exploring parameter hyperspace...</span>
              )}
              {agentState?.status === "fetching" && (
                <span>Downloading configuration grid...</span>
              )}
            </>
          )}
        </div>
      )}
    </LoadingBorderWrapper>
  );
};

export default Terminal;
