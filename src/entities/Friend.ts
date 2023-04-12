import { Entity, Column, ManyToOne, Relation } from 'typeorm';

import { User } from './User';

@Entity()
export class Friend {
  @Column()
  friendId: string;

  @Column()
  friendName: string;

  @Column()
  friendLibrary: string;

  @ManyToOne(() => User, (user) => user.friends)
  user: Relation<User>;
}
