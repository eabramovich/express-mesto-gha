import express, { json } from "express";
import mongoose from "mongoose";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import { createUser, login } from "./controllers/user.js";
import { celebrate, Joi, errors } from "celebrate";
import { urlPattern } from "./utils/constants.js";

const MONGO_DUPLICATE_ERROR_CODE = 11000;

const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

app.use(json());
app.use(cookieParser());
app.post("/signin", celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.post("/signup", celebrate({
  body:Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string.pattern(new RegExp(urlPattern)),
  }),
}),createUser);
app.use(router);

app.use(errors());
app.use((err, req, res, next) => {
  let { statusCode = 500, message } = err;

  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Передан невалидный id';
  }

  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Ошибка валидации полей ' + err;
  }

  if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
    statusCode = 409;
    message = 'Пользователь с таким email уже зарегистрирован в системе';
  }

  res
    .status(statusCode)
    .send({
      message: statusCode === 500 ? "На сервере произошла ошибка" : message,
    });
});

app.listen(3000, () => {
  console.log("Server listen port $(3000)");
});
