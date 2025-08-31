import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { CartService } from './provider/cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateDoc, CreateGetDoc } from '@/shared/doc-response';
import { ClearCartParamDto } from './dto/clear-cart.dto';

@ApiTags('cart')
@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @CreateDoc('Add to cart', AddToCartDto)
  @Post()
  addToCart(@Body() addToCartDto: AddToCartDto) {
    return this.cartService.addToCart(addToCartDto);
  }

  @CreateGetDoc('Clear cart', ClearCartParamDto)
  @ApiParam({ name: 'id', type: String, description: 'Cart ID' })
  @Delete(':id')
  clearCart(@Param() clearCartParamDto: ClearCartParamDto) {
    return this.cartService.clearCart(clearCartParamDto);
  }
}
