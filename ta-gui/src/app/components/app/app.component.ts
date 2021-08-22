import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { NotasService } from 'src/app/services/notas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ta-gui'
  missingNotas: boolean = false;

  constructor(private notasService: NotasService, private router: Router) {}

  private subscribeGetTurmas(){
    this.notasService.getTurma()
    .subscribe(
      as => { 
        console.log("alunos size: " + as.alunos.length)
        let filtered = as.alunos.filter(a => as.notas[a.cpf] === "");
        this.missingNotas = filtered.length > 0;
      },
      msg => { alert(msg.message); }
    );
  }

  ngOnInit(): void{
    this.subscribeGetTurmas();

    this.router.events.subscribe(val => {
      this.subscribeGetTurmas();
    })
  }
}