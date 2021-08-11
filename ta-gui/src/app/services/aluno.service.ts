import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';

import { Aluno } from '../../../../common/aluno';
import { Injectable } from '@angular/core';

@Injectable()
export class AlunoService {

  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private taURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  criar(aluno: Aluno): Observable<Aluno | null> {
    return this.http.post<any>(this.taURL + "/aluno", aluno, {headers: this.headers})
             .pipe( 
                retry(2),
                map( res => {if (res.success) {return aluno;} else {return null;}} )
              ); 
  }

  atualizar(aluno: Aluno): Observable<Aluno | null> {
    return this.http.put<any>(this.taURL + "/aluno",JSON.stringify(aluno), {headers: this.headers})
              .pipe( 
                retry(2),
                map( res => {if (res.success) {return aluno;} else {return null;}} )
              ); 
  }

  deletar(cpf: string) : Observable<boolean> {
    return this.http.delete<any>(this.taURL + `/aluno/${cpf}`, { headers: this.headers })
      .pipe(
        retry(2), 
        map(res => { 
          if(res.success) return true; return false;
        }))
  }

  getAlunos(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(this.taURL + "/aluno")
              .pipe(
                 retry(2)
               );
  }

}