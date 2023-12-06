import { Router } from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
  getCurrentUserInfo,
} from "../controllers/user.js";
import userUpdateValidate from "../middlewares/userUpdateValidate.js";
import userObjectIdValidate from "../middlewares/userObjectIdValidate.js";
import userAvatarUpdateValidate from "../middlewares/userAvatarUpdateValidate.js";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/me", getCurrentUserInfo);

userRouter.patch("/me", userUpdateValidate, updateUser);

userRouter.get("/:userId", userObjectIdValidate, getUserById);

userRouter.patch("/me/avatar", userAvatarUpdateValidate, updateUserAvatar);

export default userRouter;
