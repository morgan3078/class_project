/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-unresolved
import BrowserSync from 'browser-sync';
import dotenv from 'dotenv';
import chalk from 'chalk';

dotenv.config();
const { PORT } = process.env;

const bs = BrowserSync.create();

bs.init({
  proxy: `localhost:${PORT}`,
  files: ['dist/**/*', 'public/**/*', '.env'],
  injectChanges: false,
  ignore: ['node_modules'],
  reloadOnRestart: true,
  ui: false,
  logLevel: 'silent',
});

const uiPort = bs.getOption('port');
const uiHost = `http://localhost:${uiPort}`;
console.log(`Synced frontend available on ${chalk.underline.greenBright(uiHost)}`);
