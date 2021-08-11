import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { RoteiroService } from 'src/app/services/roteiros.service';
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
  
  constructor(private roteiroService: RoteiroService) {}

  onMove(): void {
    this.conflitoNaCriacao = false;
  }

  criarRoteiro(){
    if(this.roteiro !== undefined){
      console.log("Titulo: " + this.roteiro.titulo)
      console.log("Meta: " + this.roteiro.metaAssociada)
      console.log("Id: " + this.roteiro.id)
    }
  }
}