import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { environment } from '../environment';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TestServiceService {
  constructor(private http: HttpClient) {}

  /* getFromApi() {
    return this.http.get('https://jsonplaceholder.typicode.com/todos');
  } */

  getFromApi() {
    return this.http.get('https://jsonplaceholder.typicode.com/todos');
  }

  getReservaciones(token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // Realiza la solicitud HTTP con los encabezados personalizados
    return this.http.get('https://restful-booker.herokuapp.com/booking', {
      headers,
    });
  }

  getReservacionById(id: number, token: string) {
    console.log('Token:', token);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(`https://restful-booker.herokuapp.com/booking/${id}`, {
      headers,
    });
  }

  getItems(token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .get(`${environment.apiUrl}item`, { headers })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error && typeof error.error === 'string') {
      console.error('Error:', error.error);
    } else if (error.error && error.error.message) {
      console.error('Error:', error.error.message);
    } else {
      console.error('Error:', error);
    }
    return throwError(
      'Ocurrió un error al procesar la solicitud. Por favor, intenta nuevamente más tarde.'
    );
  }

  createItem(token: string, item: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post('http://172.16.3.108:3000/item', item, { headers });
  }

  updateItem(token: string, id: number, item: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.patch(`http://172.16.3.108:3000/item/${id}`, item, {
      headers,
    });
  }

  deleteItem(token: string, id: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .delete(`http://172.16.3.108:3000/item/${id}`, {
        headers,
      })
      .pipe(catchError(this.handleError));
  }
}

