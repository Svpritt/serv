import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesDto } from 'src/income-transactions/dtos/categories.dto';
import { UpdateCategoriesDto } from 'src/income-transactions/dtos/update-categories.dto';
import { Category } from 'src/typeorm/entities/Category';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {

    constructor (
        @InjectRepository(Category) private readonly CategoryRepository: Repository<Category> ){}

        async newCategory(categoryData: any) {
            // Создайте экземпляр сущности на основе данных
            const category = new Category();
            category.name = categoryData.name;
            category.icon = categoryData.icon;
            category.amount = categoryData.date;
            category.type = categoryData.type;
            // Сохраните сущность в базе данных
            await this.CategoryRepository.save(category);
            // Возвращайте сохраненную сущность или какой-либо другой результат
            return category;
        }
        
        async getAllCategories(){
            return await this.CategoryRepository.find();
        }
        async deleteCategory(id: number): Promise<void> {
            await this.CategoryRepository.delete(id);
        }
       
        async update(id: number, categoriesDto: CategoriesDto): Promise<Category> {
            const existingCategory = await this.CategoryRepository.findOneOrFail({ where: { id } });
            if (categoriesDto.name) {
              existingCategory.name = categoriesDto.name;
            }
        
            if (categoriesDto.icon) {
              existingCategory.icon = categoriesDto.icon;
            }
        
            if (categoriesDto.amount) {
              existingCategory.amount = categoriesDto.amount;
            }
        
            if (categoriesDto.type) {
              existingCategory.type = categoriesDto.type;
            }
        
            return await this.CategoryRepository.save(existingCategory);
          }
        
          
}
