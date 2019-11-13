import {
    JsonController,
    Get,
    Param,
    Put,
    Body,
    NotFoundError,
    Post,
} from 'routing-controllers';

import Product from './entity';

@JsonController()
export default class ProductController {
    @Get('/products/:id')
    getProduct(@Param('id') id: number) {
        return Product.findOne(id);
    }

    @Get('/products')
    async allProducts() {
        const products = await Product.find();
        return { products: products };
    }

    @Put('/products/:id')
    async updateProduct(
        @Param('id') id: number,
        @Body() update: Partial<Product>
    ) {
        const product = await Product.findOne(id);
        if (!product) throw new NotFoundError('Cannot find page');

        return Product.merge(product, update).save();
    }

    @Post('/users')
    async createUser(@Body() product: Product) {
        const entity = await Product.create(product);
        return entity.save();
    }
}
