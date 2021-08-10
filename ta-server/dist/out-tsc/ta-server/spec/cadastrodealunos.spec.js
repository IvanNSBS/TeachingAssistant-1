"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cadastrodealunos_1 = require("../cadastrodealunos");
const aluno_1 = require("../../common/aluno");
describe("O cadastro de alunos", () => {
    var cadastro;
    function cadastrarAluno(nome, cpf) {
        var aluno = new aluno_1.Aluno();
        aluno.nome = nome;
        aluno.cpf = cpf;
        cadastro.cadastrar(aluno);
    }
    function removerAluno(cpf) {
        cadastro.remover(cpf);
    }
    function expectSoUmAluno() {
        expect(cadastro.getAlunos().length).toBe(1);
        var aluno = cadastro.getAlunos()[0];
        return aluno;
    }
    beforeEach(() => cadastro = new cadastrodealunos_1.CadastroDeAlunos());
    it("é inicialmente vazio", () => {
        expect(cadastro.getAlunos().length).toBe(0);
    });
    it("cadastra alunos corretamente", () => {
        cadastrarAluno("Mariana", "683");
        var aluno = expectSoUmAluno();
        expect(aluno.nome).toBe("Mariana");
        expect(aluno.cpf).toBe("683");
        expect(aluno.email).toBe("");
        expect(aluno.metas.size).toBe(0);
    });
    it("não aceita alunos com CPF duplicado", () => {
        cadastrarAluno("Mariana", "683");
        cadastrarAluno("Pedro", "683");
        var aluno = expectSoUmAluno();
        expect(aluno.nome).toBe("Mariana");
    });
    it("não aceita cpf vazio", () => {
        cadastrarAluno("Mariana", "");
        expect(cadastro.getAlunos().length).toBe(0);
    });
    it("remoção de aluno com cpf inválido não altera alunos", () => {
        cadastrarAluno("Mariana", "683");
        let aluno = expectSoUmAluno();
        expect(aluno.nome).toBe("Mariana");
    });
    it("Aluno é removido corretamente", () => {
        cadastrarAluno("Mariana", "683");
        expectSoUmAluno();
        removerAluno("683");
        expect(cadastro.getAlunos().length).toBe(0);
    });
});
//# sourceMappingURL=cadastrodealunos.spec.js.map