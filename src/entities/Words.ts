import { Entity, Column, ManyToMany, ManyToOne, Relation } from 'typeorm';
import { Language } from './Language';
import { Library } from './Library';

@Entity()
export class Words {
  @Column()
  languageID: string;

  @Column()
  word: string;

  @ManyToMany(() => Language, (languages) => languages.words)
  languages: Relation<Language>[];

  @ManyToOne(() => Library, (library) => library.words)
  library: Relation<Library>;
}
