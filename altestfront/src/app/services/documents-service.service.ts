import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DocumentsServiceService {

  private url: string = 'http://localhost:3000/documents';

  constructor(private http: HttpClient) {}

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

  getComments(){
    return new Promise((resolve, reject) => {
      this.http.get(`${this.url}/load-comments`).subscribe(
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
