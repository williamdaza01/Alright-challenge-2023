import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DocumentsServiceService } from 'src/app/services/documents-service.service';
import { ReviewsServiceService } from 'src/app/services/reviews-service.service';
import { StateType } from 'src/utils/types';

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
  reviewers: any[] = [];
  comments: any[] = [];
  pdfUrl: Uint8Array | null = null;
  showModal: boolean = false;
  deleteConfirmation: boolean = false;
  selectedReviewerId: string = '';
  documentIdForReview: string = '';
  private tempId: string = '';

  constructor(
    private service: DocumentsServiceService,
    private revService: ReviewsServiceService,
    private modalService: NgbModal
  ) {}

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

  openPDF(pdfBlob: Uint8Array, content?: any) {
    this.pdfUrl = pdfBlob;
    this.openModal(content, '', true);
  }

  openModal(content: any, size?: string, fullscreen?: boolean) {
    this.modalService.open(content, { size, fullscreen });
  }

  async requestReview() {
    console.log(this.selectedReviewerId, this.documentIdForReview);
    
    if (this.selectedReviewerId && this.documentIdForReview) {
      const selectedReviewer = this.reviewers.find(rev => rev._id === this.selectedReviewerId);
  
      if (selectedReviewer) {
        const documentForReview = this.docs.find(doc => doc._id === this.documentIdForReview);
  
        if (documentForReview) {
          const updateData = {
            reviewer: selectedReviewer,
            state: StateType.IN_REVIEW
          };
  
          console.log('Revisión solicitada con éxito');
          await this.service.updateDocument(this.documentIdForReview, updateData);
        } else {
          console.log('El documento no existe');
        }
      } else {
        console.log('El revisor no existe');
      }
    } else {
      console.log('Debes seleccionar un revisor y un documento');
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
      state: StateType.NO_CHECKING,
    };

    this.service.uploadDocument(documentData);
    location.reload();
    this.pdfTitle = '';
    this.pdfFile = null;
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

  async deleteDocument(id?: string, deletedoc?: any) {
    if (!this.deleteConfirmation) {
      this.openModal(deletedoc, 'lg');
      if (id) {
        this.tempId = id;
      }
      this.deleteConfirmation = true;
    } else {
      const docDeletd = await this.service.deleteDocument(this.tempId);
      location.reload();
    }
  }

  async loadReviewers(revdoc: any) {
    this.openModal(revdoc, 'xl');
    const response = await this.revService.getReviewers();

    return (this.reviewers = response);
  }

  async loadComments(comment: any){
    this.openModal(comment, 'xl');
    const response = await this.service.getComments();

    return (this.comments = response)
  }
}
