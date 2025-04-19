import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './post/post.module';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { User, UserSchema } from './user/entities/user.entity';
import { PostSchema, Post } from './post/entities/post.entity';
import { CommentModule } from './comment/comment.module';
import { Comment, CommentSchema } from './comment/entities/comment.entity';
import { ProductModule } from './product/product.module';

import { TypeOrmModule } from '@nestjs/typeorm'

// process.env.CONN_STRING // undefined 

@Module({
  imports: [

    // Connect TypeORM
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<any>('type'),
        database: configService.get<any>('database'),
        username: configService.get<any>('username'),
        password: configService.get<any>('password'),
        port: configService.get<any>('port'),
        synchronize: true,
        // entities: [Post, Product]
        autoLoadEntities: true
      })
    }),




    UserModule,
    PostModule,
    ConfigModule.forRoot({ isGlobal: true }),
    // forRoot ==> Connection 
    // forFeatures ==> Add Model to DB
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService], // constructor(private configService: ConfigService)
      useFactory: (configService: ConfigService) => ({ uri: configService.get('CONN_STRING') })
      ,
    }),

    // Global
    MongooseModule.forFeature(
      [
        { name: User.name, schema: UserSchema },
        { name: Post.name, schema: PostSchema },
        { name: Comment.name, schema: CommentSchema }
      ]
    ),

    CommentModule,

    ProductModule
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: []
})
export class AppModule { }
