import React from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { store } from "./app/store";
import "./assets/style/index.css";
import "./assets/style/output.css";
import reportWebVitals from "./reportWebVitals";
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  //   <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Provider>
  </BrowserRouter>
  //   </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
