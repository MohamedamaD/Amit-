import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, NotFoundException } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UserService } from 'src/user/user.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService, private userService: UserService) { }

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    // createPostDto => owner id authenticate 
    const newPost = await this.postService.create(createPostDto) // Create Post 
    
    const user = await this.userService.pushElementToPost(newPost.owner, newPost._id)

    return { post: newPost, user }
  }

  @Get()
  findAll() {
    return this.postService.findAll(); // await?
  }

  // Inside Controller Async Await : Optional - Try Catch Optional - Validation Data - Change Shape return 

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const post = await this.postService.findOne(id);

    if (!post) {
      throw new NotFoundException('Post not found')
    }

    return { message: 'Success', data: post }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    const post = await this.postService.update(id, updatePostDto); // update(id, updatePostDto);

    if (!post) throw new NotFoundException('Post not found')

    return post
  }

  @Delete(':id')
  async remove(@Param('id') id: string) { // 
    const post = await this.postService.destroy(id);

    if (!post) throw new NotFoundException('Post not found')
    return post;
  }
}
