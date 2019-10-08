"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aluno_1 = require("../common/aluno");
class CadastroDeAlunos {
    constructor() {
        this.alunos = [];
    }
    cadastrar(aluno) {
        var result = null;
        if (this.cpfNaoCadastrado(aluno.cpf)) { // && this.loginNaoCadastrado(aluno.githubLogin)) {
            result = new aluno_1.Aluno();
            result.copyFrom(aluno);
            this.alunos.push(result);
        }
        return result;
    }
    loginNaoCadastrado(login) {
        return !this.alunos.find(a => a.githubLogin == login);
    }
    cpfNaoCadastrado(cpf) {
        return !this.alunos.find(a => a.cpf == cpf);
    }
    atualizar(aluno) {
        var result = this.alunos.find(a => a.cpf == aluno.cpf);
        if (result)
            result.copyFrom(aluno);
        return result;
    }
    remover(cpf) {
        var previousSize = this.alunos.length;
        this.alunos = this.alunos.filter(a => a.cpf != cpf);
        var newSize = this.alunos.length;
        return newSize != previousSize;
    }
    getAlunos() {
        return this.alunos;
    }
}
exports.CadastroDeAlunos = CadastroDeAlunos;
//# sourceMappingURL=cadastrodealunos.js.map