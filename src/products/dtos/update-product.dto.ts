import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, Length, Min } from 'class-validator';

export class UpdateProductDTO {
  @IsNotEmpty()
  @IsString()
  @Length(10, 30)
  name!: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  price!: number;

  @IsNotEmpty()
  @IsString()
  @Length(10, 200)
  @Transform(({ value }) => (Array.isArray(value) ? value.join(', ') : value))
  description!: string;
}
