import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Post {
    @PrimaryGeneratedColumn('uuid') // ObjectId
    id: string // typescript 

    @Column({ nullable: false })
    name: string

    @ManyToOne(() => User, user => user.posts, { cascade: true })
    user: User // owner
}

// 1 User => M Post
@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid') // ObjectId
    id: string // typescript 

    @Column({ nullable: false })
    name: string

    @OneToMany(() => Post, post => post.user, { cascade: true }) //
    posts: Post[] // 
}