// Dados simulados para o carrinho
const cart = [
  { nome: "Produto A", quantidade: 1, preco: 50.00 },
  { nome: "Produto B", quantidade: 2, preco: 30.00 },
  { nome: "Produto C", quantidade: 1, preco: 20.00 }
];

function atualizarCarrinho() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total');
  cartItemsContainer.innerHTML = '';

  let total = 0;

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
                  <button class="btn btn-sm btn-primary me-1" onclick="alterarQuantidade(${index}, 1)">+</button>
                  <button class="btn btn-sm btn-warning" onclick="alterarQuantidade(${index}, -1)">-</button>
              </td>
          </tr>
      `;
  });

  cartTotalElement.textContent = `R$ ${total.toFixed(2)}`;
}

function alterarQuantidade(index, delta) {
  cart[index].quantidade += delta;
  if (cart[index].quantidade <= 0) {
      cart.splice(index, 1); // Remove o item se a quantidade for 0 ou menos
  }
  atualizarCarrinho();
}

document.getElementById('clear-cart').addEventListener('click', () => {
  cart.length = 0; // Limpa o array do carrinho
  atualizarCarrinho();
});

// Inicializa o carrinho na primeira carga
atualizarCarrinho();
