import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NotasService } from 'src/app/services/notas.service';
import { Turma } from "../../../../../common/src/turmas/turma"
@Component({
   selector: 'app-root',
   templateUrl: './notas.component.html',
   styleUrls: ['notas.component.css']
 })
export class CadastroNotas implements OnInit
{
    turma: Turma = new Turma();
    constructor(private notaService: NotasService, private router: Router) {}

    cadastrarNotas(): void {
        let filtered = this.turma.alunos.filter(a => this.turma.notas[a.cpf] === "");
        if(filtered.length > 0 && confirm("Alguns alunos ainda não tem nota. Deseja continuar mesmo assim?")) {
            this.subscribePost();
        }
        else{
            this.subscribePost();
        }
    } 

    private subscribePost(){
        this.notaService.postTurma(this.turma)
        .subscribe(
            ar => {
                alert("Cadastrado!")
                this.router.navigateByUrl("/roteiros")
            },
            msg => { alert(msg.message); }
        );
    }

    ngOnInit(): void {
        this.notaService.getTurma()
        .subscribe(
          as => { this.turma = as; },
          msg => { alert(msg.message); }
        );
    }
}
