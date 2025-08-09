import { MongooseModule } from '@nestjs/mongoose';
import { forwardRef, Module } from '@nestjs/common';
import {
  CommentModel,
  CommentSchema,
} from './infrastructure/schemas/comment.schema';
import { CommentsService } from './application/comment.service';
import { CommentsRepository } from './infrastructure/repositories/comments.repository';
import { CommentsQueryRepository } from './infrastructure/repositories/comments.query.repository';
import { CommentsController } from './controllers/comment.controller';
import { LikesModule } from '../likes/likes.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CommentModel.name, schema: CommentSchema },
    ]),
    forwardRef(() => LikesModule),
  ],
  providers: [CommentsService, CommentsRepository, CommentsQueryRepository],
  controllers: [CommentsController],
  exports: [CommentsQueryRepository, CommentsService],
})
export class CommentsModule {}
