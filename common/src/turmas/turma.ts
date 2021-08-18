import { Aluno } from "../../aluno";

const alunos_db = [
    { 'nome': 'Maria', 'cpf': '705', "email": "maria@cin" },
    { 'nome': 'Cleber', 'cpf': '587', "email": "cleber@cin" },
    { 'nome': 'Francis', 'cpf': '159', "email": "francis@cin" },
    { 'nome': 'Cleiton', 'cpf': '855', "email": "cleiton@cin" },
    { 'nome': 'Isabela', 'cpf': '245', "email": "isa@cin" }
]
export class Turma {
    alunos: Aluno[] = [];
    //map of Aluno CPF and his concept 
    notas: Map<string, string> = new Map<string, string>();

    constructor(){
        alunos_db.forEach( a => {
            let aluno: Aluno = new Aluno();
            aluno.nome = a.nome;
            aluno.cpf = a.cpf;
            aluno.email = a.email

            this.alunos.push( aluno );
            this.notas[a.cpf] = "";
        })
    }
}