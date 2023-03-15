import { Entity, Column, OneToMany, ManyToOne, Relation } from 'typeorm';
import { User } from './User';
import { Language } from './Language';

@Entity()
export class Game {
  @Column()
  languageID: string;

  @Column()
  timer: number;

  @Column({ default: 0 })
  yourMistakes: number;

  @Column({ default: 0 })
  theirMistakes: number;

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
