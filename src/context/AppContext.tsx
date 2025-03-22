import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { useAgent } from "agents/react";
import { WELCOME_MESSAGE } from "../components/Terminal";

type AppContext = {
  loading: boolean;
  agent?: ReturnType<typeof useAgent<AgentState>>;
  agentState?: AgentState;
  messages: Message[];
  setMessages: any;
  setLoading: any;
};

const AppContext = createContext<AppContext>({
  loading: true,
  agent: undefined,
  messages: [],
  setMessages: () => {},
  setLoading: () => {},
});

type AgentState = {
  history: Message[];
  env: Map<string, string>;
};

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const ContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [agentState, _setAgentState] = useState<AgentState | undefined>();
  const [messages, setMessages] = useState<Message[]>([]);

  const agent = useAgent({
    agent: "clu",
    name: "CLU",
    prefix: "api",
    onOpen: () => {
      setMessages([{ role: "assistant", content: WELCOME_MESSAGE }]);
    },
    onStateUpdate: _setAgentState,
    onMessage: (message) => {
      try {
        console.log("RECEIVED", message);
        const { type, data } = JSON.parse(message.data);
        if (type === "cli") {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content:
                typeof data === "string" ? data : JSON.stringify(data, null, 2),
            },
          ]);
        }
      } catch (error) {
        console.error("Error processing WebSocket message:", error);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Error: Could not process server response.",
          },
        ]);
      }
    },
  });

  return (
    <AppContext.Provider
      value={{ agent, loading, agentState, messages, setMessages, setLoading }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw Error("AppContext was undefined");
  return ctx;
};
