import { Router } from 'express';

import { notFound, serverError } from '../controllers/error-controller';

const rootRouter = Router();

rootRouter.use(notFound);
rootRouter.use(serverError);

export default rootRouter;
