import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Post()
  // @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    if (!user) throw new NotFoundException('User not found');

    return user
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.update(id, updateUserDto);
    if (!user) throw new NotFoundException('User not found');

    return user
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const user = await this.userService.remove(id);
    if (!user) throw new NotFoundException('User not found');

    return user
  }
}
