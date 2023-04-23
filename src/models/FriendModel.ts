import { AppDataSource } from '../dataSource';
import { Friend } from '../entities/Friend';
import { User } from '../entities/User';

const friendRepository = AppDataSource.getRepository(Friend);

async function getFriendsByUserId(userId: string): Promise<Friend[]> {
  const links = await friendRepository
    .createQueryBuilder('friend')
    .where({ user: { userId } }) // NOTES: This is how you do nested WHERE clauses
    .leftJoinAndSelect('friend.user', 'user') /* TODO: specify the relation you want to join with */
    .select([
      'user',
      'friend.friendId',
      'friend.friendName',
    ]) /* TODO: specify the fields you want */
    .getMany();
  return links;
}

async function addFriend(friendId: string, friendName: string, creator: User): Promise<Friend> {
  let num = creator.numOfFriends;
  num += 1;
  let newFriend = new Friend();
  newFriend.friendId = friendId;
  newFriend.friendName = friendName;
  newFriend.user = creator;
  newFriend.user.numOfFriends = num;
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
    .createQueryBuilder('friend')
    .delete()
    .where('friendId = :friendId', { friendId })
    .execute();
}

export { getFriendsByUserId, addFriend, friendBelongsToUser, deleteFriendById };
