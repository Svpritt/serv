import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncomeTransactionsModule } from './income-transactions/income-transactions.module';
import { trans } from './typeorm/entities/trans';
import { Category } from './typeorm/entities/Category';



@Module({
  imports: [TypeOrmModule.forRoot({
    type:'mysql',
    host:'127.0.0.1',
    port: 3306,
    username: 'root',
    password: null,
    database: 'nestks',
    entities: [trans, Category ], // Добавьте вашу сущность сюда  trans   ExpenseCategory   ExpenseCategoriesModule,
    synchronize: true,
  }),
  IncomeTransactionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
