// shared.service

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PublicFunctions } from './shared/shared';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  // private personUrl = `${window.location.origin}/api/person`;
  private personUrl = 'https://localhost:3000/api/person';
  private value: string;
  listeners = [];

  constructor(private http: HttpClient) {
    this.value = '';
  }

  onDataChange(fn) {
    this.listeners.push(fn);
  }

  set setData(value: string) {
    this.value = value;
    this.listeners.forEach((fn) => {
      fn(value);
    });
  }

  getPersons(fullname: string): Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({
            authorization: PublicFunctions.getCookie('authorization')
        })
    };

    return this.http.get(`${this.personUrl}?fullname=${fullname}`, httpOptions).pipe(
        catchError(PublicFunctions.handleError)
    );
  }

  getPersonsByPersonIds(personIds: string[]): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
          authorization: PublicFunctions.getCookie('authorization')
      })
    };

    return this.http.post(`${this.personUrl}`, { personIds }, httpOptions).pipe(
        catchError(PublicFunctions.handleError)
    );
  }

  getPerson(id: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
          authorization: PublicFunctions.getCookie('authorization')
      })
    };

    return this.http.get(`${this.personUrl}/${id}`, httpOptions).pipe(
      catchError(PublicFunctions.handleError)
    );
  }
}
