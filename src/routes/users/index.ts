import Router from 'koa-router';
import { Context } from 'koa';

const router = new Router({
  prefix: '/users'
});

router.get('/', async (ctx: Context) => {
  ctx.body = 'hello users';
});

export default router;
