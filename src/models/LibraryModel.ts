import { AppDataSource } from '../dataSource';
import { Library } from '../entities/Library';

const libraryRepository = AppDataSource.getRepository(Library);

async function getLibraryById(libraryId: string): Promise<Library | null> {
  const library = await libraryRepository
    .createQueryBuilder('library')
    .leftJoinAndSelect('library.user', 'user')
    .leftJoinAndSelect('library.languages', 'languages')
    .where('library.libraryId = :libraryId', { libraryId })
    .getOne();

  return library;
}

async function updateLibrary(library: Library): Promise<Library> {
  const updatedLibrary = library;
  updatedLibrary.wordCount += 1;
  await libraryRepository
    .createQueryBuilder()
    .update(Library)
    .set({ wordCount: updatedLibrary.wordCount })
    .where({ libraryId: updatedLibrary.libraryId });
  return updatedLibrary;
}

export { getLibraryById, updateLibrary };
