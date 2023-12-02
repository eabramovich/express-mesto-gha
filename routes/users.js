import { Router } from 'express';
import { getUsers, getUserById, createUser, updateUser, updateUserAvatar } from '../controllers/user.js';
import { Joi, celebrate } from 'celebrate';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum.length(24),
  }),
}),getUserById);
userRouter.patch('/me', updateUser);
userRouter.patch('/me/avatar', updateUserAvatar);

export default userRouter;