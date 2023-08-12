class CaixaDaLanchonete {

    constructor() {
        this.cardapio = {
            cafe: { descricao: 'Café', valor: 3.0, itemPrincipal: null },
            chantily: { descricao: 'Chantily (extra do Café)', valor: 1.5, itemPrincipal: 'cafe' },
            suco: { descricao: 'Suco Natural', valor: 6.2, itemPrincipal: null },
            sanduiche: { descricao: 'Sanduíche', valor: 6.5, itemPrincipal: null },
            queijo: { descricao: 'Queijo (extra do Sanduíche)', valor: 2.0, itemPrincipal: 'sanduiche' },
            salgado: { descricao: 'Salgado', valor: 7.25, itemPrincipal: null },
            combo1: { descricao: '1 Suco e 1 Sanduíche', valor: 9.5, itemPrincipal: null },
            combo2: { descricao: '1 Café e 1 Sanduíche', valor: 7.5, itemPrincipal: null }
        };
    }

    calcularValorDaCompra(metodoDePagamento, itens) {

        if (!itens || itens.length === 0) {
            return 'Não há itens no carrinho de compra!'
        }

        const formasPagamento = ['dinheiro', 'debito', 'credito']
        if (!formasPagamento.includes(metodoDePagamento)) {
            return 'Forma de pagamento inválida!'
        }

        let valorTotal = 0
        for (const item of itens) {

            const codigoEQuantidade = item.split(',')
            const codigo = codigoEQuantidade[0]
            const quantidade = codigoEQuantidade[1]

            if (!this.cardapio.hasOwnProperty(codigo)) {
                return 'Item inválido!'
            }

            if (!quantidade || quantidade.trim() === '' || quantidade === '0') {
                return 'Quantidade inválida!'
            }

            if (codigo === 'chantily' || codigo === 'queijo') {
                let temItemPrincipal

                for (const itemm of itens) {
                    if (itemm.split(',')[0] === this.cardapio[codigo].itemPrincipal) {
                        temItemPrincipal = true
                    }
                }

                if (!temItemPrincipal) {
                    return 'Item extra não pode ser pedido sem o principal'
                }
            }

            const valorTotalItemComprado = this.cardapio[codigo].valor * quantidade
            valorTotal += valorTotalItemComprado
        }

        if (metodoDePagamento == 'dinheiro') {
            valorTotal *= 0.95

        } else if (metodoDePagamento == 'credito') {
            valorTotal *= 1.03
        }

        return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`
    }
}

export { CaixaDaLanchonete };