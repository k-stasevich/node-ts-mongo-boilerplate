import express from 'express';
import { query } from 'express-validator';
import { asyncMiddleware } from '../middlewares/global-error-handler.middleware';
import { badRequestMiddleware } from '../middlewares/bad-request.middleware';

const router = express.Router();

/**
 * Get users
 * @route GET /users
 * @group users
 * @param {string} search.query
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
interface IGetUsersRequest extends express.Request {
  query: {
    search?: string;
  };
}
router.get(
  '/',
  [
    query('search')
      .optional()
      .isString(),
    badRequestMiddleware,
  ],
  asyncMiddleware(async (req: IGetUsersRequest, res: express.Response) => {
    const { search } = req.query;
    let users = [
      //
      { id: 1, name: 'Jack' },
      { id: 2, name: 'Robert' },
      { id: 3, name: 'Mike' },
    ];

    if (search) {
      users = users.filter(u => u.name.toLowerCase().includes(search));
    }

    res.send(users);
  }),
);

export const userRouter = router;
