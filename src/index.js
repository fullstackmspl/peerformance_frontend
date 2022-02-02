import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import App from './App';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/style.css';
import { Provider } from 'react-redux';
import store from './store/index';

//axios.defaults.baseURL = 'http://demo.mypeerformance.com:4000/';
axios.defaults.baseURL = 'http://localhost:4000';
// axios.defaults.baseURL = 'http://192.168.1.108:4000';

ReactDOM.render(
    <Provider store={store} >
        <App />
    </Provider>,
    document.getElementById('root')); 
