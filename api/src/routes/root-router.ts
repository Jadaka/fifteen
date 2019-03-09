import { Router } from 'express';

import { Endpoints } from '../contracts';
import { notFound, serverError } from '../controllers/error-controller';
import { checkToken } from '../middleware/auth-middleware';

const rootRouter = Router();

rootRouter.get(`/api/${Endpoints.LEADERBOARD}`, checkToken, (req, res) => {
  console.log('success');
  res.json({ message: 'hello' });
});

rootRouter.use(notFound);
rootRouter.use(serverError);

export default rootRouter;
