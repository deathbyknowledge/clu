import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
} from "react";

type AuthContext = {};

const AuthContext = createContext<AuthContext>({});

export const AuthContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  useEffect(() => {
    const token = localStorage.getItem("auth");
    document.cookie = "X-Auth=" + token + "; path=/";
    console.log(token);
  }, []);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export const useAppContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw Error("AuthContext was undefined");
  return ctx;
};
