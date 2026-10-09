// Abre o formulario de adicionar
document.getElementById("open-modal").addEventListener('click', () => {
    document.getElementById("add-product-modal").classList.add("active");
})

// Fecha o formulario de adicionar
document.getElementById("close-modal").addEventListener("click", () => {
    document.getElementById("add-product-modal").classList.remove("active");
});

// Fecha o formulario quando apertar cancelar  
document.getElementById("cancel-modal").addEventListener("click", () => {
    document.getElementById("add-product-modal").classList.remove("active");
});

// Fecha o formulario quando clicar fora da div do formulario 
document.getElementById("add-product-modal").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
        document.getElementById("add-product-modal").classList.remove("active");
    }
});

// Fecha o formulario quando apertar Esc  
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        document.getElementById("add-product-modal").classList.remove("active");
    }
});

// Troca tema de light para dark e vice versa
const themeButton = document.getElementById("theme-button");

themeButton.addEventListener("click", () => {
    const html = document.documentElement;
    const theme = html.getAttribute("data-theme");

    if (theme === "dark") {
        html.setAttribute("data-theme", "light");
        themeButton.textContent = "☾";
        themeButton.setAttribute("aria-label", "Ativar tema escuro");
    } else {
        html.setAttribute("data-theme", "dark");
        themeButton.textContent = "☀";
        themeButton.setAttribute("aria-label", "Ativar tema claro");
    }
});


let produtos = [
    {
        id: 1,
        nome: "Monitor",
        loja: "Mercado Livre",
        url: "https://mercadolivre.com.br/...",
        imagem: "assets/images/Foto monitor.webp",
        preco: 829.90,
        precoMaximo: 800.00,
        ultimaAtualizacao: "29/09/2026 às 13:00"
    },
    {
        id: 2,
        nome: "Cadeira do escritorio",
        loja: "Mercado Livre",
        url: "https://mercadolivre.com.br/...",
        imagem: "assets/images/Cadeira ergonomica.webp",
        preco: 494.80,
        precoMaximo: 364.90,
        ultimaAtualizacao: "29/09/2026 às 13:00"
    },
    {
        id: 3,
        nome: "Apple AirPods 4",
        loja: "Mercado Livre",
        url: "https://mercadolivre.com.br/...",
        imagem: "assets/images/airpods4.webp",
        preco: 1190.90,
        precoMaximo: 1250.00,
        ultimaAtualizacao: "29/09/2026 às 13:00"
    },
    {
        id: 4,
        nome: "PlayStation 5 Slim",
        loja: "Mercado Livre",
        url: "https://mercadolivre.com.br/...",
        imagem: "assets/images/ps5.webp",
        preco: 3299.00,
        precoMaximo: null,
        ultimaAtualizacao: "29/09/2026 às 13:00"
    },
];

function exibirMeta(produto) {
    if(produto.precoMaximo === null){
        return "Não definida";
    } 

    return formatarPreco(produto.precoMaximo);
}

function calcularStatus(produto){
    if (produto.preco === null) {
        return "aguardando";
    }

    if(produto.precoMaximo === null){
        return "nao-definido";
    } else if (produto.preco < produto.precoMaximo){
        return "abaixo";
    } else if (produto.preco > produto.precoMaximo){
        return "acima";
    } else {
        return "na-meta";
    }
}

function calcularDiferenca(produto){
    if(produto.precoMaximo === null){
        return null;
    } 

    const diferenca = Math.abs(produto.preco - produto.precoMaximo);
    return diferenca;
}

function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function obterSetaStatus(produto) {
    if(calcularStatus(produto) === "acima"){
        return "↑";
    } else if (calcularStatus(produto) === "abaixo"){
        return "↓";
    } else if (calcularStatus(produto) === "na-meta"){
        return "—";
    } else {
        return "";
    }
}

function obterClasseStatus(produto) {
    if(calcularStatus(produto) === "abaixo" || calcularStatus(produto) === "na-meta"){
        return "status-success";
    } else if(calcularStatus(produto) === "nao-definido" || calcularStatus(produto) === "aguardando"){
        return "status-neutral";
    } else if(calcularStatus(produto) === "acima"){
        if(calcularDiferenca(produto) > 100){
            return "status-error";
        } else {
            return "status-warning";
        }
    }
}

function exibirStatus(produto) {
    const status = calcularStatus(produto);

    if(status === "nao-definido") {
        return "— Sem meta definida";
    }

    if(status === "na-meta") {
        return "= Na meta";
    }

    if(status === "aguardando"){
        return "— Aguardando atualização";
    }

    return `${obterSetaStatus(produto)} ${formatarPreco(calcularDiferenca(produto))} ${status} da meta`;
}

