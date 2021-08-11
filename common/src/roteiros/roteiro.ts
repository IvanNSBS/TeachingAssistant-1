import { Questao } from "./questao";

export class Roteiro {
    titulo: string;
    id: string;
    metaAssociada: string;
    questoes: Questao[]

    constructor(id:string, titulo:string, metaAssociade:string){
        this.id = id;
        this.titulo = titulo;
        this.metaAssociada = metaAssociade;
        this.questoes = [];
    }
}