<template>
    <b-form>
        <b-form-group
            id="input-nome"
            label="Nome"
            label-for="txtNome"
            description="Informe o seu nome completo"
        >
            <b-form-input
                id="txtNome"
                v-model="content.nome"
                type="text"
                required
                placeholder="Digite o seu nome completo"
                @input="handleInput"
            />
        </b-form-group>

        <b-form-group
            id="input-telefone"
            label="Telefone"
            label-for="txtTelefone"
            description="Informe seu número de telefone"
        >
            <b-form-input
                id="txtTelefone"
                v-model="content.telefone"
                type="text"
                required
                placeholder="Digite seu número de telefone"
                @input="handleInput"
            />
        </b-form-group>    

        <b-form-group
            id="input-email"
            label="E-mail"
            label-for="txtEmail"
            description="Informe seu e-mail"
        >
            <b-form-input
                id="txtEmail"
                v-model="content.email"
                type="text"
                required
                placeholder="Digite o e-mail"
                @input="handleInput"
            />
        </b-form-group> 

        <b-form-group
            id="input-saldoCredito"
            label="Saldo (R$)"
            label-for="numSaldo"
            description="Informe o valor para ser creditado"
        >
            <b-form-input
                id="numSaldo"
                v-model="content.saldoCreditos"
                type="text"
                required
                placeholder="Digite o valor (R$)"
                @input="handleInput"
            />
        </b-form-group>    
    </b-form>
</template>

<script>
    export default {
        props: ['value'],
        data () {
            return {
                content: {
                    codigo: this.value.codigo,
                    nome: this.value.nome,
                    telefone: this.value.telefone,
                    email: this.value.email,
                    saldoCreditos: this.value.saldoCreditos,
                    isNew: this.value.isNew
                }
            }
        },

        methods: {
            handleInput () {
                let retorno = {
                    codigo: this.content.codigo,
                    nome: this.content.nome,
                    telefone: this.content.telefone,
                    email: this.content.email,
                    saldoCreditos: this.content.saldoCreditos,
                    isNew: this.content.isNew
                };
                this.$emit('input', retorno)
            }
        }
    }
</script>