// Carrega o carrinho do localStorage
function carregarCarrinho() {
    const cartStorage = localStorage.getItem('cart');
    return cartStorage ? JSON.parse(cartStorage) : [];
}

// Atualiza o carrinho no localStorage
function salvarCarrinho(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Atualiza a visualização do carrinho
function atualizarCarrinho() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cart = carregarCarrinho(); // Certifique-se de carregar o carrinho aqui
    cartItemsContainer.innerHTML = ''; // Limpa o carrinho

    let total = 0;

    // Preenche a tabela com os itens do carrinho
    cart.forEach((item, index) => {
        const itemTotal = item.quantidade * item.preco;
        total += itemTotal;

        cartItemsContainer.innerHTML += `
            <tr>
                <td>${item.nome}</td>
                <td>${item.quantidade}</td>
                <td>R$ ${item.preco.toFixed(2)}</td>
                <td>R$ ${itemTotal.toFixed(2)}</td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="alterarQuantidade(${index}, 1)">+</button>
                    <button class="btn btn-sm btn-warning" onclick="alterarQuantidade(${index}, -1)">-</button>
                    <button class="btn btn-sm btn-danger" onclick="removerItem(${index})">Remover</button>
                </td>
            </tr>
        `;
    });

    cartTotalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
}

// Adiciona um item ao carrinho
function adicionarAoCarrinho(nome, preco) {
    const cart = carregarCarrinho();
    const itemExistente = cart.find(item => item.nome === nome);
    if (itemExistente) {
        itemExistente.quantidade += 1; // Se o item já existe, apenas aumenta a quantidade
    } else {
        cart.push({ nome, quantidade: 1, preco }); // Caso contrário, adiciona o item
    }
    salvarCarrinho(cart); // Salva o carrinho no localStorage
    atualizarCarrinho(); // Atualiza a visualização
}

// Alterar a quantidade do item
function alterarQuantidade(index, delta) {
    const cart = carregarCarrinho();
    cart[index].quantidade += delta;
    if (cart[index].quantidade <= 0) {
        cart.splice(index, 1); // Remove o item se a quantidade for 0 ou menos
    }
    salvarCarrinho(cart); // Salva no localStorage
    atualizarCarrinho(); // Atualiza a visualização
}

// Remove um item do carrinho
function removerItem(index) {
    const cart = carregarCarrinho();
    cart.splice(index, 1); // Remove o item do carrinho
    salvarCarrinho(cart); // Salva no localStorage
    atualizarCarrinho(); // Atualiza a visualização
}

// Limpar o carrinho
document.getElementById('clear-cart').addEventListener('click', () => {
    salvarCarrinho([]); // Limpa o carrinho no localStorage
    atualizarCarrinho(); // Atualiza a visualização
});

// Inicializa o carrinho na primeira carga
document.addEventListener('DOMContentLoaded', () => {
    atualizarCarrinho(); // Atualiza o carrinho com os itens do localStorage
});

// Adiciona um produto ao carrinho de exemplo
document.querySelectorAll('.btn-adicionar').forEach((button) => {
    button.addEventListener('click', () => {
        const nomeProduto = button.getAttribute('data-nome');
        const precoProduto = parseFloat(button.getAttribute('data-preco'));
        adicionarAoCarrinho(nomeProduto, precoProduto);
    });
});
document.getElementById("finalizar-compra").addEventListener("click", function () {
    // Seleciona o elemento das opções de retirada e entrega
    const opcoes = document.getElementById("opcoes-retirada-entrega");

    // Alterna a visibilidade das opções
    if (opcoes.classList.contains("collapse")) {
        opcoes.classList.remove("collapse");
    } else {
        opcoes.classList.add("collapse");
    }
});
