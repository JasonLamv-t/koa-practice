import combineRouters from 'koa-combine-routers';
import userRouter from './users';

const router = combineRouters(userRouter);

export default router;
