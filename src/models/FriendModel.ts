import { AppDataSource } from '../dataSource';
import { Friend } from '../entities/Friend';
import { User } from '../entities/User';

const friendRepository = AppDataSource.getRepository(Friend);

async function getFriendsByUserId(userId: string): Promise<Friend[]> {
  const friends = await friendRepository
    .createQueryBuilder('friend')
    .where({ user: { userId } })
    .leftJoinAndSelect('friend.user', 'user')
    .select(['user', 'friend.friendId', 'friend.friendName'])
    .getMany();

  return friends;
}

async function addFriend(friendId: string, friendName: string, user: User): Promise<Friend> {
  let newFriend = new Friend();
  newFriend.friendId = friendId;
  newFriend.friendName = friendName;
  newFriend.user = user;
  newFriend.user.friendListSize += 1;
  newFriend = await friendRepository.save(newFriend);
  return newFriend;
}

async function friendBelongsToUser(friendId: string, userId: string): Promise<boolean> {
  const friendExists = await friendRepository
    .createQueryBuilder('friend')
    .leftJoinAndSelect('friend.user', 'user')
    .where('friend.friendId = :friendId', { friendId })
    .andWhere('user.userId = :userId', { userId })
    .getExists();
  return friendExists;
}

async function deleteFriendById(friendId: string): Promise<void> {
  await friendRepository
    .createQueryBuilder('friendId')
    .delete()
    .where('friendId = :friendId', { friendId })
    .execute();
}

export { getFriendsByUserId, addFriend, friendBelongsToUser, deleteFriendById };
