import { Aluno } from '../../../common/aluno';

export class CadastroDeAlunos {
  alunos: Aluno[] = [];

  cadastrar(aluno: Aluno): Aluno {
    var result = null;
    if (this.cpfNaoCadastrado(aluno.cpf)){ // && this.loginNaoCadastrado(aluno.githubLogin)) {
      result = new Aluno();
      result.copyFrom(aluno);
      this.alunos.push(result);
    }
    return result;
  }

  loginNaoCadastrado(login: string): boolean {
    return !this.alunos.find(a => a.githubLogin == login);
  }

  cpfNaoCadastrado(cpf: string): boolean {
    return !this.alunos.find(a => a.cpf == cpf);
  }

  atualizar(aluno: Aluno): Aluno {
    var result: Aluno = this.alunos.find(a => a.cpf == aluno.cpf);
    if (result) result.copyFrom(aluno);
    return result;
  }

  remover(cpf: string): boolean {
    var previousSize: number = this.alunos.length;    
    this.alunos = this.alunos.filter(a => a.cpf != cpf)
    var newSize: number = this.alunos.length;
    
    return newSize != previousSize;
  }

  getAlunos(): Aluno[] {
    return this.alunos;
  }
}