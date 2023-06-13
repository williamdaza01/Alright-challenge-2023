import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentSchema } from './schemas/comment.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }]), MulterModule.register()],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
