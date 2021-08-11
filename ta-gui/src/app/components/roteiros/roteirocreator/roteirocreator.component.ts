import { Component, OnInit } from '@angular/core';
import { RoteiroService } from 'src/app/services/roteiros.service';
import { Roteiro } from '../../../../../../common/src/roteiros/roteiro';

@Component({
   selector: 'app-root',
   templateUrl: './roteirocreator.component.html',
   styleUrls: ['./roteirocreator.component.css', '../roteiros/roteiros.component.css']
 })
export class RoteiroCreatorComponent
{
  roteiro: Roteiro | undefined = undefined;
  conflitoNaCriacao: boolean = false;
  
  constructor(private roteiroService: RoteiroService) {}

  onMove(): void {
    this.conflitoNaCriacao = false;
  }

  criarRoteiro(){
    if(this.roteiro !== undefined){

    }
  }
}