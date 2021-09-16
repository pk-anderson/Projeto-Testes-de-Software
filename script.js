import {cadastrar, getParticipantes, sortear, Participante, misturarLista, removerParticipante} from "./cadastro.js"

const submitButton = document.querySelector(".submit");
submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    onCadastrar();
})

function emptyInput() {
    document.querySelector("#nome").value = ''
    document.querySelector("#email").value = ''
}

function onCadastrar(){
    let participante = new Participante(
        document.querySelector("#nome").value, 
        document.querySelector("#email").value
        );
    if (participante.nome!='' && participante.email!=''){
        cadastrar(participante);
        emptyInput();
        listarParticipante(participante);
    } else {
        alert("Preencha todos os campos!");
    }
}

function listarParticipante(participante) {
    const listarParticipantes = document.querySelector("#listaparticipantes");
    let lista = getParticipantes();
    
    let span = document.createElement("span")
    span.textContent = `${lista.length} - ${participante.nome}`;
    let liElement = document.createElement("li");
    liElement.setAttribute("id", lista.length - 1);
    liElement.appendChild(span);

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.setAttribute("class", "btn");
    liElement.appendChild(deleteButton);
    liElement.appendChild(deleteButton).addEventListener("click", removeItem)

    listarParticipantes.appendChild(liElement);
}

function removeItem() {
    this.parentNode.remove();
    let lista = getParticipantes();
    let posicao = this.parentNode.id;
    removerParticipante(lista, posicao);
}

const botaoSortear = document.querySelector(".sortear");
botaoSortear.addEventListener("click", (event) => {
    event.preventDefault();
    onSortear();
})

function onSortear() {
    let lista = getParticipantes();
    if(lista.length<3) {
        alert("Número de participantes insuficiente!");
    } else {
        lista = misturarLista(lista);
        sortear(lista);
        mostrarResultado(lista);
    }
}

function mostrarResultado(lista) {
    let resultado = document.querySelector("#resultado");

    let textoResultado = document.createElement("span");
    let resultadoElement = document.createElement("li");
    textoResultado.textContent = "Resultado do sorteio:";
    resultadoElement.appendChild(textoResultado);
    resultado.appendChild(resultadoElement);

    lista.forEach(participante => {
        let liElement = document.createElement("li");
        let span = document.createElement("span");
        span.textContent = `Participante: ${participante.nome} - Amigo secreto: ${participante.amigoSecreto}`;
        liElement.appendChild(span);
        resultado.appendChild(liElement);
    });
}