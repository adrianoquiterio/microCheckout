import React, {Component} from 'react';
import InputCustom from './componentes/InputCustom';
import PubSub from 'pubsub-js';

class CheckoutFormulario extends Component{
    constructor(){
        super();
        this.state = { codigo : "" };
        this.enviaForm = this.enviaForm.bind(this);
    };

    atualizaCheckout( campo, evento ){
        this.setState({ [campo] : evento.target.value });
    };

    enviaForm( evento ){
        
        evento.preventDefault();
        this.validaInput( this.state );
    };

    validaInput( state ){
        
        var modelo = [
            { codigo : 1, descricao : 'Produto 1', valor :  1},
            { codigo : 2, descricao : 'Produto 2', valor :  3},
            { codigo : 3, descricao : 'Produto 2', valor :  8}
        ];
        var codigo = state.codigo 
        if( codigo.length <= 0 ){
            throw new Error("Inválido");
        };

        let quantidade = 1;
        let codigoFinal = "";
        if( codigo.indexOf("*") >= 0 ){
            var desmembrado = codigo.split("*");
            if( !isNaN(desmembrado[0]) ) {
                quantidade = Number( desmembrado[0] );
            };
            codigoFinal = desmembrado[1];
        } else {
            codigoFinal = codigo;
        };

        var encontrado = modelo.filter(function( value, index, array ){
            return value.codigo == codigoFinal;
        });
        if( encontrado.length == 0 ){
            //throw new Error("Não achei o produto");
        };

        console.log("quantidade: " + quantidade + " produto: " + JSON.stringify(encontrado) );
        PubSub.publish("produto-inserido", { quantidade : quantidade, produto: encontrado })
    };

    render(){
        return(
            <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="POST">
                <fieldset>
                    <InputCustom id="codigo" label="Quantidade * Codigo" type="text" placeholder="Código do produto" onChange={this.atualizaCheckout.bind(this, 'codigo')} value={this.state.codigo}/>                    
                    <div className="pure-controls">                           
                        <button type="submit" className="pure-button pure-button-primary">Confirmar</button>
                    </div>
                </fieldset>
            </form>           
        );
    };
}

class Totalizador {
    constructor( produtos ){
        this.produtos = produtos;
        this.resultado = { totalBruto : "" , totalDescontos : "" };
    };

    calculaDesconto( totalGeral ){
        return Math.floor( totalGeral / 10);
    };

    calcula(){
        let totalGeral = 0;
        for( let i = 0; i < this.produtos.length; i++ ){
            totalGeral += this.produtos[i].valor;
        };
        var desconto = this.calculaDesconto( totalGeral );

        this.resultado.totalBruto = totalGeral;
        this.resultado.totalDescontos = desconto;
        return this.resultado;
    };
};

class CheckoutResultado extends Component {

    constructor(){
        super();
        this.state = {valorTotal : "", descontoCalculado : "", compra : [{quantidade : 0}]};
        this.calculaTotal = this.calculaTotal.bind(this);
    };

    componentDidMount(){
        this.calculaTotal();
        PubSub.subscribe("produto-inserido", function( topico, resposta ){
            var compraAtual = this.state.compra;
            compraAtual.push({quantidade : resposta.quantidade })
            this.setState( {compra : compraAtual} );
        }.bind(this));
    };
    calculaTotal(){        
        let calculo = new Totalizador([{valor:235}]);
        let resultado = calculo.calcula();
        this.setState( { valorTotal : resultado.totalBruto , descontoCalculado : resultado.totalDescontos });
    };

    render(){
        return(
            <div>
                <h1>Resultados aqui</h1>
                <p>Total do pedido: R$ { this.state.valorTotal } Valor do desconto: R$ {this.state.descontoCalculado}</p>
                {
                    this.state.compra.map(function(item){
                        return ( <h5 >{item.quantidade}</h5> )
                    })
                }
            </div>
        );
    };
};

export default class CheckoutBox extends Component {
    render(){
        return(
            <div>
                <div className="header">
                    <h1>Checkout</h1>                                                                        
                </div>            
                <div>
                    <CheckoutFormulario/>
                    <CheckoutResultado/>
                </div>
            </div>            
        );
    };
};