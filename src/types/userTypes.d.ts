type NewUserRequest = {
  email: string;
  username: string;
  password: string;
};

type UpdateLibraryRequest = {
  libraryId: string;
  languageId: string;
};

type NewFriendRequest = {
  friendId: string;
  friendName: string;
};

type FriendIdBody = {
  friendId: string;
};

type UserIdParam = {
  userId: string;
};
