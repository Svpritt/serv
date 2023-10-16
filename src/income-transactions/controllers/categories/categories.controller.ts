import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { CategoriesDto } from 'src/income-transactions/dtos/categories.dto';
import { CategoriesService } from 'src/income-transactions/services/categories/categories.service';
import { Category } from 'src/typeorm/entities/Category';

@Controller('categories')
export class CategoriesController {

    constructor (private CategoryService: CategoriesService ) {}

    @Post()
    async addCategory(@Body() expenseCategoriesDto: CategoriesDto) {
        // Создайте транзакцию, используя DTO
        const result = await this.CategoryService.newCategory(expenseCategoriesDto);

        // Отправьте ответ на фронтенд
        return { message: 'Transaction created successfully', data: result };
    }

    @Get('all')
    getAllCategories(){
        const allCategories = this.CategoryService.getAllCategories();
        return allCategories;
    }

    @Get('expense')
    async getAllExpenseCategory() {
    const expenseCategories = await this.CategoryService.getAllCategories();
    const filteredExpenseCategories = expenseCategories.filter(category => category.type === 'expense');
    return filteredExpenseCategories;
    }
    @Get('income')
    async getAllIncomeCategory() {
    const expenseCategories = await this.CategoryService.getAllCategories();
    const filteredExpenseCategories = expenseCategories.filter(category => category.type === 'income');
    return filteredExpenseCategories;
    }

    @Delete(':id')
    async deleteExpenseCategory(@Param('id') id: number): Promise<void> {
    await this.CategoryService.deleteCategory(id);
    }
    
    @Patch(':id') // Используем HTTP метод PATCH для обновления ресурса
    async updateCategory(@Param('id') id: number, @Body() categoriesDto: CategoriesDto): Promise<Category> {
      // Вызываем метод update вашего сервиса для обновления категории
      const updatedCategory = await this.CategoryService.update(id, categoriesDto);
  
      // Возвращаем обновленную категорию в ответе
      return updatedCategory;
    }
}
