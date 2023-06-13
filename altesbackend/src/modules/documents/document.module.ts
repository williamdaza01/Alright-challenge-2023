import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { DocumentSchema } from './schemas/document.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'DocumentPdf', schema: DocumentSchema }]), MulterModule.register()],
  providers: [DocumentsService],
  controllers: [DocumentsController]
})
export class DocumentModule {}
