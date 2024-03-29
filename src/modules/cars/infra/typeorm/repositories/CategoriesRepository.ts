import { Repository, getRepository } from 'typeorm';

import {
  ICategoriesRepository,
  ICreateCategoryDTO
} from '@modules/cars/repositories/ICategoriesRepository';
import { Category } from '../entities/Category';

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  //Cria uma nova categoria
  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      name,
      description
    });

    await this.repository.save(category)
  }

  //Lista as categorias existentes
  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  //Verifica se a categoria já existe 
  async findByName(name: string): Promise<Category> {
    //SELECT * FROM CATEGORIES WHERE NAME = "NAME" LIMIT 1
    const category = await this.repository.findOne({ name });
    return category;
  }
}

export { CategoriesRepository };