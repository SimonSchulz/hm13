import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { PaginatedViewDto } from '../../../../core/dto/base.paginated.view-dto';
import { PostDocument, PostModel } from '../schemas/post.schema';
import { PostsQueryParams } from '../../dto/posts-query-params.input-dto';
import { PostViewDto } from '../../dto/post.view-dto';
import { Post } from '../../domain/entities/post.entity';

@Injectable()
export class PostsQueryRepository {
  constructor(
    @InjectModel(PostModel.name) private postModel: Model<PostDocument>,
  ) {}
  async findById(id: string) {
    const post = await this.postModel.findById(id);
    if (!post) {
      throw new NotFoundException('post not found');
    }
    return PostViewDto.mapToView(post);
  }
  async findAllPosts(
    query: PostsQueryParams,
  ): Promise<PaginatedViewDto<PostViewDto[]>> {
    const filter: FilterQuery<Post> = {
      deletedAt: null,
    };

    if (query.searchNameTerm) {
      filter.$or = filter.$or || [];
      filter.$or.push({
        login: { $regex: query.searchNameTerm, $options: 'i' },
      });
    }

    const posts = await this.postModel
      .find(filter)
      .sort({ [query.sortBy]: query.sortDirection })
      .skip(query.calculateSkip())
      .limit(query.pageSize);

    const totalCount = await this.postModel.countDocuments(filter);

    const items = posts.map((user) => PostViewDto.mapToView(user));

    return PaginatedViewDto.mapToView({
      items,
      totalCount,
      page: query.pageNumber,
      size: query.pageSize,
    });
  }
  async findPostsByBlogId(blogId: string, query: PostsQueryParams) {
    const filter = { blogId };
    const totalCount = await this.postModel.countDocuments(filter);
    const posts = await this.postModel
      .find(filter)
      .sort({ [query.sortBy]: query.sortDirection })
      .skip(query.calculateSkip())
      .limit(query.pageSize);
    const items = posts.map((user) => PostViewDto.mapToView(user));
    return PaginatedViewDto.mapToView({
      items,
      totalCount,
      page: query.pageNumber,
      size: query.pageSize,
    });
  }
}
