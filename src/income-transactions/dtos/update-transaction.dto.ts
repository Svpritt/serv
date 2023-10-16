import { IsString, IsNumber, IsOptional } from 'class-validator';

export class EditTransactionDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsString()
  type?: string;
}
