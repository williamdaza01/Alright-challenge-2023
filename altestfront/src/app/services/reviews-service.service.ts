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

  async createReview(data: object){
    try {
      const response = await this.http.post(`${this.url}/create-review`, data).toPromise();
      console.log('Revision enviado al backend con éxito', response);
    } catch (error) {
      console.error('Error al enviar el Revision al backend:', error);
    }
  }

  updateReview(id: string, body: any){    
    return new Promise((resolve, reject) => {
      this.http.put(`${this.url}/update-review-state/?reviewId=${id}`, body).subscribe(
      (response) => {
        resolve(response);
      },
      (error) => {
        reject(error);
      });
    })
  }

  getDocumentByIdReview(id:string): Promise<any>{
    return new Promise((resolve, reject) => {
      this.http.get(`http://localhost:3000/documents/get-document-by-review/?documentId=${id}`).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

}
