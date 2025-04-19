import { IsNotEmpty, IsString, } from "class-validator";
import { Types } from "mongoose";


export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    title: string;
    @IsNotEmpty()
    @IsString()
    content: string;
    @IsNotEmpty()
    owner: Types.ObjectId
}
// Validation
