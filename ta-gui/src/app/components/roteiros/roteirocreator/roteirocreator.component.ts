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
  questoes: Questao[] = []
  conflitoNaCriacao: boolean = false;
  numberOfQuestions: number = 0;

  constructor(private roteiroService: RoteiroService) {}

  onMove(): void {
    this.conflitoNaCriacao = false;
  }

  removerQuestao(index: number) {
    this.questoes.splice(index, 1);
  }

  adicionarQuestao(){
    this.questoes.push(new Questao(""))
  }

  criarRoteiro(): void{
    if(this.roteiro !== undefined && this.roteiroEValido()){
      console.log("Titulo: " + this.roteiro.titulo)
      console.log("Meta: " + this.roteiro.metaAssociada)
      console.log("Id: " + this.roteiro.id)

      this.questoes.forEach( a => console.log(a.enunciado));
    }
  }

  roteiroEValido(): boolean {
    return this.roteiro.titulo !== "" && this.roteiro.metaAssociada !== "" && this.roteiro.id !== ""; 
  }
}