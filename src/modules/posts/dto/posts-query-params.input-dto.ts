import { BaseQueryParams } from '../../../core/dto/base.query-params.input-dto';
import { PostsSortBy } from './posts-sort-by';

export class PostsQueryParams extends BaseQueryParams {
  sortBy = PostsSortBy.CreatedAt;
  searchNameTerm: string | null = null;
}
