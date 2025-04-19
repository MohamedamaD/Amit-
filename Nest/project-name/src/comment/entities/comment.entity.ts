// import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Table } from "typeorm";

// @Schema()
// export class Comment {
//     @Prop({ required: true, type: String })
//     text: string
// }

// export const CommentSchema = SchemaFactory.createForClass(Comment);

// @Table() sequelize 

@Entity()
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    id: string
    @Column({ type: 'string' }) // varchar === string 
    text: string
}
