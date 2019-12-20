<template>
    <b-form>
        <b-form-group
            id="input-codigo"
            label="Código"
            label-for="txtCodigo"
            description="Informe o código do ativo"
            :disabled="!content.isNew"
        >
            <b-form-input
                id="txtCodigo"
                v-model="content.codigo"
                type="text"
                required
                placeholder="Código do Ativo"
                @input="handleInput"
                :disabled="!content.isNew"
            />
        </b-form-group>

        <b-form-group
            id="input-quantidadade"
            label="Quantidade de ativos desejados"
            label-for="numQuantidade"
            description="Informe a quantidade de ativos"
        >
            <b-form-input
                id="numQuantidade"
                v-model="content.quantidade"
                type="number"
                required
                placeholder="Digite a quantidade"
                @input="handleInput"
            />
        </b-form-group>  

        <b-form-group
            id="input-preco"
            label="Preço do Ativo (R$)"
            label-for="txtPreco"
            description="Informe o Preço"
        >
            <b-form-input
                id="txtPreco"
                v-model="content.preco"
                type="text"
                required
                placeholder="Digite o preço do ativo"
                @input="handleInput"
            />
        </b-form-group>       
    </b-form>
</template>

<script>
    export default {
        props: ['value'],

        data() {
            return {
                content: {
                    codigo: this.value.codigo,
                    quantidade: this.value.quantidade,
                    preco: this.value.preco,
                    isNew: this.value.isNew
                }
            }
        },

        methods: {
            handleInput() {
                let retorno = {
                    codigo: this.content.codigo,
                    quantidade: this.value.quantidade,
                    preco: this.value.preco,
                    isNew: this.content.isNew
                }
                this.$emit('input', retorno)
            }
        }
    }
</script>