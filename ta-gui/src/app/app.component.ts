import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { Aluno } from "./aluno";
import { AlunoService } from './aluno.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private alunoService: AlunoService){}
  title = "ta-gui";
  aluno: Aluno = new Aluno();
  alunos: Aluno[] = [];
  cpfCollision: boolean = false;

  criarAluno(a: Aluno): void {
    if (this.alunoService.criar(a)) 
    {
      this.alunos.push(a);
      this.aluno = new Aluno();
    } 
    else 
    {
      this.cpfCollision = true;
    }
  }

  onMove(): void {
    this.cpfCollision = false;
  }
}