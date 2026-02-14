import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline } from "@mui/material"; // Esto limpia estilos viejos del navegador
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CssBaseline /> 
    <App />
  </StrictMode>
);