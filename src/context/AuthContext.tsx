import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContext = {
  CF_API_TOKEN: string;
};

const AuthContext = createContext<AuthContext>({
  CF_API_TOKEN: "",
});

export const AuthContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("auth");
    document.cookie = "X-Auth=" + token + "; path=/";
    console.log(token);
    if (token) setToken(token);
  }, []);

  return (
    <AuthContext.Provider
      value={{ CF_API_TOKEN: token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAppContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw Error("AuthContext was undefined");
  return ctx;
};
