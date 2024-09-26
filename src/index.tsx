import React from "react";
import "crypto-browserify";
import ReactDOM from "react-dom/client";
import "./index.css";
import * as buffer from "buffer";
import App from "./App";

window.Buffer = buffer.Buffer;

// @ts-ignore
window.process = {};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
