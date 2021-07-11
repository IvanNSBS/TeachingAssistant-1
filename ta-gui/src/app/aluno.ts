export class Aluno {
    nome: string;
    githubLogin: string;
    cpf: string;
    email: string;
  
    constructor(nome: string, githubLogin: string, cpf: string, email: string){
      this.nome = nome;
      this.githubLogin = githubLogin;
      this.cpf = cpf;
      this.email = email;
    }
}