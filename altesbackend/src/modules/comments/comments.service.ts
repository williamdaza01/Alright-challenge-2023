import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommentDTO } from './dto/comment.dto';
import { Comment } from './interfaces/comment.interface';

@Injectable()
export class CommentsService {
  constructor(@InjectModel('Comment') private commentModel: Model<Comment>) {}

  async getComments() {
    try {
      const com = await this.commentModel.find().exec();
      return { success: true, data: com };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async createDocument(createCommentDTO: CreateCommentDTO): Promise<Comment>{
    const com = new this.commentModel(createCommentDTO);
    return await com.save();
  }

  async updateCommentState(
    documentId: string,
    createcommentDTO: CreateCommentDTO,
  ): Promise<Comment> {
    const updatedDocument = await this.commentModel.findByIdAndUpdate(
      documentId,
      createcommentDTO,
      { new: true },
    );
    return updatedDocument;
  }

  async deleteComment(commentId: string): Promise<any> {
    const deletedComment = await this.commentModel.findByIdAndDelete(commentId);
    return deletedComment;
  }
}
