<template>
    <div class="usuarios">
        <h1>Usuários</h1>
        <hr />
        <b-button v-b-modal.criaUsuario>
            <font-awesome-icon icon="plus"/> <span> Novo usuário</span>
        </b-button>
        <p></p>

        <b-table striped hover :items="usuarios" :fields="fields">
            <template slot="cell(actionUpdate)" slot-scope="{ item }">
                <b-button v-on:click="beforeAlteraUsuario(item)">
                    <font-awesome-icon icon="pen"/>
                </b-button>
            </template>

            <template slot="cell(actionCompraCredito)" slot-scope="{ item }">
                <b-button v-on:click="beforeCompraCredito(item)">
                    <font-awesome-icon icon="shopping-cart"/>
                </b-button>
            </template>
        </b-table>

        <b-modal
            id="criaUsuario"
            title="Novo Usuário"
            ok-title="Salvar"
            cancel-title="Cancelar"
            @show="beforeNovoUsuario"
            @ok="saveNovoUsuario"        
        >
            <FormUsuario v-model="usuarioAtual"/>
        </b-modal>
    </div>
</template>

<script>
import FormUsuario from '../components/FormUsuario';
import axios from 'axios';

    export default {
        components: { FormUsuario },

        data: () => {
            return {
                usuarioAtual: {
                    codigo: '',
                    nome: '',
                    telefone: '',
                    email: '',
                    saldoCreditos: ''
                },

                usuarios: [],

                fields: [
                    {
                        key: 'nome',
                        label: 'Nome'
                    },
                    {
                        key: 'email',
                        label: 'E-mail'
                    },
                    {
                        key: 'saldoCreditos',
                        label: 'Saldo (R$)'
                    },
                    {
                        key: 'actionUpdate',
                        label: ''
                    },
                    {
                        key: 'actionCompraCredito',
                        label: ''
                    }
                ]
            }
        },

        methods: {
            async carregaUsuarios() {
                this.usuarios.splice(0, this.usuarios.length);
                let dados = await axios.get('http://localhost:3000/usuarios/');
                this.usuarios.push(...dados.data);
            },

            beforeNovoUsuario() {
                this.usuarioAtual.codigo = '';
                this.usuarioAtual.nome = '';
                this.usuarioAtual.telefone = '';
                this.usuarioAtual.email = '',
                this.usuarioAtual.saldoCreditos = ''; 
            },

            async saveNovoUsuario() {
                let payload = {
                    nome: this.usuarioAtual.nome,
                    telefone: this.usuarioAtual.telefone,
                    email: this.usuarioAtual.email,
                    saldoCreditos: this.usuarioAtual.saldoCreditos
                };

                try {
                    await axios.post('http://localhost:3000/usuarios/', payload);
                    await this.carregaUsuarios();
                } catch (err) {
                    alert('Erro ao adicionar usuário')
                }
            }
        },

        async mounted() {
            await this.carregaUsuarios();
        }
    }
</script>