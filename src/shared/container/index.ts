import { container } from 'tsyringe';

import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository';
import { CategoriesRepository } from '../../modules/cars/repositories/implementations/CategoriesRepository';
import { SpecificationsRepository } from '../../modules/cars/repositories/implementations/SpecificationsRepository';
import { ISpecificationsRepository } from '../../modules/cars/repositories/ISpecificationsRepository';

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository", //Nome do container
  CategoriesRepository    //Classe que vai chamar
)

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
)