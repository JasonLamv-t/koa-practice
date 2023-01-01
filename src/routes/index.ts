import combineRouters from 'koa-combine-routers';
import authRouter from './auth';
import userRouter from './users';

const router = combineRouters(authRouter, userRouter);

export default router;
