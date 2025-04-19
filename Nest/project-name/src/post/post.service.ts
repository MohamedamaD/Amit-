import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) { }

  // variable ! Type
  async create(createPostDto: CreatePostDto): Promise<Post> {
    return this.postModel.create(createPostDto) // when create post assign user 
  }

  findAll(): Promise<Post[]> {
    return this.postModel.find() // Promise<Post[]>
  }

  // Promise<Post> | Promise<null> 

  // Promise<Post | null>

  findOne(id: string): Promise<Post | null> {
    return this.postModel.findById(id); // Promise<Post>
  }

  update(id: string, updatePostDto: UpdatePostDto): Promise<Post | null> {
    return this.postModel.findByIdAndUpdate(id, updatePostDto, { new: true });
  }

  destroy(id: string): Promise<Post | null> {
    return this.postModel.findByIdAndDelete(id);
  }
}
