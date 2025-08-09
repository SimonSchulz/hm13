import { PostDocument } from '../infrastructure/schemas/post.schema';

export class PostViewDto {
  id!: string;
  title!: string;
  shortDescription!: string;
  content!: string;
  blogId!: string;
  blogName!: string;
  createdAt!: string;

  static mapToView(post: PostDocument): PostViewDto {
    const dto = new PostViewDto();
    dto.title = post.title;
    dto.blogId = post.blogId;
    dto.title = post.title;
    dto.content = post.content;
    dto.blogId = post.blogId;
    dto.shortDescription = post.shortDescription;
    dto.id = post._id.toString();
    return dto;
  }
}
