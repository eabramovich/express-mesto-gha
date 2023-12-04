import { Router } from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
  getCurrentUserInfo,
} from "../controllers/user.js";
import { Joi, celebrate } from "celebrate";
import { urlPattern } from "../utils/constants.js";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/me", getCurrentUserInfo);

userRouter.patch(
  "/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateUser
);

userRouter.get(
  "/:userId",
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().alphanum().length(24),
    }),
  }),
  getUserById
);

userRouter.patch("/me/avatar", celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(new RegExp(urlPattern)),
  }),
}), updateUserAvatar);

export default userRouter;
