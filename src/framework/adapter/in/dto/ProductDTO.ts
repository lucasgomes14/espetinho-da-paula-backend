import { IsString, IsNumber, IsEnum, IsNotEmpty, Min } from 'class-validator';
import { CategoryEnum } from '../../../../domain/enum/product/CategoryEnum.js';

export class ProductDTO {
  @IsString()
  @IsNotEmpty({ message: 'The product name is mandatory.' })
  name: string;

  @IsNumber()
  @Min(0, { message: 'The price cannot be negative.' })
  price: number;

  @IsEnum(CategoryEnum, { message: 'Invalid category.' })
  category: CategoryEnum;
}
