import { Controller, Get, Post, Res, Body, HttpStatus, Query, Put } from '@nestjs/common';
import { CreateReviewDTO } from './dto/reviews.dto';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @Get('load-reviews')
  async getDocuments() {
    return await this.reviewsService.getReviews();
  }

  @Post('create-review')
  async createReview(@Res() res, @Body() createReviewDTO: CreateReviewDTO) {
    const rev = await this.reviewsService.createReview(createReviewDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Review Successfully Created',
      rev: rev,
    });
  }

  @Put('update-review-state')
  async updateDocumentReviewer(
    @Res() res,
    @Query('reviewId') reviewId,
    @Body() createReviewDTO,
  ) {
    const doc = await this.reviewsService.updateReviewState(
      reviewId,
      createReviewDTO,
    );
    if (!doc) throw new Error('No existe el review');
    return res.status(HttpStatus.OK);
  }
}
