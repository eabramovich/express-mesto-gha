import { Router } from 'express';
import { getUsers, getUserById, createUser, updateUser, updateUserAvatar } from '../controllers/user.js';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/:userId', getUserById);
userRouter.patch('/me', updateUser);
userRouter.patch('/me/avatar', updateUserAvatar);

export default userRouter;