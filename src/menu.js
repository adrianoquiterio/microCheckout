import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class MenuBox extends Component {
    render(){
        return(
            <div>
                {/*<!-- Menu toggle -->*/}
                <a href="#menu" id="menuLink" className="menu-link">
                        { /*<!-- Hamburger icon -->*/}
                        <span></span>
                </a>

                <div id="menu">
                        <div className="pure-menu">
                                <Link className="pure-menu-heading" to="/">Sistema</Link>
                                <ul className="pure-menu-list">
                                        <li className="pure-menu-item"><Link to="/Produtos" className="pure-menu-link">Produtos</Link></li>
                                        <li className="pure-menu-item"><Link to="/Checkout" className="pure-menu-link">CheckOut</Link></li>
                                </ul>
                        </div>
                </div> 
            </div>           
        );
    }
};