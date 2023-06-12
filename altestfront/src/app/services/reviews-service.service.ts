import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewsServiceService {

  private url: string = 'http://localhost:3000/reviews';

  constructor(private http: HttpClient) {}
  
  getReviews(): Promise<any> {  
    return new Promise((resolve, reject) => {
      this.http.get(`${this.url}/load-reviews`).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getReviewers(): Promise<any> {  
    return new Promise((resolve, reject) => {
      this.http.get(`http://localhost:3000/user/load-reviewers`).subscribe(
        (response) => {
          console.log(response);
          
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

}
