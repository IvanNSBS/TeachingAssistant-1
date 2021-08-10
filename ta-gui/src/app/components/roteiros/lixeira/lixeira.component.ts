import { Component, OnInit } from '@angular/core';
// import { Aluno } from '../../../../../../common/aluno';

@Component({
   selector: 'app-root',
   templateUrl: './lixeira.component.html',
   styleUrls: ['./lixeira.component.css']
 })
export class LixeiraComponent implements OnInit
{
//   constructor(private alunoService: AlunoService) {}

  ngOnInit(): void {
    // this.alunoService.getAlunos()
    //       .subscribe(
    //         as => { this.alunos = as; },
    //         msg => { alert(msg.message); }
    //       );
  }
}
