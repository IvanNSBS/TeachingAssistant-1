import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { Router } from "@angular/router"
import { RoteiroService } from 'src/app/services/roteiros.service';
import { Questao } from '../../../../../../common/src/roteiros/questao';
import { Roteiro } from '../../../../../../common/src/roteiros/roteiro';

@Component({
   selector: 'app-root',
   templateUrl: './roteirocreator.component.html',
   styleUrls: ['./roteirocreator.component.css', '../roteiros/roteiros.component.css']
 })
export class RoteiroCreatorComponent
{
  roteiro: Roteiro = new Roteiro("", "", "");
  numberOfQuestions: number = 0;

  constructor(private roteiroService: RoteiroService, private router: Router) {}

  onMove(): void {
  }

  removerQuestao(index: number) {
    this.roteiro.questoes.splice(index, 1);
  }

  adicionarQuestao(){
    this.roteiro.questoes.push(new Questao(""))
  }

  criarRoteiro(): void {
    this.roteiroService.criar(this.clonaRoteiro())
          .subscribe(
            roteiro => {
              if (roteiro) {
                this.roteiro = new Roteiro("", "", "");
                this.router.navigateByUrl("/roteiros")
              } 
              else if(roteiro == null ){
                alert("Já existe um roteiro com este ID")
              } 
            },
            msg => { alert(msg.message); }
          );
  } 
  
  clonaRoteiro(): Roteiro {
    let copiaRoteiro = new Roteiro(this.roteiro.id, this.roteiro.titulo, this.roteiro.metaAssociada);
    this.roteiro.questoes.forEach(q => copiaRoteiro.questoes.push(new Questao(q.enunciado)));
    return copiaRoteiro;
  }
}