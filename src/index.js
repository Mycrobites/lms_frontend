import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import "./index.css";
import MediaContextProvider from "./context/MediaContext";
import { UserContextProvider } from "./context/authContext";

ReactDOM.render(
  <React.StrictMode>
  <UserContextProvider>
    <MediaContextProvider>
      <App />
    </MediaContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
