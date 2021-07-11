import { Component } from '@angular/core';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "ta-gui";
  aluno: Aluno = {nome: "", cpf: "", email: ""};
}

export class Aluno {
  nome: string;
  cpf: string;
  email: string;

  constructor(nome: string, cpf: string, email: string){
    this.nome = nome;
    this.cpf = cpf;
    this.email = email;
  }
}