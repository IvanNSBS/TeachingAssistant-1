import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoteiroService } from 'src/app/services/roteiros.service';
import { Roteiro } from '../../../../../../common/src/roteiros/roteiro';

@Component({
   selector: 'app-root',
   templateUrl: './roteiros.component.html',
   styleUrls: ['./roteiros.component.css']
 })
export class RoteirosComponent implements OnInit
{
  roteiros: Roteiro[] = [];
  expandido: boolean[] = [];
  
  constructor(private roteiroService: RoteiroService, private _route: ActivatedRoute, private _router: Router) {}

  toggleExpandir(rotId: string): void{
    let roteiroIndex = this.roteiros.findIndex(a => a.id == rotId);
    if(roteiroIndex !== -1){
      this.expandido[roteiroIndex] = !this.expandido[roteiroIndex];
    }
  }
  
  enviarParaLixeira(rotId: string): void{
    this.roteiroService.enviarParaLixeira(rotId).subscribe(
      as => { this.roteiros = this.roteiros.filter(roteiro => roteiro.id != rotId); },
      msg => { alert(msg.message); }
    );
  }

  atualizarRoteiro(rotId: string){
    this._router.navigate(['roteiros/atualizar',rotId]);
  }

  ngOnInit(): void {
    this.roteiroService.getRoteiros()
          .subscribe(
            as => { 
              this.roteiros = as; 
              this.expandido = [];

              this.roteiros.forEach(rot => {
                this.expandido.push(false);
              })
            },
            msg => { alert(msg.message); }
          );
  }
}