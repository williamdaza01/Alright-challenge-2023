import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReviewDTO } from './dto/reviews.dto';
import { Review } from './interfaces/reviews.interface';

@Injectable()
export class ReviewsService {
  constructor(@InjectModel('Reviews') private revModel: Model<Review>) {}

  async getReviews() {
    try {
      const revs = await this.revModel.find().exec();
      return { success: true, data: revs };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async createReview(createReviewDTO: CreateReviewDTO){
    const rev = new this.revModel(createReviewDTO);
    return await rev.save();
  }

  async updateReviewState(
    documentId: string,
    createReviewDTO: CreateReviewDTO,
  ): Promise<Review> {
    const updatedDocument = await this.revModel.findByIdAndUpdate(
      documentId,
      createReviewDTO,
      { new: true },
    );
    return updatedDocument;
  }

}
