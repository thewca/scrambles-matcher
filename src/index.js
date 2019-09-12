import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-roboto';
import './wca_data/cubing-icons.css';
import { getOauthTokenIfAny } from './logic/auth';

import App from './components/App/App';

const userToken = getOauthTokenIfAny();
ReactDOM.render(<App userToken={userToken} />, document.getElementById('root'));
