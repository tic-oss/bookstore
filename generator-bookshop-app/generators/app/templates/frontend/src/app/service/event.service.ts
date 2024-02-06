import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from './event';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from './environment.local';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private REST_API: string = environment.apiUrlEvent;
  private httpHeaders = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );

  constructor(private httpClient: HttpClient) {}

  addEvent(data: Event): Observable<any> {
    const API_URL = `${this.REST_API}/add-event`;
    return this.httpClient
      .post(API_URL, data, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  getEvents(): Observable<Event[]> {
    return this.httpClient.get<Event[]>(`${this.REST_API}`);
  }

  getEvent(id: any): Observable<Event> {
    let API_URL = `${this.REST_API}/read-event/${id}`;
    return this.httpClient
      .get<Event>(API_URL, { headers: this.httpHeaders })
      .pipe(
        map((res: Event) => res),
        catchError(this.handleError)
      );
  }

  updateEvent(id: any, data: any): Observable<any> {
    let API_URL = `${this.REST_API}/update-event/${id}`;
    return this.httpClient
      .put(API_URL, data, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  deleteEvent(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/delete-event/${id}`;
    return this.httpClient
      .delete(API_URL, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
