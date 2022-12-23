import Koa, { DefaultContext, DefaultState, Context } from 'Koa';
import pino from 'koa-pino-logger';
import router from './routes';

const app: Koa<DefaultState, DefaultContext> = new Koa();

// Middlewares
app.use(pino());

// Routers
app.use(router());

app.use(async (ctx: Context) => {
  ctx.body = 'hello koa';
});

export default app;
