import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, Relation } from 'typeorm';
import { User } from './User';
import { Language } from './Language';
import { Words } from './Words';

@Entity()
export class Library {
  @PrimaryGeneratedColumn('uuid')
  libraryId: string;

  @Column({ default: false })
  wordUsed: boolean;

  @Column()
  wordCount: number;

  @Column()
  languageID: string;

  @OneToOne(() => User, (user) => user.library)
  user: Relation<User>;

  @OneToMany(() => Language, (languages) => languages.library)
  languages: Relation<Language>[];

  @OneToMany(() => Words, (words) => words.library)
  words: Relation<Words>[];
}
