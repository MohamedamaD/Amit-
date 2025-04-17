
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Mongoose } from 'mongoose';

@Schema()
export class Cat {
    @Prop()
    name: string;

    @Prop()
    age: number;

    @Prop()
    breed: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
@Schema()
export class User {
    @Prop({ isRequired: true, unique: true })
    username: string;
    @Prop({ isRequired: true }) 
    password: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Cat' })
    cat: Cat
}


export const UserSchema = SchemaFactory.createForClass(User)