import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { StateContext } from "./context/StateContext";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import store from "./store/store";

const CLIENT_ID = "1048352977453-i02u1k8gqqkg44mlbrq4dnghounhm42p.apps.googleusercontent.com";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId={CLIENT_ID}>
    <StateContext>
      <Provider store={store}>
        <App />
      </Provider>
    </StateContext>
  </GoogleOAuthProvider>
);
