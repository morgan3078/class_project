import { Request, Response } from 'express';
import { getUserById } from '../models/UserModel';
import {
  addFriend,
  deleteFriendById,
  friendBelongsToUser,
  getFriendsByUserId,
} from '../models/FriendModel';
import { parseDatabaseError } from '../utils/db-utils';

async function getFriendsForUser(req: Request, res: Response): Promise<void> {
  if (!req.session.isLoggedIn) {
    res.sendStatus(401);
    return;
  }
  const { userId } = req.params as UserIdParam;
  const user = await getUserById(userId);
  if (!user) {
    res.sendStatus(404);
  }
  let friends;
  if (req.session.isLoggedIn) {
    friends = await getFriendsByUserId(userId);
  }
  console.log('friend: ', friends);
  res.json(friends);
}

async function registerFriend(req: Request, res: Response): Promise<void> {
  if (!req.session.isLoggedIn) {
    res.sendStatus(401);
    return;
  }
  const { authenticatedUser } = req.session;
  const user = await getUserById(authenticatedUser.userId);
  if (!user) {
    res.sendStatus(404);
    return;
  }
  const { friendId, friendName } = req.body as NewFriendRequest;
  try {
    const newFriend = await addFriend(friendId, friendName, user);
    console.log(newFriend);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

async function deleteFriendForUser(req: Request, res: Response): Promise<void> {
  const { isLoggedIn, authenticatedUser } = req.session;
  if (!isLoggedIn) {
    res.sendStatus(401);
    return;
  }
  const { friendId } = req.body as FriendIdBody;
  console.log('friendId:', friendId);
  console.log('authenticatedUser.userId:', authenticatedUser.userId);
  const friendExists = await friendBelongsToUser(friendId, authenticatedUser.userId);
  if (!friendExists) {
    res.sendStatus(403);
    return;
  }

  await deleteFriendById(friendId);
  res.sendStatus(204);
}

export { getFriendsForUser, registerFriend, deleteFriendForUser };
