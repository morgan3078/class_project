import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  ManyToOne,
  JoinColumn,
  Relation,
  JoinTable,
} from 'typeorm';

import { Library } from './Library';
import { Friend } from './Friend';
import { Language } from './Language';
import { Game } from './Game';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  passwordHash: string;

  @Column({ default: false })
  verifiedEmail: boolean;

  @Column({ unique: true })
  username: string;

  @Column({ default: '' })
  libraryId: string;

  @Column({ default: '' })
  friendListId: string;

  @Column({ default: 0 })
  numOfFriends: number;

  @OneToOne(() => Library, (library) => library.user)
  @JoinColumn()
  library: Relation<Library>;

  @OneToMany(() => Friend, (friends) => friends.user)
  friends: Relation<Friend>[];

  @ManyToOne(() => Game, (game) => game.users)
  game: Relation<Game>;

  @OneToMany(() => Language, (languages) => languages.user)
  @JoinTable()
  languages: Relation<Language>[];
}
