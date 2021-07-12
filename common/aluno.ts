export class Aluno {
  nome: string = "";
  githubLogin: string = "";
  cpf: string = "";
  email: string = "";
  metas: Map<string,string> = new Map<string, string>();

  clone(): Aluno {
    var aluno: Aluno = new Aluno();
    aluno.copyFrom(this);
    return aluno;
  }

  copyFrom(from: Aluno): void {
    this.nome = from.nome;
    this.cpf = from.cpf;
    this.email = from.email;
    this.githubLogin = from.githubLogin;
    this.copyMetasFrom(from.metas);
  }
  
  metasAccess(key: string, value: string): void{
    this.metas.set(key, value);
  }

  copyMetasFrom(from: Map<string,string>): void {
    this.metas = new Map<string,string>();
    for (let key in from) {
      this.metas[key] = from[key];
    }
  }
}