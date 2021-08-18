import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router"
import { RoteiroService } from 'src/app/services/roteiros.service';
import { Questao } from '../../../../../../common/src/roteiros/questao';
import { Roteiro } from '../../../../../../common/src/roteiros/roteiro';

@Component({
   selector: 'app-root',
   templateUrl: './roteiroatualizar.component.html',
   styleUrls: ['./roteiroatualizar.component.css', '../roteiros/roteiros.component.css']
 })
export class RoteiroAtualizarComponent
{
  roteiro: Roteiro = new Roteiro("", "", "");
  numberOfQuestions: number = 0;
  camposVazios: boolean[] = [false, false, false]

  constructor(private roteiroService: RoteiroService, private router: Router, private _route: ActivatedRoute) {}

  onMove(): void {
    this.camposVazios = [false, false, false];
  }

  removerQuestao(index: number) {
    this.roteiro.questoes.splice(index, 1);
  }

  adicionarQuestao(){
    this.roteiro.questoes.push(new Questao(""))
  }

  private getRoteiro(id: string | null){
    this.roteiroService.getRoteiro(id).subscribe(res => this.roteiro = res);
    //console.log(this.roteiro);
  }

  ngOnInit(){
    this._route.paramMap.subscribe(parameterMap => {
      if(parameterMap.get('id')){
        const id = parameterMap.get('id');
        this.getRoteiro(id);
      }
    })
  }

  atualizarRoteiro(): void {
    if(this.roteiro.titulo === "")
      this.camposVazios[0] = true;
    if(this.roteiro.metaAssociada === "")
      this.camposVazios[1] = true;
    if(this.roteiro.id === "")
      this.camposVazios[2] = true;

    if(this.camposVazios.findIndex(a => a) !== -1)
      return;

    this.roteiroService.atualizar(this.clonaRoteiro()).subscribe(
      (a) => { 
        if (a == null) {
          alert("Erro ao atualizar o roteiro"); 
        }else{
          //console.log(a);
          this.router.navigateByUrl("/roteiros");
        }
      },
      (msg) => { alert(msg.message); }
    );
  }

  criarRoteiro(): void {
    this.roteiroService.criar(this.clonaRoteiro())
          .subscribe(
            roteiro => {
              if (roteiro) {
                this.roteiro = new Roteiro("", "", "");
                this.router.navigateByUrl("/roteiros")
              } 
              else if(roteiro == null ){
                alert("Ja existe um roteiro com este ID ou na lixeira ou na lista de roteiros");
              } 
            },
            msg => { alert(msg.message); }
          );
  } 
  
  clonaRoteiro(): Roteiro {
    let copiaRoteiro = new Roteiro(this.roteiro.id, this.roteiro.titulo, this.roteiro.metaAssociada);
    this.roteiro.questoes.forEach(q => copiaRoteiro.questoes.push(new Questao(q.enunciado)));
    return copiaRoteiro;
  }
}