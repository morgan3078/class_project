import { AppDataSource } from '../dataSource';
import { User } from '../entities/User';

const userRepository = AppDataSource.getRepository(User);

async function addUser(email: string, passwordHash: string): Promise<User> {
  // Create the new user object
  let newUser = new User();
  newUser.email = email;
  newUser.passwordHash = passwordHash;
  newUser.firstName = firstName;
  newUser.lastName = lastName;
  // Then save it to the database
  // NOTES: We reassign to `newUser` so we can access
  // NOTES: the fields the database autogenerates (the id & default columns)
  newUser = await userRepository.save(newUser);

  return newUser;
}

async function getUserByEmail(email: string): Promise<User | null> {
  return userRepository.findOne({ where: { email } });
}

async function getUserById(userId: string): Promise<User | null> {
  const user = await userRepository.findOne({ where: { userId } });
  return user;
}

async function allUserData(): Promise<User[]> {
  return userRepository.find();
}

async function getUserByFirstName(firstName: string): Promise<User | null> {
  const user = await userRepository.findOne({ where: { firstName } });
  return user;
}

async function getUserByLastName(lastName: string): Promise<User | null> {
  const user = await userRepository.findOne({ where: { lastName } });
  return user;
}

async function updateEmailAddress(userId: string, newEmail: string): Promise<void> {
  await userRepository
    .createQueryBuilder()
    .update(User)
    .set({ email: newEmail })
    .where({ userId })
    .execute();
}

export {
  addUser,
  getUserByEmail,
  getUserById,
  allUserData,
  getUserByFirstName,
  getUserByLastName,
  updateEmailAddress,
};
