import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./components/contexts/auth";
import { Rotas } from "./components/Routes";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <Rotas />
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
