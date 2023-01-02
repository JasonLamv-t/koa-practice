import Router from 'koa-router';
import { Context } from 'koa';
import { User } from '../../models/users';
import jwt from 'jsonwebtoken';
import statusCode from 'http-status-codes';
import config from '../../config';
import _ from 'lodash';

const router = new Router({
  prefix: '/auth'
});

// Login
router.get('/login', async (ctx: Context) => {
  const { username, password } = ctx.request.body as User;
  try {
    const theUser = await User.findOne({ username, password });

    if (theUser !== null) {
      const payload = _.pick(theUser, [
        'username',
        'phone_number',
        'gender',
        'avatar',
        'status'
      ]);
      const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '30m' });
      ctx.status = statusCode.OK;
      ctx.body = {
        status: statusCode.OK,
        message: 'Login successful',
        data: { token }
      };
    } else {
      ctx.status = statusCode.FORBIDDEN;
      ctx.body = 'Login failed: incorrect username or password.';
    }
  } catch (error) {
    if (config.debug) console.error(error);
    ctx.throw(statusCode.INTERNAL_SERVER_ERROR);
  }
});

// Register
router.post('/register', async (ctx: Context) => {
  const newUser = new User(ctx.request.body);

  const requiedFields = ['Username', 'Password', 'Phone_number'];
  requiedFields.forEach((field) => {
    if (!newUser.get(field.toLowerCase())) {
      ctx.throw(`${field} was required!`, statusCode.BAD_REQUEST);
    }
  });

  const { username } = newUser;
  const theUser = await User.findOne({ username });
  if (theUser !== null) {
    ctx.throw('The username was occupied.', statusCode.BAD_REQUEST);
  }

  try {
    const res = await newUser.save();
    const payload = _.pick(res, [
      'username',
      'phone_number',
      'gender',
      'avatar',
      'status'
    ]);
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '30m' });
    ctx.status = statusCode.CREATED;
    ctx.body = {
      status: statusCode.CREATED,
      message: 'Register successful!',
      data: { token }
    };
  } catch (error) {
    if (config.debug) console.error(error);
    ctx.throw(statusCode.INTERNAL_SERVER_ERROR);
  }
});

export default router;
