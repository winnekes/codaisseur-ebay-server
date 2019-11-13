import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BaseEntity } from 'typeorm/repository/BaseEntity';
import {
    IsString,
    Length,
    MinLength,
    IsEmail,
    IsPhoneNumber,
} from 'class-validator';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import Advertisement from '../advertisements/entity';

@Entity()
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @IsString()
    @Length(5, 25)
    @Column('text')
    name: string;

    @IsString()
    @MinLength(8)
    @Column('text')
    @Exclude({ toPlainOnly: true })
    password: string;

    @IsEmail()
    @Column()
    email: string;

    @IsPhoneNumber('NL')
    @Column()
    phone: string;

    @OneToMany(
        () => Advertisement,
        advertisement => advertisement.user
    )
    advertisements: Advertisement[];

    async setPassword(rawPassword: string) {
        const hash = await bcrypt.hash(rawPassword, 10);
        this.password = hash;
    }

    checkPassword(rawPassword: string): Promise<boolean> {
        return bcrypt.compare(rawPassword, this.password);
    }
}
