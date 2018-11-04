import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import MenuBox from './menu';

class App extends Component {
	render() {
		return (
            <div id="layout">
                <MenuBox/>
                <div id="main">                    
                    <div className="content">
                        {this.props.children}
                    </div>
                </div>
            </div>			
		);
	}
}

export default App;
