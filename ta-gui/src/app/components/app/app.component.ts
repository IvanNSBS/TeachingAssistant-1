import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { NotasService } from 'src/app/services/notas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ta-gui'
  missingNotas: boolean = false;

  constructor(private notasService: NotasService) {}

  ngOnInit(): void{
    this.notasService.getTurma()
    .subscribe(
      as => { 
        let filtered = as.alunos.filter(a => as.notas[a.cpf] === "");
        this.missingNotas = filtered.length > 0;
      },
      msg => { alert(msg.message); }
    );
  }
}