function exibirPreco(produto){
    if(produto.preco === null){
        return "Aguardando atualização";
    } 

    return formatarPreco(produto.preco);
}

function exibirImagem(produto) {
    if (!produto.imagem) {
        return "assets/images/imagem-vazia.png";
    }

    return produto.imagem;
}

const novoCard = document.querySelector(".products-grid");

function criarCardHTML(produto) {
    return `
        <article class="product-card">
            <div class="product-image">
                <img src="${exibirImagem(produto)}" alt="${produto.nome}" />
            </div>

            <div class="product-info">
                <div class="product-top">
                    <h2>${produto.nome}</h2>

                    <div class="product-actions">
                        <button
                            class="menu-button"
                            data-id="${produto.id}"
                            aria-label="Opções do ${produto.nome}"
                            type="button"
                        >
                            ⋮
                        </button>

                        <div class="product-menu">
                            <button
                                type="button"
                                class="delete-product"
                                data-id="${produto.id}"
                            >
                                Excluir
                            </button>
                        </div>
                    </div>

                </div>

                <p class="product-store">${produto.loja}</p>

                <p class="product-price">${exibirPreco(produto)}</p>

                <div class="product-details">
                    <span>Meta: ${exibirMeta(produto)}</span>

                    <span class="status ${obterClasseStatus(produto)}">
                        ${exibirStatus(produto)}
                    </span>
                </div>

                <p class="last-update">
                    Última atualização<br />
                    ${produto.ultimaAtualizacao}
                </p>
            </div>
        </article>
    `;
}

function renderizarProdutos(lista) {
    const cards = lista.map(produto => criarCardHTML(produto));

    const cardsJuntos = cards.join("");

    novoCard.innerHTML = cardsJuntos;
}

renderizarProdutos(produtos);

// =========================== 3 PONTOS =========================== // 

novoCard.addEventListener("click", function(evento) {
    // Clicou nos três pontinhos
    const botaoMenu = evento.target.closest(".menu-button");

    if (botaoMenu) {
        const acoes = botaoMenu.closest(".product-actions");
        const menu = acoes.querySelector(".product-menu");

        menu.classList.toggle("active");
        return;
    }

    // Clicou em Excluir
    const botaoExcluir = evento.target.closest(".delete-product");
    if (botaoExcluir) {
        const id = Number(botaoExcluir.dataset.id);

        const confirmou = confirm(
            "Tem certeza que deseja excluir este produto?"
        );

        if (!confirmou) {
            return;
        }

        produtos = produtos.filter(produto => {
            return produto.id !== id;
        });

        renderizarProdutos(produtos);
}
});

document.addEventListener("click", function(evento) {
    const clicouNasAcoes = evento.target.closest(".product-actions");

    if (!clicouNasAcoes) {
        document.querySelectorAll(".product-menu.active").forEach(menu => {
            menu.classList.remove("active");
        });
    }
});

// =========================== BUSCA =========================== // 

const campoBusca = document.querySelector("#product-search");

campoBusca.addEventListener("input", function () {
    const busca = campoBusca.value.trim().toLowerCase();

    const produtosFiltrados = produtos.filter(produto => {
        return produto.nome.toLowerCase().includes(busca);
    });

    renderizarProdutos(produtosFiltrados);
});

// =========================== FORMULARIO =========================== // 

const formulario = document.querySelector(".product-form");
const mensagemErro = document.querySelector("#form-error");

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    mensagemErro.textContent = "";

    const nome = document.querySelector("#product-name").value.trim();
    const url = document.querySelector("#product-url").value.trim();
    const precoMaximoInput = document.querySelector("#target-price").value;

    let precoMaximo;

    if (precoMaximoInput === "") {
        precoMaximo = null;
    } else {
        precoMaximo = Number(precoMaximoInput);
        if (precoMaximo <= 0) {
            mensagemErro.textContent = "Preço máximo inválido";
            return;
        }
    }

    if (nome.length < 3) {
        mensagemErro.textContent = "Nome inválido";
        return;
    }

    if (!url.includes("mercadolivre.com.br")) {
        mensagemErro.textContent = "Coloque um link do Mercado Livre";
        return;
    }

    const novoId = produtos.length === 0
    ? 1
    : Math.max(...produtos.map(produto => produto.id)) + 1;

    const novoProduto = {
        id: novoId,
        nome: nome,
        loja: "Mercado Livre",
        url: url,
        imagem: null,
        preco: null,
        precoMaximo: precoMaximo,
        ultimaAtualizacao: "Ainda não atualizado"
    };

    produtos.push(novoProduto);
    renderizarProdutos(produtos);
    formulario.reset();

    document.getElementById("add-product-modal").classList.remove("active");
});

