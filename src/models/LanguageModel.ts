import { AppDataSource } from '../dataSource';
import { Language } from '../entities/Language';
import { User } from '../entities/User';

const languageRepository = AppDataSource.getRepository(Language);

async function addLanguage(language: string, byUser: User): Promise<Language> {
  // Create the new Review object
  let newLanguage = new Language();
  newLanguage.language = language;
  let num = newLanguage.usersUsing;
  num += 1;
  newLanguage.user = byUser;
  newLanguage.usersUsing = num;
  newLanguage = await languageRepository.save(newLanguage);
  return newLanguage;
}

async function getLanguageById(languageId: string): Promise<Language | null> {
  return languageRepository
    .createQueryBuilder('language')
    .leftJoinAndSelect('languages.user', 'user')
    .where('languageId = :languageId', { languageId })
    .getOne();
}

async function getLanguages(): Promise<Language[]> {
  return languageRepository.find();
}

async function userHasLanguageForBook(userId: string, language: string): Promise<boolean> {
  const languageExists = await languageRepository
    .createQueryBuilder('languages')
    .leftJoinAndSelect('languages.user', 'user')
    .where('user.userId = :userId', { userId })
    .andWhere('languages.language = :language', { language })
    .getExists();

  return languageExists;
}

async function getLanguagesByUserId(userId: string): Promise<Language[]> {
  const languages = await languageRepository
    .createQueryBuilder('languages')
    .leftJoinAndSelect('languages.user', 'user')
    .where('user.userId = :userId', { userId })
    .select(['languages', 'user.userId'])
    .getMany();
  return languages;
}

export { addLanguage, getLanguageById, getLanguages, getLanguagesByUserId, userHasLanguageForBook };
