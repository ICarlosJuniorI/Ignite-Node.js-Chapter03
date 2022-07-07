import { container } from 'tsyringe';

import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository';
import { CategoriesRepository } from '../../modules/cars/repositories/implementations/CategoriesRepository';

//ICategoriesRepository
container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository", //Nome do container
  CategoriesRepository    //Classe que vai chamar
)