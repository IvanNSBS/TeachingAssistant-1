import { Component, OnInit } from '@angular/core';
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

  constructor(private roteiroService: RoteiroService) {}

  ngOnInit(): void {
    this.roteiroService.getRoteiros()
          .subscribe(
            as => { this.roteiros = as; console.log("received roteiros: " + as) },
            msg => { alert(msg.message); }
          );
  }
}