import React from 'react';
import { getOauthTokenIfAny } from "../../logic/auth";
import App from "./App";

const userToken = getOauthTokenIfAny();

const Entrypoint = () => {
  return (<App userToken={userToken} />);
}

export default Entrypoint;