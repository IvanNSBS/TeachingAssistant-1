import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';

import { Roteiro } from '../../../../common/src/roteiros/roteiro';
import { Injectable } from '@angular/core';

@Injectable()
export class LixeiraService {

  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private taURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getRoteiros(): Observable<Roteiro[]> {
    return this.http.get<Roteiro[]>(this.taURL + "/roteiro/lixeira")
              .pipe(
                 retry(2)
               );
  }

  deletarPermanentemente(roteiroIds: string[]){
    return this.http.delete<any>(this.taURL + `/roteiro/lixeira/${roteiroIds}`, { headers: this.headers })
      .pipe(
        retry(2), 
        map(res => { 
          if(res.success) 
            return true; 
          return false;
        }))
  }

  enviarParaLixeira(roteiroId: string): Observable<boolean>{
    return this.http.delete<any>(this.taURL + `/roteiro/${roteiroId}`, { headers: this.headers })
      .pipe(
        retry(2), 
        map(res => { 
          if(res.success) return true; return false;
        }))
  }

}