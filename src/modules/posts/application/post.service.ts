import { Injectable, NotFoundException } from '@nestjs/common';
import { WithId } from 'mongodb';
import { PostsRepository } from '../infrastructure/repositories/post.repository';
import { PostInputDto } from '../dto/post.input.dto';
import { Post } from '../domain/entities/post.entity';
import { PostInputWithoutBlogIdDto } from '../dto/post.input-without-blogId.dto';
import { BlogsQueryRepository } from '../../blogs/infrastructure/repositories/blogs.query.repository';

@Injectable()
export class PostService {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly blogsQueryRepository: BlogsQueryRepository,
  ) {}
  async create(dto: PostInputDto): Promise<WithId<Post>> {
    const newPost = new Post(
      dto.title,
      dto.shortDescription,
      dto.content,
      dto.blogId,
    );
    return this.postsRepository.create(newPost);
  }

  async createByBlogId(
    dto: PostInputWithoutBlogIdDto,
    blogId: string,
  ): Promise<WithId<Post>> {
    const blog = await this.blogsQueryRepository.findById(blogId);
    if (!blog) {
      throw new NotFoundException('Blog not found');
    }
    const blogName = blog.name;

    const newPost = new Post(
      dto.title,
      dto.shortDescription,
      dto.content,
      blogId,
    );
    return this.postsRepository.create(newPost);
  }

  async update(id: string, dto: PostInputDto): Promise<void> {
    await this.postsRepository.update(id, dto);
  }

  async delete(id: string): Promise<void> {
    await this.postsRepository.delete(id);
  }
}
