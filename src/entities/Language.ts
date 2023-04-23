import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  OneToMany,
  JoinTable,
  Relation,
} from 'typeorm';

import { Library } from './Library';
import { Words } from './Words';
import { User } from './User';
import { Game } from './Game';

@Entity()
export class Language {
  @PrimaryGeneratedColumn('uuid')
  languageID: string;

  @Column({ default: '' })
  language: string;

  @Column({ default: 0 })
  usersUsing: number;

  @Column()
  wordCount: number;

  @ManyToOne(() => Library, (library) => library.languages)
  library: Relation<Library>;

  @ManyToMany(() => Words, (words) => words.languages)
  @JoinTable()
  words: Relation<Words>[];

  @ManyToOne(() => User, (user) => user.languages)
  user: Relation<User>;

  @OneToMany(() => Game, (games) => games.language)
  games: Relation<Game>[];
}
