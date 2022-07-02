import React from "react";
import { createRoot } from "react-dom/client";
import "typeface-roboto";
import "./wca_data/cubing-icons.css";
import { getOauthTokenIfAny } from "./logic/auth";

import App from "./components/App/App";

const userToken = getOauthTokenIfAny();

const root = createRoot(document.getElementById("root"));
root.render(<App userToken={userToken} />);
