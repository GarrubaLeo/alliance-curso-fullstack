<template>
    <div class="carteira">
        <h1>Carteira</h1>
        <hr />

        <b-button v-b-modal.compraAtivo>
            <font-awesome-icon icon="shopping-basket"/>
            <span> Comprar</span>
        </b-button>

        <hr />

        <b-table striped hover :items="compras" :fields="fields">
            <template slot="cell(actionAumentaAtivo)" slot-scope="{ item }">
                <b-button v-on:click="beforeAumentaAtivo(item)">
                <font-awesome-icon icon="shopping-cart"/>
                </b-button>
            </template>

            <template slot="cell(actionVendeAtivo)" slot-scope="{ item }">
                <b-button v-on:click="beforeVendeAtivo(item)">
                <font-awesome-icon icon="money-bill"/>
                </b-button>
            </template>
        </b-table>

        <b-modal
            id="compraAtivo"
            title="Comprar Ativo"
            ok-title="Comprar"
            cancel-title="Cancelar"
            @show="beforeNovaCompra"
            @ok="saveNovaCompra"
        >
            <FormCarteira v-model="comprasAtual" />
        </b-modal>
    </div>
</template>

<script>
import axios from 'axios';
import FormCarteira from '../components/FormCarteira'

    export default {
        components: {FormCarteira},

        data: () =>{
            return {
                comprasAtual: {
                    codigoAtivo: '',
                    tipo: '',
                    quantidade: '',
                    preco: '',
                    isNew: true
                },

                compras: [],

                fields: [
                    {
                        key: 'codigoAtivo',
                        label: 'Código'
                    },
                    {
                        key: 'quantidade',
                        label: 'Quantidade'
                    },
                    {
                        key: 'precoMedio',
                        label: 'Preço Médio (R$)'
                    },
                    {
                        key: 'actionAumentaAtivo',
                        label: ''
                    },
                    {
                        key: 'actionVendeAtivo',
                        label: ''
                    }
                ]
            }
        },
        
        methods: {
            async carregaCarteira() {
                this.compras.splice(0, this.compras.length);
                let dados = await axios.get('http://localhost:3000/carteira/');
                this.compras.push(...dados.data);
            },

            beforeNovaCompra() {
                this.comprasAtual.codigoAtivo = '';
                this.comprasAtual.tipo = 'S';
                this.comprasAtual.quantidade = '';
                this.comprasAtual.preco = 0;
                this.comprasAtual.isNew = true;
            },

            async saveNovaCompra() {
                let payload = {
                    codigoAtivo: this.comprasAtual.codigoAtivo,
                    tipo: this.comprasAtual.tipo,
                    quantidade: this.comprasAtual.quantidade,
                    preco: this.comprasAtual.preco
                };

                try{
                    await axios.post('http://localhost:3000/carteira', payload);
                    await this.carregaCarteira();
                } catch (err) {
                    alert('Erro ao comprar novo ativo');
                }
            }
        },

        async mounted() {
            await this.carregaCarteira();
        }
    }
</script>