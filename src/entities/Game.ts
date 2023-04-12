import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, Relation } from 'typeorm';
import { User } from './User';
import { Language } from './Language';

@Entity()
export class Game {
  @PrimaryGeneratedColumn('uuid')
  gameId: string;

  @Column()
  languageID: string;

  @Column({ default: 100 })
  timer: number;

  @Column({ default: 0 })
  yourMistakes: number;

  @Column({ default: 0 })
  theirMistakes: number;

  @Column({ default: 0 })
  wordsUsed: number;

  @Column({ default: 0 })
  wordCount: number;

  @Column({ default: false })
  alreadyUsed: boolean;

  @Column({ default: false })
  overTime: boolean;

  @Column({ default: false })
  youWin: boolean;

  @Column({ default: false })
  theyWin: boolean;

  @Column({ default: false })
  tie: boolean;

  @OneToMany(() => User, (users) => users.game)
  users: Relation<User>[];

  @ManyToOne(() => Language, (language) => language.games)
  language: Relation<Language>;
}
