import { Component, OnInit } from '@angular/core';
import { LixeiraService } from 'src/app/services/lixeira.service';
import { Roteiro } from '../../../../../../common/src/roteiros/roteiro';

@Component({
   selector: 'app-root',
   templateUrl: './lixeira.component.html',
   styleUrls: ['./lixeira.component.css']
 })
export class LixeiraComponent implements OnInit
{
  roteiros: Roteiro[] = [];

  constructor(private lixeiraService: LixeiraService) {}

  ngOnInit(): void {
    this.lixeiraService.getRoteiros()
          .subscribe(
            as => { this.roteiros = as; },
            msg => { alert(msg.message); }
          );
  }
}
