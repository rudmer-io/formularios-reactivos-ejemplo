import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

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
    return this.http.get('http://172.16.3.108:3000/item', { headers });
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
}
