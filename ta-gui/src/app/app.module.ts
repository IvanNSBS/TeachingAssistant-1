import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './components/app/app-routing.module';
import { AppComponent } from './components/app/app.component';
import { AlunoService } from './services/aluno.service';
import { MetasComponent } from './components/metas/metas.component';
import { AlunosComponent } from './components/aluno/alunos.component';
import { RoteirosComponent } from './components/roteiros/roteiros/roteiros.component';
import { LixeiraComponent } from './components/roteiros/lixeira/lixeira.component';
import { RoteiroService } from './services/roteiros.service';
import { RoteiroCreatorComponent } from './components/roteiros/roteirocreator/roteirocreator.component';
import { LixeiraService } from './services/lixeira.service';
import {RoteiroAtualizarComponent} from './components/roteiros/roteiroatualizar/roteiroatualizar.component'
@NgModule({
  declarations: [
    AppComponent,
    MetasComponent,
    AlunosComponent,
    RoteirosComponent,
    LixeiraComponent,
    RoteiroCreatorComponent,
    RoteiroAtualizarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule, 
    RouterModule.forRoot([
      {
        path: 'metas',
        component: MetasComponent
      },
      {
        path: 'alunos',
        component: AlunosComponent
      },
      {
        path: 'roteiros',
        component: RoteirosComponent,
      },
      {
        path: 'roteiros/lixeira',
        component: LixeiraComponent
      },
      {
        path: 'roteiros/criacao',
        component: RoteiroCreatorComponent
      },
      {
        path: 'roteiros/atualizar/:id',
        component: RoteiroAtualizarComponent
      }
    ])
  ],
  providers: [AlunoService, RoteiroService, LixeiraService],
  bootstrap: [AppComponent]
})
export class AppModule { }
