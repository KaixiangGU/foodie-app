import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { StateContext } from "./context/StateContext";
import { Provider } from "react-redux";

import store from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StateContext>
      <Provider store={store}>
        <App />
      </Provider>
    </StateContext>
  </React.StrictMode>
);
