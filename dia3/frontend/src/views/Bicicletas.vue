<template>
  <div class="bicicletas">
    <h1>Bicicletas</h1>
    <hr />
    <b-button v-b-modal.criaBicicleta>
      <font-awesome-icon icon="plus"/> <span> Adicionar</span>
    </b-button>

    <p></p>
    <b-table striped hover :items="bicicletas" :fields="fields">
      <template slot="cell(ativo)" slot-scope="{ item: {ativo} }">
        <font-awesome-icon
          :icon="ativo === 'S' ? 'check' : 'times'"
        />
      </template>

      <template slot="cell(actionDelete)" slot-scope="{ item }">
        <b-button v-on:click="beforeExcluirBicicleta(item)">
          <font-awesome-icon icon="trash"/>
        </b-button>
      </template>

      <template slot="cell(actionEdit)" slot-scope="{ item }">
        <b-button v-on:click="beforeEditaBicicleta(item)">
          <font-awesome-icon icon="pen"/>
        </b-button>
      </template>
    </b-table>

    <b-modal 
      id="criaBicicleta" 
      title="Nova Bicicleta" 
      ok-title="Salvar"
      cancel-title="Cancelar"
      @show="beforeNovaBicicleta"
      @ok="saveNovaBicicleta"
      >
      <FormBicicleta v-model="bicicletaAtual"/>
    </b-modal>

    <b-modal
      id="editaBicicleta"
      :title="'Editar Bicicleta - ' + bicicletaAtual.codigo"
      ok-title="Atualizar"
      cancel-title="Cancelar"
      @ok="editarBicicleta"
      >
      <FormBicicleta v-model="bicicletaAtual"/>
    </b-modal>

    <b-modal
      id="excluirBicicleta"
      :title="'Excluir Bicicleta - ' + bicicletaAtual.codigo"
      ok-title="Excluir"
      cancel-title="Cancelar"
      @ok="editarBicicleta"
    >
    </b-modal>
  </div>
</template>

<script>
import FormBicicleta from '../components/FormBicicleta';
import axios from 'axios';

  export default {
    components: { FormBicicleta },

    data: () => {
      return {
        bicicletaAtual: {
          codigo: '',
          ativo: '',
          isNew: true
        },

        bicicletas: [],

        fields: [
          {
            key: 'ativo',
            label: 'Status'
          },
          {
          key: 'codigo',
          label: 'Código'
          },
          {
            key: 'actionDelete',
            label: ''
          },
          {
            key: 'actionEdit',
            label: ''
          }
        ]
      }
    },

    methods: {
      beforeExcluirBicicleta(bicicleta){
        this.bicicletaAtual = {
          codigo: bicicleta.codigo
        };
        this.$root.$emit('bv::show::modal', 'excluirBicicleta')
      },

      async excluirBicicleta() {
        try{
          await axios.delete(`http://localhost:3000/bicicletas/${this.bicicletaAtual.codigo}`);
          await this.carregaBicicletas();
        } catch (err) {
          alert('Erro ao excluir bicicleta');
        }
      },

      beforeEditaBicicleta(bicicleta){
        this.bicicletaAtual = {
          codigo: bicicleta.codigo,
          ativo: bicicleta.ativo,
          isNew: false
        };
        this.$root.$emit('bv::show::modal', 'editaBicicleta');
      },

      async editarBicicleta() {
        let payload = {
          ativo: this.bicicletaAtual.ativo
        };

        try{
          await axios.put(`http://localhost:3000/bicicletas/${this.bicicletaAtual.codigo}`, payload);
          await this.carregaBicicletas();
        } catch (err){
          alert('Erro ao atualizar status da bicicleta');
        }
      },

      async carregaBicicletas() {
        this.bicicletas.splice(0, this.bicicletas.length);
        let dados = await axios.get('http://localhost:3000/bicicletas/');
        this.bicicletas.push(...dados.data);
      },

      beforeNovaBicicleta() {
        this.bicicletaAtual.codigo = '';
        this.bicicletaAtual.ativo = 'S';
        this.bicicletaAtual.isNew = true;
      },
      
      async saveNovaBicicleta() {
        let payload = {
          codigo: this.bicicletaAtual.codigo,
          ativo: this.bicicletaAtual.ativo
        };

        try{
          await axios.post('http://localhost:3000/bicicletas/', payload);
          await this.carregaBicicletas();
        } catch (err){
          alert('Erro ao inserir bicicleta')
        }
      }
    },

    async mounted() {
      await this.carregaBicicletas();
    }
  }
</script>
