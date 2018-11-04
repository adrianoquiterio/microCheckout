import React, {Component} from 'react';

export default class InputCustom extends Component {
    render(){
        return(
            <div className="pure-control-group">
            <label htmlFor={this.props.id}>{this.props.label}</label>               
                <input {...this.props}/>                
                <span className="pure-form-message-inline">Campo obrigatório.</span>
            </div>
        );
    };
};