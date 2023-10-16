// src/income-transactions/dtos/update-categories.dto.ts
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateCategoriesDto {
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
