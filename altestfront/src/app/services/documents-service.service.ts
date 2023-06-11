import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DocumentsServiceService {
  constructor(private http: HttpClient) {}

  async uploadDocument(documentData: any) {
    const url = 'http://localhost:3000/documents/upload-document';

    const formData = new FormData();
    formData.append('title', documentData.title);
    formData.append('state', documentData.state);

    const blob = new Blob([documentData.document], { type: 'application/pdf' });
    formData.append('file', blob);

    try {
      const response = await this.http.post(url, formData).toPromise();
      console.log('Documento enviado al backend con éxito', response);
    } catch (error) {
      console.error('Error al enviar el documento al backend:', error);
    }
  }

  getDocuments(): Promise<any> {
    const url = 'http://localhost:3000/documents/load-documents';
  
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(
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
