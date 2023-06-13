import { Controller, Get, Post, Res, Put, Delete, Body, Query, HttpStatus } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDTO } from './dto/comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Get('load-comments')
  async getDocuments() {
    return await this.commentsService.getComments();
  }

  @Post('create-comment')
  async signUp(@Res() res, @Body() createCommentDTO: CreateCommentDTO) {
    const com = await this.commentsService.createDocument(createCommentDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Comment Successfully Created',
      com: com,
    });
  }

  @Put('update-comment-state')
  async updateDocumentReviewer(
    @Res() res,
    @Query('commentId') documentId,
    @Body() createDocumentDTO,
  ) {
    const doc = await this.commentsService.updateCommentState(
      documentId,
      createDocumentDTO,
    );
    if (!doc) throw new Error('No existe el comentario');
    return res.status(HttpStatus.OK);
  }

  @Delete('delete-comment')
  async deleteDocument(@Res() res, @Query('commentId') commentId){    
    const com = await this.commentsService.deleteComment(commentId);
    if(!com) throw new Error("No existe el documento");
    return res.status(HttpStatus.OK);
  }
}
