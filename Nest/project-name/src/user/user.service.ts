import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model, Types } from 'mongoose';
import { Post } from 'src/post/entities/post.entity';

@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) { } // 

  create(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create(createUserDto);
  }

  findAll(): Promise<User[]> {
    return this.userModel.find().populate('posts');
  }
  findOne(id: string): Promise<User | null> {
    return this.userModel.findById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });

  }

  remove(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id);
  }



  pushElementToPost(user_id: Types.ObjectId, post: Types.ObjectId): Promise<User | null> {
    {
      return this.userModel.findByIdAndUpdate(user_id, {
        $push: {
          posts: post
        }
      }, { new: true })
    }

  }
}