// Array que armazena os produtos selecionados
const carrinho = [];

// Seleciona todos os produtos da página
const produtos = document.querySelectorAll(".produto");

// Div onde será exibido o carrinho
const carrinhoDiv = document.getElementById("carrinho");

// Adiciona evento de clique em cada produto
produtos.forEach(produto => {

    produto.addEventListener("click", () => {

        // Nome do produto clicado
        const nome = produto.dataset.produto;

        // Remove do carrinho se já estiver selecionado
        if(carrinho.includes(nome)){

            const index = carrinho.indexOf(nome);

            carrinho.splice(index,1);

            produto.classList.remove("selecionado");

        }else{

            // Adiciona ao carrinho
            carrinho.push(nome);

            produto.classList.add("selecionado");

        }

        // Atualiza a lista do carrinho
        atualizarCarrinho();

    });

});

// Atualiza os produtos exibidos no carrinho
function atualizarCarrinho(){

    // Caso não tenha itens
    if(carrinho.length === 0){

        carrinhoDiv.innerHTML =
        "Nenhum item selecionado";

        return;
    }

    // Exibe os produtos selecionados
    carrinhoDiv.innerHTML =
    carrinho.map(item => `• ${item}`).join("<br>");

}

// Seleciona os rádios de entrega/retirada
const radios =
document.querySelectorAll('input[name="entrega"]');

// Containers das opções
const enderecoContainer =
document.getElementById("enderecoContainer");

const retiradaContainer =
document.getElementById("retiradaContainer");

// Alterna os campos conforme a opção escolhida
function atualizarEntrega(){

    const tipo =
    document.querySelector(
        'input[name="entrega"]:checked'
    ).value;

    if(tipo === "Entrega"){

        enderecoContainer.style.display = "block";

        retiradaContainer.style.display = "none";

    }else{

        enderecoContainer.style.display = "none";

        retiradaContainer.style.display = "block";

    }

}

// Atualiza ao trocar a opção
radios.forEach(radio => {
    radio.addEventListener(
        "change",
        atualizarEntrega
    );
});

// Define o estado inicial
atualizarEntrega();

// Envia o formulário
document
.getElementById("pedidoForm")
.addEventListener(
"submit",
function(e){

    // Impede o recarregamento da página
    e.preventDefault();

    // Obtém os dados do cliente
    const nome =
    document.getElementById("nome").value;

    const telefone =
    document.getElementById("telefone").value;

    const observacao =
    document.getElementById("observacao").value;

    const tipo =
    document.querySelector(
        'input[name="entrega"]:checked'
    ).value;

    // Define endereço ou data/hora
    let entregaInfo = "";

    if(tipo === "Entrega"){

        entregaInfo =
        document.getElementById("endereco").value;

    }else{

        entregaInfo =
        document.getElementById("data").value
        + " " +
        document.getElementById("hora").value;

    }

    // Monta a mensagem do pedido
    const mensagem = `
 NOVO PEDIDO 

 Nome: ${nome}

 Telefone: ${telefone}

 ${tipo}

${tipo === "Entrega"
? "📍 " + entregaInfo
: "📅 " + entregaInfo}

 ITENS

${carrinho.map(item =>
"• " + item).join("\n")}

📝 Observação

${observacao}
`;

    // Número do WhatsApp
    const numeroWhats =
    "5511957958288";

    // Cria o link do WhatsApp
    const url =
    `https://wa.me/${numeroWhats}?text=${encodeURIComponent(mensagem)}`;

    // Abre o WhatsApp
    window.open(
        url,
        "_blank"
    );

});