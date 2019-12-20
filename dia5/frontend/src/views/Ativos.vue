<template>
    <div class="ativos">
        <h1>Ativos</h1>
        <hr />

        <b-button v-b-modal.criaAtivo>
            <font-awesome-icon icon="plus"/>
            <span> Adicionar ativo</span>
        </b-button>

        <hr />

        <b-table striped hover :items="ativos" :fields="fields">
            <template slot="cell(actionEdit)" slot-scope="{ item }">
                <b-button v-on:click="beforeEditaAtivo(item)">
                <font-awesome-icon icon="pen"/>
                </b-button>
            </template>

            <template slot="cell(actionDelete)" slot-scope="{ item }">
                <b-button v-on:click="excluirAtivo(item)">
                <font-awesome-icon icon="trash"/>
                </b-button>
            </template>
        </b-table>

        <b-modal
            id="criaAtivo"
            title="Criar Ativo"
            ok-title="Salvar"
            cancel-title="Cancelar"
            @show="beforeNovoAtivo"
            @ok="saveNovoAtivo"
        >
            <FormAtivo v-model="ativosAtual"/>
        </b-modal>

        <b-modal
            id="editarAtivo"
            :title="'Editar Ativo - ' + ativosAtual.codigo"
            ok-title="Atualizar"
            cancel-title="Cancelar"
            @ok="editarAtivo"
        >
            <FormAtivo v-model="ativosAtual"/>
        </b-modal>
    </div>
</template>

<script>
import FormAtivo from '../components/FormAtivo';
import axios from 'axios';

    export default {
        components: { FormAtivo },

        data: () => {
            return {
                ativosAtual: {
                    codigo: '',
                    descricao: '',
                    isNew: true
                },

                ativos: [],

                fields: [
                    {
                        key: 'codigo',
                        label: 'Código'
                    },

                    {
                        key: 'descricao',
                        label: 'Descrição'
                    },
                    {
                        key: 'actionEdit',
                        label: ''
                    },
                    {
                        key: 'actionDelete',
                        label: ''
                    }
                ]
            }
        },

        methods: {
            async carregaAtivos() {
                this.ativos.splice(0, this.ativos.length);
                let dados = await axios.get('http://localhost:3000/ativo/');
                this.ativos.push(...dados.data);
            },

            beforeNovoAtivo() {
                this.ativosAtual.codigo = '';
                this.ativosAtual.descricao = '';
                this.ativosAtual.isNew = true;
            },

            async saveNovoAtivo() {
                let payload = {
                    codigo: this.ativosAtual.codigo,
                    descricao: this.ativosAtual.descricao,
                };

                try{
                    await axios.post('http://localhost:3000/ativo/', payload);
                    await this.carregaAtivos();
                } catch (err) {
                    alert('Erro ao inserir novo ativo')
                }
            },

            beforeEditaAtivo(ativo) {
                this.ativosAtual = {
                    codigo: ativo.codigo,
                    descricao: ativo.descricao,
                    isNew: false
                };
                this.$root.$emit('bv::show::modal', 'editarAtivo')
            },

            async editarAtivo() {
                let payload = {
                    descricao: this.ativosAtual.descricao
                };

                try{
                    await axios.put(`http://localhost:3000/ativo/${this.ativosAtual.codigo}`, payload);
                    await this.carregaAtivos();
                } catch (err) { 
                    alert('Erro ao atualizar ativo');
                }
            },

            async excluirAtivo() {
                try {
                    await axios.delete(`http://localhost:3000/ativo/${this.ativosAtual.codigo}`);
                    await this.carregaAtivos();
                } catch (err) {
                    alert('Erro ao excluir ativo');
                }
            }
        },

        async mounted() {
            await this.carregaAtivos();
        }
    }
</script>