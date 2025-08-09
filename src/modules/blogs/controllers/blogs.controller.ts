import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BlogService } from '../application/blog.service';
import { BlogsQueryRepository } from '../infrastructure/repositories/blogs.query.repository';
import { BlogsQueryParams } from '../dto/blogs-query-params.input-dto';
import { BlogInputDto } from '../dto/blog.input-dto';
import { PostsQueryParams } from '../../posts/dto/posts-query-params.input-dto';
import { PostsQueryRepository } from '../../posts/infrastructure/repositories/posts.query.repository';
import { PostService } from '../../posts/application/post.service';
import { PostInputWithoutBlogIdDto } from '../../posts/dto/post.input-without-blogId.dto';

@Controller('blogs')
export class BlogsController {
  constructor(
    private readonly blogService: BlogService,
    private readonly blogsQueryRepository: BlogsQueryRepository,
    private readonly postsQueryRepository: PostsQueryRepository,
    private readonly postService: PostService,
  ) {}

  @Get()
  getBlogs(@Query() query: BlogsQueryParams) {
    return this.blogsQueryRepository.findAllBlogs(query);
  }

  @Get(':id')
  getBlog(@Param('id') id: string) {
    return this.blogsQueryRepository.findById(id);
  }

  @Get(':blogId/posts')
  getPostsByBlogId(
    @Param('blogId') blogId: string,
    @Query() query: PostsQueryParams,
  ) {
    return this.postsQueryRepository.findPostsByBlogId(blogId, query);
  }

  @Post()
  createBlog(@Body() dto: BlogInputDto) {
    return this.blogService.create(dto);
  }

  @Post(':blogId/posts')
  createPostByBlogId(
    @Param('blogId') blogId: string,
    @Body() dto: PostInputWithoutBlogIdDto,
  ) {
    return this.postService.createByBlogId(dto, blogId);
  }

  @Put(':id')
  updateBlog(@Param('id') id: string, @Body() dto: BlogInputDto) {
    return this.blogService.update(id, dto);
  }

  @Delete(':id')
  deleteBlog(@Param('id') id: string) {
    return this.blogService.delete(id);
  }
}
