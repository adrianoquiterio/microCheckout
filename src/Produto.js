import React, {Component} from 'react';
import InputCustom from './componentes/InputCustom';
import PubSub from 'pubsub-js';


class ProdutoFormulario extends Component {

    constructor(){
        super();
        this.state = {codigo : "", valor : "", descricao : ""};
        this.enviaForm = this.enviaForm.bind(this);
    };

    atualizaProduto(campo, evento){
        this.setState({[campo] : evento.target.value});
    };

    enviaForm(evento){
        evento.preventDefault();              
        PubSub.publish("cadastro-produto", this.state);
    };

    render(){
        return (
            <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="POST">
                <fieldset>
                    <InputCustom id="codigo" label="Código" type="text" placeholder="Código do produto" onChange={this.atualizaProduto.bind(this, 'codigo')} value={this.state.codigo}/>
                    <InputCustom id="valor" label="Valor" type="number" placeholder="Valor do produto" step = ".01" onChange={this.atualizaProduto.bind(this, 'valor')} value={this.state.valor}/>
                    <InputCustom id="descricao" label="Descrição" type="text" placeholder="Descrição" onChange={this.atualizaProduto.bind(this, 'descricao')} value={this.state.descricao} />                        
                    <div className="pure-controls">                           
                        <button type="submit" className="pure-button pure-button-primary">Cadastrar</button>
                    </div>
                </fieldset>
            </form> 
        );
    };
};

class ProdutoTabela extends Component {

    constructor(){
        super();
        this.state = { produtos : [
            {
                codigo : 1,
                descricao : 'Primeiro produto',
                valor: 100
            },
            {
                codigo : 2,
                descricao : 'Segundo produto',
                valor: 150
            },
            {
                codigo : 3,
                descricao : 'Terceiro produto',
                valor: 200
            }
    
        ]}
    };

    componentDidMount(){
        PubSub.subscribe("cadastro-produto", function(topico, resposta){
            var estadoAnterior = this.state.produtos;
            estadoAnterior.push(resposta)
            this.setState({produtos : estadoAnterior})
            
            
        }.bind(this));
    };


    render(){
        return (
            <table className="pure-table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Descrição</th>
                        <th>Valor</th>                        
                    </tr>
                </thead>

                <tbody>
                    {
                        this.state.produtos.map(function( produto, indice){
                            return (
                                <tr key={produto.codigo}className={indice % 2 === 0 ? "pure-table-odd" : "" }>
                                    <td>{produto.codigo}</td>
                                    <td>{produto.descricao}</td>
                                    <td>{produto.valor}</td>                                    
                                </tr>
                            );
                        })
                    }                   
                </tbody>
            </table>            
        );
    };
};
export default class ProdutoBox extends Component{
    render(){
        return (
            <div>
                <div className="header">
                    <h1>Produtos</h1>                                                                        
                </div>
                <div>
                    <ProdutoFormulario/> 
                    <ProdutoTabela/>
                </div>
            </div>
            
        );
    };
};