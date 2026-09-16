import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class SaveProductDTO {
  @IsString()
  @IsNotEmpty({ message: 'Nome do produto é obrigatório.' })
  name: string;

  @IsNumber()
  @Min(0, { message: 'Valor do produto tem que ser maior que 0.' })
  price: number;

  @IsNumber({}, { message: 'Id da categoria tem que ser um número.' })
  @IsNotEmpty({ message: 'Id da categoria é obrigatório.' })
  categoryId: number;
}
