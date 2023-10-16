import { Module } from '@nestjs/common';
import { IncomeTransactionController } from './controllers/income-transaction/income-transaction.controller';
import { IncomeTransactionService } from './services/income-transaction/income-transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { trans } from 'src/typeorm/entities/trans';
import { Category } from 'src/typeorm/entities/Category';
import { CategoriesService } from './services/categories/categories.service';
import { CategoriesController } from './controllers/categories/categories.controller';

@Module({
  imports: [TypeOrmModule.forFeature([trans, Category])],
  controllers: [IncomeTransactionController, CategoriesController],
  providers: [IncomeTransactionService, CategoriesService]
})
export class IncomeTransactionsModule {}
