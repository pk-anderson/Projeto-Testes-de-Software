let participantes = [];

export function Participante(nome, email) {
    this.nome = nome;
    this.email = email;
}

export function cadastrar(participante){
    let lista = getParticipantes();
    if (lista === null) {
        lista = [];
    }
    lista.push(participante);
    sessionStorage.setItem("lista", JSON.stringify(lista));   
}

export function getParticipantes() {
    let lista = JSON.parse(sessionStorage.getItem("lista"));
    return lista;
}

export function misturarLista(lista) {
    return lista.sort(() => Math.random() - 0.5);
}

export function sortear(lista){
    lista.map((participante, index, lista) => {
        if(index<lista.length-1){
            participante.amigoSecreto = lista[index+1].nome;
        } else {
            participante.amigoSecreto = lista[0].nome;
        }
    });
    sessionStorage.setItem("lista", JSON.stringify(lista)); 
}

export function removerParticipante(lista, posicao) {
    lista.splice(posicao, 1)
    sessionStorage.setItem("lista", JSON.stringify(lista))
}

export function zerarLista(){
    sessionStorage.removeItem("lista");
}