import fs from 'fs';
import { parse as csvParse } from 'csv-parse';

import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoryUseCase {
  constructor(private categoryRepository: ICategoriesRepository) { }

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      //Cria um stream de leitura passando o caminho do arquivo que será lido
      const stream = fs.createReadStream(file.path);

      const categories: IImportCategory[] = []

      //Responsável por ler as linhas do arquivo
      const parseFile = csvParse();

      //Vai pegar o pedaço do arquivo lido e passar para o parseFile
      stream.pipe(parseFile);

      parseFile
        .on('data', async (line) => {
          const [name, description] = line;
          categories.push({
            name,
            description,
          });
        })
        .on('end', () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on('error', (err) => {
          reject(err);
        })
    });
  }

  //Recebe o arquivo
  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.map(async category => {
      const { name, description } = category;

      const existCategory = this.categoryRepository.findByName(name);

      if (!existCategory) {
        this.categoryRepository.create({
          name,
          description,
        });
      }
    })
  }
}

export { ImportCategoryUseCase };