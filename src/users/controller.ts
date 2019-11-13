import {
    JsonController,
    Get,
    Param,
    Put,
    Body,
    NotFoundError,
    Post,
} from 'routing-controllers';

import User from './entity';

@JsonController()
export default class UserController {
    @Get('/users/:id')
    getUser(@Param('id') id: number) {
        return User.findOne(id);
    }

    @Get('/users')
    async allUsers() {
        const users = await User.find();
        return { users: users };
    }

    @Put('/users/:id')
    async updateUser(@Param('id') id: number, @Body() update: Partial<User>) {
        const user = await User.findOne(id);
        if (!user) throw new NotFoundError('Cannot find page');

        return User.merge(user, update).save();
    }

    @Post('/users')
    async createUser(@Body() user: User) {
        const entity = await User.create(user);
        return entity.save();
    }
}
