import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Turma } from '../../../../common/src/turmas/turma';

@Injectable()
export class NotasService {

  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private taURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getTurma(): Observable<Turma> {
    return this.http.get<Turma>(this.taURL + "/notas")
              .pipe(
                 retry(2)
               );
  }

  postTurma(turma: Turma): Observable<Turma | null> {
    return this.http.post<any>(this.taURL + "/notas", turma, {headers: this.headers})
             .pipe( 
                retry(2),
                map( res => {if (res.success) {return turma;} else {return null;}} )
              ); 
  }
}