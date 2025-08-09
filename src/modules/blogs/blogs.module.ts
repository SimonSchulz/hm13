import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogModel, BlogSchema } from './infrastructure/schemas/blog.schema';
import { BlogsRepository } from './infrastructure/repositories/blog.repository';
import { BlogsQueryRepository } from './infrastructure/repositories/blogs.query.repository';
import { BlogsController } from './controllers/blogs.controller';
import { BlogService } from './application/blog.service';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BlogModel.name, schema: BlogSchema }]),
    forwardRef(() => PostsModule),
  ],
  controllers: [BlogsController],
  providers: [BlogService, BlogsQueryRepository, BlogsRepository],
  exports: [BlogService, BlogsQueryRepository],
})
export class BlogsModule {}
