import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateOrderDTO {
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  client!: string;

  @IsNotEmpty()
  @IsString()
  productId!: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 100)
  @Transform(({ value }) => (Array.isArray(value) ? value.join(', ') : value))
  address!: string;
}
