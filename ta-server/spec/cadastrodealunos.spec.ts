import { CadastroDeAlunos } from '../cadastrodealunos';
import { Aluno } from '../../common/aluno';

describe("O cadastro de alunos", () => {
  var cadastro: CadastroDeAlunos;

  function cadastrarAluno(nome:string, cpf:string) {
    var aluno: Aluno = new Aluno();
    aluno.nome = nome;
    aluno.cpf = cpf;
    cadastro.cadastrar(aluno);
  }

  function removerAluno(cpf: string){
    cadastro.remover(cpf);
  }

  function expectSoUmAluno() {
    expect(cadastro.getAlunos().length).toBe(1);
    var aluno = cadastro.getAlunos()[0];
    return aluno;
  }

  beforeEach(() => cadastro = new CadastroDeAlunos())

  it("é inicialmente vazio", () => {
    expect(cadastro.getAlunos().length).toBe(0);
  })

  it("cadastra alunos corretamente", () => {
    cadastrarAluno("Mariana","683");

    var aluno = expectSoUmAluno();
    expect(aluno.nome).toBe("Mariana");
    expect(aluno.cpf).toBe("683");
    expect(aluno.email).toBe("");
    expect(aluno.metas.size).toBe(0);
  })

  it("não aceita alunos com CPF duplicado", () => {
    cadastrarAluno("Mariana","683");
    cadastrarAluno("Pedro","683");

    var aluno = expectSoUmAluno();
    expect(aluno.nome).toBe("Mariana");
  })

  it("não aceita cpf vazio", () => {
    cadastrarAluno("Mariana", "");
    expect(cadastro.getAlunos().length).toBe(0);
  })

  it("remoção de aluno com cpf inválido não altera alunos", () => {
    cadastrarAluno("Mariana", "683")
    let aluno = expectSoUmAluno();
    expect(aluno.nome).toBe("Mariana");
  })

  it("Aluno é removido corretamente", () => {
    cadastrarAluno("Mariana", "683")
    expectSoUmAluno();
    removerAluno("683");
    expect(cadastro.getAlunos().length).toBe(0);
  })

})