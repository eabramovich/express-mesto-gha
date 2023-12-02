import User from "../modules/User.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";
import { NotFoundError } from "../errors/not-found-err.js";
import { NotAuthenticateError } from "../errors/not-authenticate-err.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError("Пользователь по id не найден");
    }
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const SOLT_ROUNDS = 10;
    const hash = await bcrypt.hash(req.body.password, SOLT_ROUNDS);
    req.body.password = hash;
    const newUser = await new User(req.body).save();
    return res
      .status(201)
      .send({
        name: newUser.name,
        about: newUser.about,
        avatar: newUser.avatar,
        email: newUser.email,
        _id: newUser._id,
      });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    });
    return res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

export const updateUserAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true }
    );
    return res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email })
      .select("+password")
      .orFail(
        (err) => new NotAuthenticateError("Неправильный email или password")
      );

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      throw new NotAuthenticateError("Неправильный email или password");
    }

    const token = generateToken({ _id: user._id, email: user.email });
    // res.cookie("mestoToken", token, {
    //   httpOnly: true,
    //   sameSite: true,
    //   maxAge: 60000,
    // });

    res.send({ token: token });
    //res.send({ email: user.email });
  } catch (error) {
    next(error);
  }
};
