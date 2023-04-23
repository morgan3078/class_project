type NewUserRequest = {
  email: string;
  username: string;
  password: string;
};

type NewNameBody = {
  newName: string;
};

type UpdateLibraryRequest = {
  libraryId: string;
  languageId: string;
};

type UserIdParam = {
  userId: string;
};

type UserNameParam = {
  userName: string;
};

type NewEmailBody = {
  newEmail: string;
};

type AuthRequest = {
  email: string;
  password: string;
};
