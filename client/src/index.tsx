import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import App from './components/App';
import './css/index.scss';

// Set the base URL for backend API requests
axios.defaults.baseURL = 'http://localhost:4000/';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
