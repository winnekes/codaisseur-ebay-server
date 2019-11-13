import {
    JsonController,
    Get,
    Param,
    Put,
    Body,
    NotFoundError,
    Post,
} from 'routing-controllers';

import Advertisement from './entity';

@JsonController()
export default class AdvertisementController {
    @Get('/advertisements/:id')
    getAdvertisement(@Param('id') id: number) {
        return Advertisement.findOne(id);
    }

    @Get('/advertisements')
    async allAdvertisements() {
        const advertisements = await Advertisement.find();
        return { advertisements: advertisements };
    }

    @Put('/advertisements/:id')
    async updateAdvertisement(
        @Param('id') id: number,
        @Body() update: Partial<Advertisement>
    ) {
        const advertisement = await Advertisement.findOne(id);
        if (!advertisement) throw new NotFoundError('Cannot find page');

        return Advertisement.merge(advertisement, update).save();
    }

    @Post('/users')
    async createUser(@Body() advertisement: Advertisement) {
        const entity = await Advertisement.create(advertisement);
        return entity.save();
    }
}
