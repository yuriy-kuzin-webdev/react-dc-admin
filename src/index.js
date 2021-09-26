import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { DcContextProvider } from "./store/dc-context";
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <DcContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </DcContextProvider>,
  document.getElementById("root")
);
