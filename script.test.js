import {cadastrar, getParticipantes, misturarLista, sortear, zerarLista} from "./cadastro"
import { getRepositorio } from "./repositorio";

jest.mock("./repositorio");

//Testes unitários

test('Cadastrar participante', () => {
    let participante = {
        nome: "Patrick",
        email: "patrick@gmail.com"
    }
    cadastrar(participante);
    let numeroParticipantes = getParticipantes()
    expect(numeroParticipantes.length).toBe(1)
  });

test('Cadastrar participante apenas quando todos os campos estiverem preenchidos', () => {
    let participante = {
        nome: "Patrick",
        email: ""
    }
    let numeroParticipantes = getParticipantes()
    numeroParticipantes.length = 0
    cadastrar(participante)
    expect(numeroParticipantes.length).toBe(0)
  });

test('Atribuir um amigo secreto para cada participante', () => {
  let lista = [{
      nome: "Patrick",
      email: "patrick@gmail.com"
    },
    {
      nome: "Allyson",
      email: "allyson@gmail.com"
    },
    {
      nome: "Diogo",
      email: "diogo@gmail.com"
    }];
  sortear(lista);
  lista.forEach((pessoa) => {
    expect(pessoa.hasOwnProperty("amigoSecreto")).toBe(true);
  })
})

//Teste de integração

describe('Integração entre funcionalidades', () => {
  beforeAll(() => {
    zerarLista();
  });
  test("Inserir participantes e realizar sorteio", () =>{
    let lista = [{
      nome: "Patrick",
      email: "patrick@gmail.com"
    },
    {
      nome: "Allyson",
      email: "allyson@gmail.com"
    },
    {
      nome: "Diogo",
      email: "diogo@gmail.com"
    }];
    
    lista.forEach((pessoa) =>{
      cadastrar(pessoa);
    })
    expect(lista.length).toBe(3)

    misturarLista(lista);
    sortear(lista);
    lista.forEach((pessoa) => {
      expect(pessoa.hasOwnProperty("amigoSecreto")).toBe(true);
    })
  })
})
