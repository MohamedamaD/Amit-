import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { FindOptionsWhere, Repository } from 'typeorm'
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(@InjectRepository(Comment) private commentRepository: Repository<Comment>) { }

  async create(createCommentDto: CreateCommentDto) {
    const comment = await this.commentRepository.create(createCommentDto) // Create Only

    return this.commentRepository.save(comment) //  
  }

  findAll() {
    return this.commentRepository.find()
  }

  findOne(id: string) {
    return this.commentRepository.findOne({ where: { id } })
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    await this.commentRepository.update(id, updateCommentDto) // update Only 
    return this.findOne(id) // Get Only Comment => return controller => await
  }

  async remove(id: string) {
    const comment = await this.findOne(id) 
    return this.commentRepository.remove(comment as Comment) // comment => Comment  !
  }
}
