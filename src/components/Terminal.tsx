import React, { useState, useEffect, useRef } from "react";
import "./Terminal.css";
import { useAppContext } from "../context/AppContext";
import LoadingBorderWrapper from "./LoadingBorderWrapper";

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

const Terminal: React.FC = () => {
  const { agent, loading, messages, setMessages, setLoading } =
    useAppContext();
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

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

  const processInput = (userInput: string) => {
    userInput = userInput.trim();

    // Handle clear command
    if (userInput.toLowerCase() === "clear") {
      setMessages([]);
      return;
    }

    // Add user message to the list
    setMessages((prev: any) => [...prev, { role: "user", content: userInput }]);

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
    if (event.key === "Enter" && input.trim() !== "") {
      processInput(input);
      setInput("");
    }
  };

  return (
    <LoadingBorderWrapper
      borderColor="var(--color-line)"
      animationSpeed={1.5}
      onFinish={() => {
        console.log("meow");
        setLoading(false);
      }}
    >
      {!loading && (
        <div id="terminal" ref={terminalRef}>
          <div id="messages">
            {messages.map((message, index) => (
              <span key={index} className="message">
                {message.role === "user"
                  ? `clu> ${message.content}`
                  : message.content}
              </span>
            ))}
          </div>
          {(messages.length === 0 ||
            messages[messages.length - 1]?.role !== "user") && (
            <div id="input-container">
              <span>{"clu>"}&nbsp;</span>
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
          )}
        </div>
      )}
    </LoadingBorderWrapper>
  );
};

export default Terminal;
