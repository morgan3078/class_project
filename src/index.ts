import './config';
import 'express-async-errors';
import express, { Express, Request, Response, NextFunction } from 'express';

import session from 'express-session';
import connectSqlite3 from 'connect-sqlite3';
import { Server, Socket } from 'socket.io';
import { registerUser, logIn } from './controllers/UserController';

const app: Express = express();
const { PORT, COOKIE_SECRET } = process.env;

const SQLiteStore = connectSqlite3(session);

app.use(
  session({
    store: new SQLiteStore({ db: 'sessions.sqlite' }),
    secret: COOKIE_SECRET,
    cookie: { maxAge: 8 * 60 * 60 * 1000 }, // 8 hours
    name: 'session',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.static('public', { extensions: ['html'] }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/api/users', registerUser); // Create an account
app.post('/api/login', logIn); // Log in to an account
app.post('/api/users/:userId/email');
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});

const connectedClients: Record<string, CustomWebSocket> = {};

const socketServer = new Server<ClientToServerEvents, ServerToClientEvents, null, null>(server);

socketServer.use((socket, next) => {
  sessionMiddleware(socket.request as Request, {} as Response, next as NextFunction);
});
