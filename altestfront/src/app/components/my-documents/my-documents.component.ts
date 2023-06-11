import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DocumentsServiceService } from 'src/app/services/documents-service.service';

@Component({
  selector: 'app-my-documents',
  templateUrl: './my-documents.component.html',
  styleUrls: ['./my-documents.component.scss'],
})
export class MyDocumentsComponent {

  pdfTitle: string = '';
  pdfFile: File | null = null;
  fileSizeError: boolean = false;
  docs: any[] = [];
  pdfUrl: Uint8Array | null = null;
  showModal: boolean = false;

  constructor(private service: DocumentsServiceService, private modalService: NgbModal) {}

  ngOnInit() {
    this.loadDocuments();
  }

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      if (file.size <= 5 * 1024 * 1024) {
        this.pdfFile = file;
        this.fileSizeError = false;
      } else {
        this.fileSizeError = true;
      }
    }
  }

  async uploadPDF() {
    if (!this.pdfFile) {
      return;
    }

    const pdfBlob = await this.readFileAsArrayBuffer(this.pdfFile);

    const documentData = {
      title: this.pdfTitle,
      document: pdfBlob,
      state: false,
    };

    this.service.uploadDocument(documentData);
    this.pdfTitle = '';
    this.pdfFile = null;
  }

  readFileAsArrayBuffer(file: File): Promise<Blob> {
    return new Promise<Blob>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = new Uint8Array(reader.result as ArrayBuffer);
        const blob = new Blob([arrayBuffer], { type: file.type });
        resolve(blob);
      };
      reader.onerror = () => {
        reject(new Error('Error al leer el archivo'));
      };
      reader.readAsArrayBuffer(file);
    });
  }

  async loadDocuments() {
    const response = await this.service.getDocuments();
    this.docs = response.data;

    for (const doc of this.docs) {
      doc.open = {};

      const pdfBlob = Uint8Array.from(doc.file.data.data);

      if (pdfBlob) {
        doc.open.blob = pdfBlob;
      } else {
        console.log('Error: pdfBlob is undefined');
      }
    }
  }

  openPDF(pdfBlob: Uint8Array, content?:any) {
    this.pdfUrl = pdfBlob;
    this.modalService.open(content, { fullscreen: true });
  }
}
