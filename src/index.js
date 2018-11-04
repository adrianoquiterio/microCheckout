import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import CheckoutBox from './Checkout';
import ProdutoBox from './Produto';
import InicioBox from './Inicio'
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';

ReactDOM.render(
    <Router>
        <App>
            <Switch>            
                <Route exact path="/" component={InicioBox}/>
                <Route path="/Produtos" component={ProdutoBox}/>
                <Route path="/Checkout" component={CheckoutBox}/>                
            </Switch>            
        </App>
    </Router>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
