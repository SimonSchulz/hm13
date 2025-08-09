import { LikeStatus } from './likes.type';
import { NewestLike } from './newest-likes.type';

export type extendedLikesInfo = {
  likesCount: number;
  dislikesCount: number;
  myStatus: LikeStatus;
  newestLikes: NewestLike[];
};
