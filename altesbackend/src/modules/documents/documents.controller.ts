import { Controller, Get, Post, Delete, Res, Query, HttpStatus, Body, UploadedFile, UseInterceptors, Put, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentsService } from './documents.service';
import { CreateDocumentDTO } from './dto/document.dto';

@Controller('documents')
export class DocumentsController {
  constructor(private documentService: DocumentsService) {}

  @Post('upload-document')
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocument(@Res() res, @Body() createDocumentDTO: CreateDocumentDTO, @UploadedFile() file: Express.Multer.File) {
    
    const documentData = {
      title: createDocumentDTO.title,
      file: file,
      state: createDocumentDTO.state,
    };

    const doc = await this.documentService.createDocument(documentData);

    return res.status(HttpStatus.OK).json({
      message: "Document Successfully Loaded",
      file: doc
    });
  }

  @Get('load-documents')
  async getDocuments(){
    return await this.documentService.getDocuments();
  }

  @Delete('delete-document')
  async deleteDocument(@Res() res, @Query('documentId') documentId){    
    const doc = await this.documentService.deleteDocument(documentId);
    if(!doc) throw new Error("No existe el documento");
    return res.status(HttpStatus.OK);
  }

  @Put('update-document-reviewer')
  async updateDocumentReviewer(@Res() res, @Query('documentId') documentId, @Body() createDocumentDTO){
     const doc = await this.documentService.updateDocumentReviewer(documentId, createDocumentDTO);
    if(!doc) throw new Error("No existe el documento");
    return res.status(HttpStatus.OK);
  }

  @Get('get-document-by-review')
  async getDocumentByIdReview(@Query('documentId') documentId){
    const doc = await this.documentService.getDocumentByIdReview(documentId);
    return doc.data.file;
  }
}
