import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReviewsServiceService } from './reviews-service.service';

@Injectable({
  providedIn: 'root',
})
export class DocumentsServiceService {

  private url: string = 'http://localhost:3000/documents';
  private urlComment: string = 'http://localhost:3000/comments';

  constructor(private http: HttpClient, private serviceRev: ReviewsServiceService) {}

  async uploadDocument(documentData: any) {
    const formData = new FormData();
    formData.append('title', documentData.title);
    formData.append('state', documentData.state);

    const blob = new Blob([documentData.document], { type: 'application/pdf' });
    formData.append('file', blob);

    try {
      const response = await this.http.post(`${this.url}/upload-document`, formData).toPromise();
      console.log('Documento enviado al backend con éxito', response);
    } catch (error) {
      console.error('Error al enviar el documento al backend:', error);
    }
  }

  getDocuments(): Promise<any> {  
    return new Promise((resolve, reject) => {
      this.http.get(`${this.url}/load-documents`).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  deleteDocument(id: string) {      
    return new Promise((resolve, reject) => {
      this.http.delete(`${this.url}/delete-document/?documentId=${id}`).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  
  updateDocument(id: string, body: any){
    const dataRev = {
      idFile: id,
      fileTitle: body.title,
      state: body.state
    }
    this.serviceRev.createReview(dataRev);
    return new Promise((resolve, reject) => {
      this.http.put(`${this.url}/update-document-reviewer/?documentId=${id}`, body).subscribe(
      (response) => {
        resolve(response);
      },
      (error) => {
        reject(error);
      });
    })
  }

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
