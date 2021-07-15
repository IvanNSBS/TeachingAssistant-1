import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { Aluno } from '../../../common/aluno';
import { AlunoService } from './aluno.service';

@Component({
   selector: 'app-root',
   templateUrl: './alunos.component.html',
   styleUrls: ['./alunos.component.css']
 })

export class AlunosComponent implements OnInit
{
  aluno: Aluno = new Aluno();
  alunos: Aluno[] = [];
  cpfOuLoginDuplicado: boolean = false;

  constructor(private alunoService: AlunoService) {}

  criarAluno(a: Aluno): void {
    this.alunoService.criar(a)
          .subscribe(
            ar => {
              if (ar) {
                this.alunos.push(ar);
                this.aluno = new Aluno();
              } 
              else if(ar == null ){
                this.cpfOuLoginDuplicado = true;
              } 
            },
            msg => { alert(msg.message); }
          );
  } 

  deletarAluno(a: Aluno): void{
    this.alunoService.deletar(a.cpf).subscribe(
      as => { this.alunos = this.alunos.filter(aluno => a.cpf != aluno.cpf); },
      msg => { alert(msg.message); }
    );
  }

  onMove(): void {
    this.cpfOuLoginDuplicado = false;
  }

  ngOnInit(): void {
    this.alunoService.getAlunos()
          .subscribe(
            as => { this.alunos = as; },
            msg => { alert(msg.message); }
          );

  }
}
