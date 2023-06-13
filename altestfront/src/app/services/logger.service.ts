import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor(private http:HttpClient) { }
  async log(message: string) {
    const log ={
      message
    }
    try {
      const response = await this.http.post(`http://localhost:3000/logs/log-register`, log).toPromise();
      console.log(response);
    } catch (error) {
    }
  }
}
