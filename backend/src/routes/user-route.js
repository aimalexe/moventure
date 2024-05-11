import express from 'express';

import { isAuthenticated, asyncHandler, validateAndSanitize } from '../middlewares/index.js';
import { userController } from '../controllers/index.js';
import { editUser, deleteUser } from '../validators/index.js';

const router = express.Router();
const {
    getMyProfile, getAllUsers, getUserById,
    editUserProfile, deleteUserProfile,
} = userController;

router.get(
    '/me',
    isAuthenticated,
    asyncHandler(getMyProfile),
);

router.get(
    '/',
    [isAuthenticated],
    asyncHandler(getAllUsers),
);

router.get(
    '/:userId',
    [isAuthenticated],
    asyncHandler(getUserById),
);
router.put(
    '/:userId',
    [isAuthenticated, validateAndSanitize(editUser)],
    asyncHandler(editUserProfile),
);

router.delete(
    '/:userId',
    [isAuthenticated, validateAndSanitize(deleteUser)],
    asyncHandler(deleteUserProfile),
);


export default router;
/* // TODO delete this cmnt
Just for debugging error handlers.
router.get('/check-error', asyncHandler(async (req, res) => {

    throw new Error('some message');
})); */
