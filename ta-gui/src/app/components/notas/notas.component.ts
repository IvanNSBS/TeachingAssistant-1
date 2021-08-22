import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Turma } from "../../../../../common/src/turmas/turma"
@Component({
   selector: 'app-root',
   templateUrl: './notas.component.html',
   styleUrls: ['notas.component.css']
 })
export class CadastroNotas
{
    turma: Turma = new Turma();

    cadastrarNotas() {
        this.turma.alunos.forEach(a => {
            console.log(`Cpf: ${a.cpf} | Nota: ${this.turma.notas[a.cpf]}`)
        })

        let filtered = this.turma.alunos.filter(a => this.turma.notas[a.cpf] === "");
        if(filtered.length > 0)
            confirm("Alguns alunos ainda não tem nota. Deseja continuar mesmo assim?");
    }

    ngOnInit(): void {
    }
}
