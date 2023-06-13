import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { MulterModule } from '@nestjs/platform-express';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewSchema } from './schemas/reviews.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Reviews', schema: ReviewSchema }]), MulterModule.register()],
  providers: [ReviewsService],
  controllers: [ReviewsController]
})
export class ReviewsModule {}
