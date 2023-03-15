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

  @Column()
  wordCount: number;

  @ManyToOne(() => Library, (library) => library.languages)
  library: Relation<Library>;

  @ManyToMany(() => Words, (words) => words.languages)
  @JoinTable()
  words: Relation<Words>[];

  @ManyToMany(() => User, (users) => users.languages)
  users: Relation<User>[];

  @OneToMany(() => Game, (games) => games.language)
  games: Relation<Game>[];
}
