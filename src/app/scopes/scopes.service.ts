import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../shared/config';
import { Observable } from 'rxjs';
import { PublicFunctions } from '../shared/shared';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScopesService {
  private scopesUrl = `${config.SERVER_HOST}:${config.SERVER_PORT}/api/scope`;

  /**
   * Injection of the http service.
   * @param http - The http service.
   */
  constructor(private http: HttpClient) { }

  getScopes(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
          authorization: PublicFunctions.getCookie('authorization')
      })
    };

    return this.http.get(this.scopesUrl, httpOptions).pipe(
        catchError(PublicFunctions.handleError)
    );
  }

  updateScope(scope): Observable<any> {
    return this.http.get('/');
  }

  addScope(scope): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
          authorization: PublicFunctions.getCookie('authorization')
      })
    };

    delete scope.client;

    return this.http.post(this.scopesUrl, { scopeInformation: scope }, httpOptions).pipe(
        catchError(PublicFunctions.handleError)
    );
  }

  removeScope(id): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
          authorization: PublicFunctions.getCookie('authorization')
      })
    };

    return this.http.delete(`${this.scopesUrl}/${id}`, httpOptions).pipe(
        catchError(PublicFunctions.handleError)
    );
  }
}
