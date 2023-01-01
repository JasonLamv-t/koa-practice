import Router from 'koa-router';
import { Context } from 'koa';
import { User } from '../../models/users';
import statusCode from 'http-status-codes';

const router = new Router({
  prefix: '/users'
});

// Create user
router.post('/', async (ctx: Context) => {
  const newUser = new User(ctx.request.body);
  try {
    const res = await newUser.save();
    ctx.status = statusCode.CREATED;
    ctx.body = res;
  } catch (error) {
    ctx.throw(statusCode.INTERNAL_SERVER_ERROR);
  }
});

router.get('/', async (ctx: Context) => {
  const { username, password } = ctx.request.body as User;
  console.log(username, password);
});

export default router;
