import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class UpdateProductDTO {
  @IsString()
  name: string;

  @IsNumber()
  @Min(0, { message: 'Valor do produto tem que ser maior que 0.' })
  price: number;

  @IsNumber({}, { message: 'Id da categoria tem que ser um número.' })
  categoryId: number;

  isActive: boolean;
}
