import { Component, OnInit } from '@angular/core';
import { LixeiraService } from 'src/app/services/lixeira.service';
import { Roteiro } from '../../../../../../common/src/roteiros/roteiro';

@Component({
   selector: 'app-root',
   templateUrl: './lixeira.component.html',
   styleUrls: ['lixeira.component.css', '../../metas/metas.component.css']
 })
export class LixeiraComponent implements OnInit
{
  roteiros: Roteiro[] = [];
  selecionados: boolean[] = []
  algoSelecionado: boolean = false;

  constructor(private lixeiraService: LixeiraService) {}

  algoFoiSelecionado(): void{
    this.algoSelecionado = this.selecionados.filter(a => a === true).length > 0;

    this.selecionados.forEach(a => "selecionado: " + a)
    console.log("slecionado..." + this.algoSelecionado)
  }

  deletarPermanentemente(): void{
    var roteiroIds: string[] = [];
    this.roteiros.forEach((element, index) => {
      if(this.selecionados[index]) 
        roteiroIds.push(element.id);
    });
    
    this.lixeiraService.deletarPermanentemente(roteiroIds).subscribe(
      as => { this.roteiros = this.roteiros.filter(roteiro => !this.containsKey(roteiroIds, roteiro.id)); },
      msg => { alert(msg.message); }
    );
  }

  restaurarRoteiros(): void {
    var roteiroIds: string[] = [];
    this.roteiros.forEach((element, index) => {
      if(this.selecionados[index]) 
        roteiroIds.push(element.id);
    });
    
    this.lixeiraService.restaurarRoteiros(roteiroIds).subscribe(
      as => { this.roteiros = this.roteiros.filter(roteiro => !this.containsKey(roteiroIds, roteiro.id)); },
      msg => { alert(msg.message); }
    );
  }

  private containsKey(keyList: string[], key: string): boolean{
    return keyList.findIndex(k => k == key) !== -1;
  }

  ngOnInit(): void {
    this.lixeiraService.getRoteiros()
          .subscribe(
            as => { 
              this.roteiros = as; 
              this.roteiros.forEach(a => this.selecionados.push(false))
            },
            msg => { alert(msg.message); }
          );
  }
}
