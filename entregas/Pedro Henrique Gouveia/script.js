console.log("Script carregado com sucesso!")

//======================================================================================================

let materiasDashboardMock = [
    {id: 1, materia: "Engenharia de Software", participantes: 40, horario: "12:00"},
    {id: 2, materia: "Engenharia Civil", participantes: 12, horario: "15:00"},
    {id: 3, materia: "Engenharia Química", participantes: 25, horario: "16:00"},
    {id: 4, materia: "Jogos Digitais", participantes: 30, horario: "9:00"},
    {id: 5, materia: "Educação Física", participantes: 17, horario: "10:00"},
    {id: 6, materia: "Biomecãnica", participantes: 39, horario: "21:00"},
    {id: 7, materia: "Astronomia", participantes: 28, horario: "18:00"}
];

const meunome = "gorfo";

function mensagemDeBoasVindas(nome){
    return `Bem vinda(o), ${nome}!`
};

//======================================================================================================

function mensagemDeVagas(participantes, limite){
    let vagas = limite - participantes;
    if (vagas <= 0){
        return `Não há mais vagas disponíveis.`
    }else{
        return `Há ${vagas} vagas disponíveis.`
    };
};

//======================================================================================================

const titulo = document.querySelector('h1');
titulo.textContent = mensagemDeBoasVindas(meunome);

const lista = document.querySelector(".lista-materias");
const item = document.createElement("li");
item.textContent = "Engenharia de Software";
lista.appendChild(item);

//======================================================================================================

const cardbutao = document.querySelectorAll(".card-button");

cardbutao.forEach((botao) => {
    botao.addEventListener("click", () => {
        console.log("Agora você sabe mais!");
    });
});

const cards = document.querySelectorAll(".card");
cards.forEach((card) => {
    card.addEventListener("click", (event) => {
        event.target.classList.toggle("ativo");
    });
});

//======================================================================================================

const textoJSON = JSON.stringify(materiasDashboardMock);
console.log(textoJSON);

const listaDeVolta = JSON.parse(textoJSON);
console.log(listaDeVolta);

const usuario = {"nome":"Pedro","email":"gorfo@email.com","materias":["Cálculo", "Química"]};
const usuarioJSON = JSON.stringify(usuario)

const usuarioObjeto = JSON.parse(usuarioJSON);
console.log(usuarioObjeto.materias.length)

//======================================================================================================

function criarCardHTML(grupo){
    return `
        <article class="card">
            <h3>${grupo.materia}</h3>
            <p>${grupo.participantes} participantes</p>
            <p>Horário: ${grupo.horario}</p>
            <button class="card-button">Saiba Mais</button>
            <button class="card-button card-remove" onclick="removerMateria(${grupo.id})">Remover Matéria</button>            
        </article>
        `;
};

function removerMateria(id){
    materiasDashboardMock = materiasDashboardMock.filter((m)=> m.id!==id);
    renderLista(materiasDashboardMock);
};

function renderLista(lista){
    const html = lista.map(criarCardHTML).join("");

    document.getElementById("dashboard-cards").innerHTML = html;
};

document.addEventListener('DOMContentLoaded', ()=>{
    renderLista(materiasDashboardMock)
});

document.getElementById("busca").addEventListener("input", function(event) {
    let pesquisado = event.target.value;

    if (pesquisado.trim() === "") {
        renderLista(materiasDashboardMock);
    } else {
        renderLista(filtrarPorBusca(pesquisado));
    }
});

function filtrarPorBusca(termo){
    let filtrados = materiasDashboardMock.filter((item) => {
        return item.materia.toLowerCase().includes(termo.toLowerCase());
    });

    return filtrados;
}
