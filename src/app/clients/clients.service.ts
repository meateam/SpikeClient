// clients.service

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PublicFunctions } from '../shared/shared';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ClientsService {
  private clientUrl = 'https://localhost:3000/api/client';
  // private clientUrl = `${window.location.origin}/api/client`;

  /**
   * Injection of the http service.
   * @param http - The http service.
   */
  constructor(private http: HttpClient) { }

  /**
   * Gets clients by the token which is saved on the cookie.
   */
  getClients(): Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({
            authorization: PublicFunctions.getCookie('authorization')
        })
    };

    return this.http.get(this.clientUrl, httpOptions).pipe(
        catchError(PublicFunctions.handleError)
    );
  }

  /**
   * Find clients by Client Name or Team Name
   */
  findClients(filter): Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({
            authorization: PublicFunctions.getCookie('authorization')
        })
    };

    return this.http.get(`${this.clientUrl}/search?name=${filter}`, httpOptions).pipe(
        catchError(PublicFunctions.handleError)
    );
  }

  /**
   * Find clients by client name to be returned in dashboard component
   * (With more information than regular find clients)
   */
  searchClientsView(filter): Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({
            authorization: PublicFunctions.getCookie('authorization')
        })
    };

    return this.http.get(`${this.clientUrl}/search?name=${filter}&view=true`, httpOptions).pipe(
        catchError(PublicFunctions.handleError)
    );
  }

  /**
   * Gets a specific client data by the token and the client ID.
   * @param clientId - Client id
   */
  getClientData(clientId: string): Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({
            authorization: PublicFunctions.getCookie('authorization')
        })
    };

    return this.http.get(this.clientUrl + '/' + clientId, httpOptions).pipe(
        catchError(PublicFunctions.handleError)
    );
  }

  /**
   * Gets active tokens list for a given client.
   * @param clientId - Client id of the client
   */
  getActiveTokens(clientId: string): Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({
            authorization: PublicFunctions.getCookie('authorization')
        })
    };

    return this.http.get(this.clientUrl + '/' + clientId + '/tokens', httpOptions).pipe(
        catchError(PublicFunctions.handleError)
    );
  }

  /**
   * Updates a client
   * @param clientId - Client id for the url
   * @param client - Client to update
   */
  updateClient(clientId: string, client): Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({
            authorization: PublicFunctions.getCookie('authorization')
        })
    };

    return this.http.put(`${this.clientUrl}/${clientId}`, { clientInformation: client }, httpOptions).pipe(
        catchError(PublicFunctions.handleError)
    );
  }

  /**
   * Removes a client by client ID.
   * @param clientId - Client id
   */
  removeClient(clientId: string): Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({
            authorization: PublicFunctions.getCookie('authorization')
        })
    };

    return this.http.delete(this.clientUrl + '/' + clientId, httpOptions).pipe(
        catchError(PublicFunctions.handleError)
    );
  }

  /**
   * Resets client-secret of a client.
   * @param clientId - Client ID
   */
  resetCredentials(clientId: string): Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({
            authorization: PublicFunctions.getCookie('authorization')
        })
    };

    return this.http.patch(`${this.clientUrl}/${clientId}`, {}, httpOptions).pipe(
        catchError(PublicFunctions.handleError)
    );
  }

  getAllClients(sortType: string = 'date', sortOrder: number = 1, skip: number = 0, limit: number = 24): Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({
            authorization: PublicFunctions.getCookie('authorization')
        })
    };

    return this.http.get(`${this.clientUrl}/dashboard?sort=${sortType}&desc=${sortOrder}}&skip=${skip}&limit=${limit}`, httpOptions).pipe(
        catchError(PublicFunctions.handleError)
    );
  }
}
