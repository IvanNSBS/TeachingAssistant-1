import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
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
  conflitoNaCriacao: boolean = false;
  numberOfQuestions: number = 0;

  constructor(private roteiroService: RoteiroService) {}

  onMove(): void {
    this.conflitoNaCriacao = false;
  }

  removerQuestao(index: number) {
    this.roteiro.questoes.splice(index, 1);
  }

  adicionarQuestao(){
    this.roteiro.questoes.push(new Questao(""))
  }

  criarRoteiro(): void{
    if(this.roteiro !== undefined && this.roteiroEValido()){
      let copiaRoteiro: Roteiro = this.clonaRoteiro();
      this.roteiro = new Roteiro("", "", ""); 
    }
  }

  clonaRoteiro(): Roteiro {
    let copiaRoteiro = new Roteiro(this.roteiro.id, this.roteiro.titulo, this.roteiro.metaAssociada);
    this.roteiro.questoes.forEach(q => copiaRoteiro.questoes.push(new Questao(q.enunciado)));
    return copiaRoteiro;
  }

  roteiroEValido(): boolean {
    return this.roteiro.titulo !== "" && this.roteiro.metaAssociada !== "" && this.roteiro.id !== ""; 
  }
}