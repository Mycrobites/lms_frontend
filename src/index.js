import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import "./index.css";
import MediaContextProvider from "./context/MediaContext";


ReactDOM.render(
 
  <React.StrictMode>
    <MediaContextProvider>
      <App />
    </MediaContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
