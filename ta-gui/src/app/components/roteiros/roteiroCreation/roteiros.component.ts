import { Component, OnInit } from '@angular/core';
// import { Aluno } from '../../../../../../common/aluno';

@Component({
   selector: 'app-root',
   templateUrl: './roteiros.component.html',
   styleUrls: ['./roteiros.component.css']
 })

export class RoteirosComponent implements OnInit
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
