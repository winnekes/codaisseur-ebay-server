import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from 'typeorm/repository/BaseEntity';
import { IsString, Length, MinLength, IsInt, IsUrl } from 'class-validator';

@Entity()
export default class Product extends BaseEntity {
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

    /*     @ManyToOne(
        type => User,
        user => user.photos
    )
    user: User; */
}
