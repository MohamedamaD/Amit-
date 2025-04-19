import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Post, PostSchema } from './entities/post.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Post.name, schema: PostSchema },
    { name: User.name, schema: UserSchema }
  ])],
  controllers: [PostController],
  providers: [PostService, UserService], // import UserService inside other Module
})
export class PostModule { }
