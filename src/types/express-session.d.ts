import 'express-session';

declare module 'express-session' {
  export interface Session {
    clearSession(): Promise<void>; // DO NOT MODIFY THIS!

    // NOTES: Our example app's custom session properties:
    authenticatedUser: {
      userId: string;
      username: string;
      email: string;
    };
    isLoggedIn: boolean;
    logInAttempts: number;
    logInTimeout: string;
    coins: string;
  }
}
