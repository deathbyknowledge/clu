import React, { PropsWithChildren, useEffect, useRef } from "react";
import Terminal from "./components/Terminal";
import "./App.css";
import { ContextProvider } from "./context/AppContext";
import LoadingBorderWrapper from "./components/LoadingBorderWrapper";
import { AuthContextProvider } from "./context/AuthContext";

const App: React.FC = () => {
  return (
    <AuthContextProvider>
      <ContextProvider>
        <div
          style={{
            width: "80%",
            height: "80%",
            display: "flex",
            marginRight: "auto",
            marginLeft: "auto",
          }}
        >
          <LoadingBorderWrapper
            borderColor="#9baaa0"
            borderWidth="2px"
            animationSpeed={1.5}
          >
            <div className="app-container">
              <Terminal />
            </div>
          </LoadingBorderWrapper>
        </div>
      </ContextProvider>
    </AuthContextProvider>
  );
};

export default App;
