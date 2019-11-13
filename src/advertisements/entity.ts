import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from 'typeorm/repository/BaseEntity';
import { IsString, Length, MinLength, IsInt, IsUrl } from 'class-validator';
import User from '../users/entity';

@Entity()
export default class Advertisement extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @IsString()
    @Length(5, 25)
    @Column('text')
    name: string;

    @IsString()
    @MinLength(10)
    @Column('text')
    description: string;

    @IsInt()
    @Column()
    price: number;

    @IsUrl()
    @Column()
    imageUrl: string;

    @ManyToOne(
        () => User,
        user => user.advertisements
    )
    user: User;
}
