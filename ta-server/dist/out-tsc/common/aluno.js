"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Aluno {
    constructor() {
        this.nome = "";
        this.githubLogin = "";
        this.cpf = "";
        this.email = "";
        this.metas = new Map();
    }
    clone() {
        var aluno = new Aluno();
        aluno.copyFrom(this);
        return aluno;
    }
    copyFrom(from) {
        this.nome = from.nome;
        this.cpf = from.cpf;
        this.email = from.email;
        this.githubLogin = from.githubLogin;
        this.copyMetasFrom(from.metas);
    }
    metasAccess(key, value) {
        this.metas.set(key, value);
    }
    copyMetasFrom(from) {
        this.metas = new Map();
        for (let key in from) {
            this.metas[key] = from[key];
        }
    }
}
exports.Aluno = Aluno;
//# sourceMappingURL=aluno.js.map