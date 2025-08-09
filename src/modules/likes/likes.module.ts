import { forwardRef, Module } from '@nestjs/common';
import { LikesService } from './application/likes.service';
import { LikesRepository } from './infrasructure/repositories/likes.repository';
import { PostsModule } from '../posts/posts.module';
import { CommentsModule } from '../comments/comments.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LikeModel, LikeSchema } from './infrasructure/schemas/likes.schema';
import {
  UserModel,
  UserSchema,
} from '../users/infrastructure/schemas/user.schema';
import { UsersModule } from '../users/users.module';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LikeModel.name, schema: LikeSchema },
      { name: UserModel.name, schema: UserSchema },
    ]),
    forwardRef(() => PostsModule),
    forwardRef(() => CommentsModule),
    UsersModule,
  ],
  providers: [LikesService, LikesRepository],
  exports: [LikesService, LikesRepository],
})
export class LikesModule {}
