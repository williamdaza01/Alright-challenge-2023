import { Component } from '@angular/core';
import { ReviewsServiceService } from 'src/app/services/reviews-service.service';

@Component({
  selector: 'app-my-reviewes',
  templateUrl: './my-reviewes.component.html',
  styleUrls: ['./my-reviewes.component.scss']
})
export class MyReviewesComponent {

  idReview: string = '';
  pdfTitle: string = '';
  state: boolean = false;
  reviews: any[] = [];

  constructor(private service: ReviewsServiceService) {}

  ngOnInit(){
    this.loadReviews();
  }

  async loadReviews(){
    const response = await this.service.getReviews();
    this.reviews = response.data;
  }

}
