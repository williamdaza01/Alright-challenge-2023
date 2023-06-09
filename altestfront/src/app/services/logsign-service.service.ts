import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogsignServiceService {

  constructor(private http: HttpClient) { }

  postSignUp(data:object){
    const url = 'URL_DEL_ENDPOINT';

  this.http.post(url, data).subscribe(
    (response) => {
      console.log('Solicitud POST exitosa:', response);
    },
    (error) => {
      console.error('Error en la solicitud POST:', error);
    }
  );
  }
}
