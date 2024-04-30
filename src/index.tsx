import React from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { Auth0ProviderWithNavigate } from "./Auth0ProviderWithNavigate";


const container = document.getElementById("root") as HTMLElement;

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/*this component is get by auth0 refernce project*/}
      <Auth0ProviderWithNavigate>
        <App />
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </React.StrictMode>
);
