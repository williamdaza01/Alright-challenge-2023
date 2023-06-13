import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class LogsignServiceService {
  constructor(private http: HttpClient, private sessionStorage: SessionStorageService) {}

  postSignUp(data: object) {
    const url = 'http://localhost:3000/user/create-user';

    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), 'coconice').toString();    
    this.http.post(url, {encryptedData}).subscribe(
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
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), 'coconice').toString();  
  
    return new Observable<boolean>(observer => {
      this.http.post(url, {encryptedData}).subscribe(
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
