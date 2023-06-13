import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentsServiceService {

  private urlComment: string = 'http://localhost:3000/comments';

  constructor(private http: HttpClient,) { }

  deleteComment(id: string){
    return new Promise((resolve, reject) => {
      this.http.delete(`${this.urlComment}/delete-comment/?commentId=${id}`).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getComments(): Promise<any>{
    return new Promise((resolve, reject) => {
      this.http.get(`${this.urlComment}/load-comments`).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async createComment(data:object){
    try {
      const response = await this.http.post(`${this.urlComment}/create-comment`, data).toPromise();
      console.log('Comentario enviado al backend con éxito', response);
    } catch (error) {
      console.error('Error al enviar el Comentario al backend:', error);
    }
  }

  updateComment(id: string, body: any){    
    return new Promise((resolve, reject) => {
      this.http.put(`${this.urlComment}/update-comment-state/?commentId=${id}`, body).subscribe(
      (response) => {
        resolve(response);
      },
      (error) => {
        reject(error);
      });
    })
  }
}
