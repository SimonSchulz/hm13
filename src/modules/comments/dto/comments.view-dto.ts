import { CommentDocument } from '../infrastructure/schemas/comment.schema';

export class CommentsViewDto {
  id!: string;
  content!: string;
  commentatorInfo!: {
    userId: string;
    userLogin: string;
  };
  createdAt!: string;

  static mapToView(comment: CommentDocument): CommentsViewDto {
    const dto = new CommentsViewDto();
    dto.id = comment._id.toString();
    dto.content = comment.content;
    dto.commentatorInfo = comment.commentatorInfo;
    dto.createdAt = new Date().toISOString();
    return dto;
  }
}
