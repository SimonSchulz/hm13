import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModel, PostSchema } from './infrastructure/schemas/post.schema';
import { PostsController } from './controllers/posts.controller';
import { PostService } from './application/post.service';
import { PostsQueryRepository } from './infrastructure/repositories/posts.query.repository';
import { PostsRepository } from './infrastructure/repositories/post.repository';
import { CommentsModule } from '../comments/comments.module';
import { LikesModule } from '../likes/likes.module';
import { BlogsModule } from '../blogs/blogs.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PostModel.name, schema: PostSchema }]),
    forwardRef(() => LikesModule),
    forwardRef(() => CommentsModule),
    BlogsModule,
  ],
  controllers: [PostsController],
  providers: [PostService, PostsQueryRepository, PostsRepository],
  exports: [PostService, PostsQueryRepository],
})
export class PostsModule {}
