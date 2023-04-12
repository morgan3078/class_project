import { AppDataSource } from '../dataSource';
import { User } from '../entities/User';

const userRepository = AppDataSource.getRepository(User);

async function addUser(username: string, email: string, passwordHash: string): Promise<User> {
  // Create the new user object
  let newUser = new User();
  newUser.email = email;
  newUser.passwordHash = passwordHash;
  newUser.username = username;
  // Then save it to the database
  // NOTES: We reassign to `newUser` so we can access
  // NOTES: the fields the database autogenerates (the id & default columns)
  newUser = await userRepository.save(newUser);

  return newUser;
}

async function getUserByEmail(email: string): Promise<User | null> {
  const user = await userRepository
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.library', 'library')
    .leftJoinAndSelect('user.friends', 'friends')
    .where('user.email = email', { email })
    .getOne();
  return user;
}

async function getUserById(userId: string): Promise<User | null> {
  const user = await userRepository
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.library', 'library')
    .leftJoinAndSelect('user.friends', 'friends')
    .where('user.userId = userId', { userId })
    .getOne();
  return user;
}

async function allUserData(): Promise<User[]> {
  return userRepository.find();
}

async function updateEmailAddress(userId: string, newEmail: string): Promise<void> {
  await userRepository
    .createQueryBuilder()
    .leftJoinAndSelect('user.friend', 'friend')
    .update(User)
    .set({ email: newEmail })
    .where({ userId })
    .execute();
}

async function updateName(userId: string, newName: string): Promise<void> {
  await userRepository
    .createQueryBuilder()
    .leftJoinAndSelect('user.friend', 'friend')
    .update(User)
    .set({ username: newName })
    .where({ userId })
    .execute();
}

async function incrementFriends(user: User): Promise<User> {
  const userUpdate = user;
  userUpdate.friendListSize += 1;

  await userRepository
    .createQueryBuilder()
    .update(User)
    .set({ friendListSize: userUpdate.friendListSize })
    .where({ userId: userUpdate.userId })
    .execute();
  return userUpdate;
}

async function decrementFriends(user: User): Promise<User> {
  const userUpdate = user;
  userUpdate.friendListSize -= 1;
  if (userUpdate.friendListSize < 0) {
    userUpdate.friendListSize = 0;
  }
  await userRepository
    .createQueryBuilder()
    .update(User)
    .set({ friendListSize: userUpdate.friendListSize })
    .where({ userId: userUpdate.userId })
    .execute();
  return userUpdate;
}

export {
  addUser,
  getUserByEmail,
  getUserById,
  allUserData,
  updateEmailAddress,
  incrementFriends,
  decrementFriends,
  updateName,
};
