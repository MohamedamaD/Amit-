import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { User } from "src/user/entities/user.entity";

@Schema()
export class Post {
    @Prop({ required: true, type: String })
    title: string;
    @Prop({ required: true, type: String })
    content: string;
    @Prop({ type: Types.ObjectId, ref: 'User' })
    owner: Types.ObjectId

    _id: Types.ObjectId
}

export const PostSchema = SchemaFactory.createForClass(Post);
