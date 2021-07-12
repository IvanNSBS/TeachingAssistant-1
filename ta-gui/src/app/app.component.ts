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
  title = "ta-gui";
  aluno: Aluno = {nome: "", githubLogin: "", cpf: "", email: ""};
  alunoService = new AlunoService();
  alunos: Aluno[] = [];
  cpfCollision: boolean = false;

  gravar(a: Aluno): void {
    if (this.alunoService.gravar(a)) 
    {
      this.alunos.push(a);
      this.aluno = {nome: "", githubLogin: "", cpf: "", email: ""};
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