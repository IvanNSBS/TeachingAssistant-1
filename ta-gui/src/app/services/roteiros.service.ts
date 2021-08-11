import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';

import { Roteiro } from '../../../../common/src/roteiros/roteiro';
import { Injectable } from '@angular/core';

@Injectable()
export class RoteiroService {

  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private taURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getRoteiros(): Observable<Roteiro[]> {
    return this.http.get<Roteiro[]>(this.taURL + "/roteiro")
              .pipe(
                 retry(2)
               );
  }

}