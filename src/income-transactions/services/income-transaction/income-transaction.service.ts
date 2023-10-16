//src/income-transactions/services/income-transaction/income-transaction.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { trans } from 'src/typeorm/entities/trans';
import { EditTransactionDto } from 'src/income-transactions/dtos/update-transaction.dto';

@Injectable()
export class IncomeTransactionService {
    constructor (
        @InjectRepository(trans) private readonly transRepository: Repository<trans> ){}
        
        async getAllTransactions (){
            return await this.transRepository.find({
                order: {
                  date: 'DESC',
                },
              });
    }
    async getTransactionsForMonth(year: number, month: number): Promise<trans[]> {
        const startDate = new Date(`${year}-${month.toString().padStart(2, '0')}-01`);
        
        // установил конечную дату на последний день того же месяца
        const endDate = new Date(year, month, 1); //был указан 0 не грузило последний день месяца на 1 работает корректо но 31 нет,
        // ибо если меньше дней то грузит первый день след месяца.
        
        return await this.transRepository.find({
          where: {
            date: Between(
              startDate.toISOString().substring(0, 10),
              endDate.toISOString().substring(0, 10)
            )
          },
          order: {
            date: 'DESC'
          }
        });
      } 
      
      
    async addTransaction(transactionData: any) {
        // Создайте экземпляр сущности на основе данных
        const transaction = new trans();
        transaction.name = transactionData.name;
        transaction.summ = transactionData.summ;
        transaction.date = transactionData.date;
        transaction.description = transactionData.description;
        transaction.categoryType = transactionData.categoryType;
        // Сохраните сущность в базе данных
        await this.transRepository.save(transaction);
        // Возвращайте сохраненную сущность или какой-либо другой результат
        return transaction;
      }
      async updateTransaction(id: number, transactionData: any): Promise<trans> {
        const existingTransaction = await this.transRepository.findOneOrFail({ where: { id } });
      
        if (transactionData.name) {
          existingTransaction.name = transactionData.name;
        }
      
        if (transactionData.summ) {
          existingTransaction.summ = transactionData.summ;
        }
      
        if (transactionData.date) {
          existingTransaction.date = transactionData.date;
        }
      
        if (transactionData.description) {
          existingTransaction.description = transactionData.description;
        }
      
        if (transactionData.categoryType) {
          existingTransaction.categoryType = transactionData.categoryType;
        }
      
        return await this.transRepository.save(existingTransaction);
      }
      async deleteTransaction(id: number): Promise<void> {
        // Используйте метод delete вашего репозитория для удаления транзакции по идентификатору
        await this.transRepository.delete(id);
      }
      
}
 