import express from 'express';
import { asyncMiddleware } from '../middlewares/global-error-handler.middleware';

const router = express.Router();

/**
 * @swagger
 *  /:
 *    get:
 *      security:
 *        - ApiKeyAuth: []
 *        - bearerAuth: []
 *      tags:
 *        - users
 *      description: gets all users
 *      produces:
 *        - application/json
 *      responses:
 *         200:
 *           description: Success
 */
router.get(
  '/',
  [],
  asyncMiddleware(async (req: express.Request, res: express.Response) => {
    res.send([{ id: 1, name: 'Jack' }]);
  }),
);

export const userRouter = router;
