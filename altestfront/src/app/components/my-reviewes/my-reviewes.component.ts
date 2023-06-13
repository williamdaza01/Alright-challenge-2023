import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionStorageService } from 'ngx-webstorage';
import { CommentsServiceService } from 'src/app/services/comments-service.service';
import { LoggerService } from 'src/app/services/logger.service';
import { ReviewsServiceService } from 'src/app/services/reviews-service.service';
import { StateType } from 'src/utils/types';

@Component({
  selector: 'app-my-reviewes',
  templateUrl: './my-reviewes.component.html',
  styleUrls: ['./my-reviewes.component.scss']
})
export class MyReviewesComponent {

  idReview: string = '';
  isReviewer: boolean = false;
  pdfTitle: string = '';
  acceptedState: StateType = StateType.ACCEPTED;
  rejectedState: StateType = StateType.REJECTED;
  reviews: any[] = [];
  comments: any[] = [];
  commentValue: string = '';
  pendingReviwes: any[] = [];
  pdfUrl: Uint8Array | null = null;

  constructor(private service: ReviewsServiceService,
    private modalService: NgbModal, private commentService: CommentsServiceService,
    private sessionStorage: SessionStorageService, private logger: LoggerService) {}

  ngOnInit(){
    this.loadReviews();
    this.loadPendingReviews();
    
    this.isReviewer = this.sessionStorage.retrieve('currentUser');
  }

  openModal(content: any, size?: string, fullscreen?: boolean) {
    this.modalService.open(content, { size, fullscreen });
  }

  async loadReviews():Promise<any>{
    const response = await this.service.getReviews();
    this.reviews = response.data;
    const revs = this.reviews;
    return revs;
  }

  async loadPendingReviews(){
    const pend = await this.loadReviews();
    this.reviews = pend;
    this.pendingReviwes = [this.reviews.find(rev => rev.state === StateType.IN_REVIEW)];
  }

  async changeStateRevision(id: string, state: StateType | string){
    const comment = this.pendingReviwes.find(p => p._id === id);
    comment.state = state;
    if(state === StateType.ACCEPTED){
      this.logger.log('Revision aceptada');
    } else {
      this.logger.log('Revision rechazada');
    }
    await this.service.updateReview(id, comment);
  }

  async loadComments(comment: any){
    this.openModal(comment, 'xl');
    const response = await this.commentService.getComments();    

    return (this.comments = response.data)
  }

  async createComment(){
    const currentUser = this.sessionStorage.retrieve('currentUser');
    
    if (currentUser) {
      const commentData = {
        idFile: '',
        idOwner: currentUser.userId,
        nameOwner: currentUser.userName,
        description: this.commentValue
      };
      this.commentService.createComment(commentData);
      this.logger.log('Comentario creado');
    } else {
      console.log('Error: No se encontró el documento o el usuario actual.');
    }
  }

  async changeStateComment(id: string, state: StateType | string){
    const comment = this.comments.find(com => com._id === id);
    comment.state = state;
    if(state === StateType.ACCEPTED){
      this.logger.log('Comentario aceptado');
    } else {
      this.logger.log('Comentario rechazado');
    }
    await this.commentService.updateComment(id, comment);
  }

  async deleteComment(id: string, idOwner: string){
    const currentUser = this.sessionStorage.retrieve('currentUser');
    if(idOwner === currentUser.UserId){
      this.logger.log('Comentario eliminado');
      await this.commentService.deleteComment(id);
      await this.loadComments(this.comments);
    }
  }

  async getDocumentByIdReview(content:any, idrev: string){
    this.logger.log('Ha iniciado la Revision iniciado');
    const currentRev = this.reviews.find(r => r._id = idrev);
    const doc = await this.service.getDocumentByIdReview(currentRev.idFile)
    this.openModal(content,'', true);
    console.log(typeof doc.data.data);
    this.pdfUrl=Uint8Array.from(doc.data.data);
  }

}
