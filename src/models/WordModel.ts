import { AppDataSource } from '../dataSource';
import { Words } from '../entities/Words';
import { Language } from '../entities/Language';

const wordRepository = AppDataSource.getRepository(Words);

async function getWordsByLanguageID(languageID: string): Promise<Words[]> {
  const words = await wordRepository
    .createQueryBuilder('words')
    .leftJoinAndSelect('words.languages', 'languages')
    .where('languages.languageID = :languageID', { languageID })
    .select(['words', 'languages.languageID'])
    .getMany();
  return words;
}

async function wordIsReal(word: string): Promise<boolean> {
  const newWord = new Words();
  newWord.word = word;
}

export { getWordsByLanguageID };
