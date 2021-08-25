import React from 'react';
import ReactDOM from 'react-dom';
import './Stylesheets/App.css';
import './Stylesheets/index.css';
import './Stylesheets/styles.css';
import './Stylesheets/tooltips.css';
import './Stylesheets/pure-min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

{/* <script async src="https://nwdb.info/embed.js"></script> */}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
