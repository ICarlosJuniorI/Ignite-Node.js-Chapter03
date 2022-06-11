import { Category } from "../../model/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO
} from "./../ICategoriesRepository";
class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[];

  private static INSTANCE: CategoriesRepository;

  private constructor() {
    this.categories = [];
  }

  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository();
    }
    return CategoriesRepository.INSTANCE;
  }

  //Cria uma nova categoria
  create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category();

    //O objeto 'category' vai receber os atributos que forem passados
    Object.assign(category, {
      name,
      description,
      created_at: new Date()
    });

    this.categories.push(category);
  }

  //Lista as categorias existentes
  list(): Category[] {
    return this.categories;
  }

  //Verifica se a categoria já existe 
  findByName(name: string): Category {
    const category = this.categories.find(c => c.name === name);

    return category;
  }
}

export { CategoriesRepository };