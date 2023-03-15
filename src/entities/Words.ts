import { Entity, Column, ManyToMany, Relation } from 'typeorm';
import { Language } from './Language';

@Entity()
export class Words {
  @Column()
  languageID: string;

  @Column()
  word: string;

  @ManyToMany(() => Language, (languages) => languages.words)
  languages: Relation<Language>[];
}
