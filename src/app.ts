import Koa, { Context, DefaultContext, DefaultState } from 'Koa';
import bodyParser from 'koa-bodyparser';
import pino from 'koa-pino-logger';
import mongoose from 'mongoose';
import config from './config';
import koajwt from 'koa-jwt';
import router from './routes';

const app: Koa<DefaultState, DefaultContext> = new Koa();
const pinoInstance = pino();
const { logger } = pinoInstance;

// Init MongoDB
const { url: mongoURL, options: mongoOptions } = config.db.mongo;
mongoose.connect(mongoURL, mongoOptions);

const db = mongoose.connection;
db.on('error', (err) => {
  logger.error(err);
});
db.once('connected', () => {
  logger.info('Mongo connected');
  app.emit('ready');
});
db.on('reconnected', () => {
  logger.info('Mongo re-connected');
});
db.on('disconnected', () => {
  logger.info('Mongo disconnected');
});

// Middlewares
app.use(pinoInstance);
app.use(bodyParser());
app.use(
  koajwt({ secret: config.jwtSecret, debug: config.debug }).unless({
    path: [/^\/public/, /^\/auth/]
  })
);

// Routers
app.use(router());

app.use(async (ctx: Context) => {
  ctx.body = 'hello koa';
  console.log(ctx.state);
});

export default app;
