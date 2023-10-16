import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CreateTransactionDto } from 'src/income-transactions/dtos/createTransactions.dto';
import { IncomeTransactionService } from 'src/income-transactions/services/income-transaction/income-transaction.service';
import { EditTransactionDto } from 'src/income-transactions/dtos/update-transaction.dto';

@Controller('income-transaction')
export class IncomeTransactionController {

    constructor (private incomeTransactionService: IncomeTransactionService) {}

    @Get()
    getAllTransactions() {
        // Получение всех данных
        return this.incomeTransactionService.getAllTransactions();
    }
    @Get('transactions-for-month')
  async getTransactionsForMonth(
    @Query('year', ParseIntPipe) year: number,
    @Query('month', ParseIntPipe) month: number,
  ) {
    return this.incomeTransactionService.getTransactionsForMonth(year, month);
  }


    @Post()
    async createTransaction(@Body() createTransactionDto: CreateTransactionDto) {
        // Создайте транзакцию, используя DTO
        const result = await this.incomeTransactionService.addTransaction(createTransactionDto);

        // Отправьте ответ на фронтенд
        return { message: 'Transaction created successfully', data: result };
    }

    @Patch(':id') // Используем HTTP метод PATCH для обновления ресурса
    async updateTransaction(
        @Param('id') id: number, // Получаем id из URL
        @Body() transactionData: EditTransactionDto // Получаем данные для обновления из тела запроса
    ): Promise<CreateTransactionDto> {
        // Вызываем метод updateTransaction вашего сервиса для обновления транзакции
        const updatedTransaction = await this.incomeTransactionService.updateTransaction(id, transactionData);

        // Возвращаем обновленную транзакцию в ответе
        return updatedTransaction;
    }
    @Delete(':id') // Определите маршрут для удаления транзакции по ID
  async deleteTransaction(@Param('id') id: number): Promise<void> {
    // Вызовите метод deleteTransaction из сервиса
    try {
      await this.incomeTransactionService.deleteTransaction(id);
    } catch (error) {
      // Если транзакция с указанным ID не найдена, выбросьте исключение NotFoundException
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
  }

}
