import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogsignServiceService {
  constructor(private http: HttpClient, private sessionStorage: SessionStorageService) {}

  postSignUp(data: object) {
    const url = 'http://localhost:3000/user/create-user';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
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

  postLogin(data: object): Observable<boolean> {
    const url = 'http://localhost:3000/user/login-user';
    const headers = { 'Content-Type': 'application/json' };
  
    return new Observable<boolean>(observer => {
      this.http.post(url, JSON.stringify(data), { headers }).subscribe(
        (response: any) => {
          console.log('Solicitud POST exitosa:', response);
          this.sessionStorage.store('currentUser', response.currentUser);
          observer.next(response.currentUser.userExist);
          observer.complete();
        },
        (error) => {
          console.error('Error en la solicitud POST:', error);
          observer.error(error);
        }
      );
    });
  }
}
