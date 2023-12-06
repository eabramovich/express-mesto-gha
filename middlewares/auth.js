import jwt from "jsonwebtoken";
import { NotAuthenticateError } from "../errors/not-authenticate-err.js";
const { JWT_SECRET, NODE_ENV } = process.env;

export default function (req, res, next) {
  let payload;
  try {
    const { authorization } = req.headers;
    //const token = req.cookies.mestoToken;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      throw new NotAuthenticateError("Необходима авторизация");
    }
    const token = authorization.replace("Bearer ", "");
    payload = jwt.verify(token, NODE_ENV ? JWT_SECRET : "some-secret-key");
  } catch (error) {
    next(error);
  }

  req.user = payload;
  next();
}
