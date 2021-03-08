// auth.service

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PublicFunctions } from '../shared/shared';

@Injectable()
export class AuthService {
  // private authUrl = `${window.location.origin}/api/auth`;
  // private teamUrl = `${window.location.origin}/api/team`;
  // private clientUrl = `${window.location.origin}/api/client`;
  private authUrl = 'https://localhost:3000/api/auth';
  private teamUrl = 'https://localhost:3000/api/team';
  private clientUrl = 'https://localhost:3000/api/client';

  /**
   * Injection of the http service.
   * @param http - The http service.
   */
  constructor(private http: HttpClient) {}

  /**
   * Gets a username by the token which is saved on the cookie.
   */
  getUser(): Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({
            authorization: PublicFunctions.getCookie('authorization')
        })
    };

    return this.http.get('https://localhost/whoami').pipe(
        catchError(PublicFunctions.handleError)
    );
  }

  /**
   * Gets teams by specific email.
   * @param email - The key that the team is searched with/
   */
  getTeams(personId): Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({
            authorization: PublicFunctions.getCookie('authorization')
        })
    };

    return this.http.get(`${this.teamUrl}/${personId}`, httpOptions).pipe(
        catchError(PublicFunctions.handleError)
    );
  }

  /**
   * Register a new team account.
   * @param team - The team object to register.
   */
  registerTeam(team): Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({
            authorization: PublicFunctions.getCookie('authorization')
        })
    };

    return this.http.post(`${this.authUrl}/register`, { team }, httpOptions).pipe(
        catchError(PublicFunctions.handleError)
    );
  }

  /**
   * Register a new client to the team account.
   * @param client - The client object to register.
   */
  registerClient(client): Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({
            authorization: PublicFunctions.getCookie('authorization')
        })
    };

    return this.http.post(this.clientUrl, {clientInformation: client}, httpOptions).pipe(
        catchError(PublicFunctions.handleError)
    );
  }

  /**
   * Login with http service.
   * @param team - The team object with login details.
   */
  login(team): Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({
            authorization: PublicFunctions.getCookie('authorization')
        })
    };

    return this.http.post(this.authUrl + '/login', { team }, httpOptions).pipe(
        catchError(PublicFunctions.handleError)
    );
 }
}
