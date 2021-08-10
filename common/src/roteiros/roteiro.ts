import { Questao } from "./questao";

export class Roteiro {
    titulo: string;
    id: string;
    metaAssociada: string;
    questoes: Questao[]

    constructor(id, titulo, metaAssociade){
        this.id = id;
        this.titulo = titulo;
        this.metaAssociada = metaAssociade;
    }
}