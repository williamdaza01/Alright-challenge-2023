import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LogsignServiceService {
  constructor(private http: HttpClient) {}

  postSignUp(data: object) {
    const url = 'http://localhost:3000/user/create-user';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    this.http.post(url, JSON.stringify(data), { headers }).subscribe(
      (response) => {
        console.log('Solicitud POST exitosa:', response);
      },
      (error) => {
        console.error('Error en la solicitud POST:', error);
      }
    );
  }
}
