import { Component, OnInit } from '@angular/core';
import { Turma } from "../../../../../common/src/turmas/turma"
@Component({
   selector: 'app-root',
   templateUrl: './notas.component.html',
   styleUrls: ['notas.component.css']
 })
export class CadastroNotas
{
    turma: Turma = new Turma();

    cadastrarNotas(){
        this.turma.notas.forEach((cpf: String, nota: String)=> {
            console.log(`Cpf: ${cpf} | Nota: ${nota}}`)
        })
    }

    ngOnInit(): void {
        console.log(this.turma)
    }
}
