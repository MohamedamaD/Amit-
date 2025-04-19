import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Post } from "src/post/entities/post.entity";
@Schema()
export class User {
    @Prop({ required: true, type: String }) // 1
    username: string; // 2 
    @Prop({ required: true, unique: true })
    email: string;
    @Prop({ required: true })
    password: string;

    @Prop({ type: [Types.ObjectId], ref: Post.name })
    posts: Types.ObjectId[] // typeScript 
    
    // _id - createAt - updateAt
}

export const UserSchema = SchemaFactory.createForClass(User); // 1 => forFeature