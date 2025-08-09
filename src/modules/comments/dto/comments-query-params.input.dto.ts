import { BaseQueryParams } from '../../../core/dto/base.query-params.input-dto';
import { CommentsSortBy } from './comments-sort-by';

export class CommentsQueryParams extends BaseQueryParams {
  sortBy = CommentsSortBy.CreatedAt;
  searchLoginTerm: string | null = null;
  searchEmailTerm: string | null = null;
}
