import jwt from 'jsonwebtoken';
const { JWT_SECRET, NODE_ENV } = process.env;

export default function (req, res, next) {
  let payload;
  try {
    //const { authorization } = req.headers;
    const token = req.cookies.mestoToken;
    // if (!authorization || !authorization.startsWith('Bearer ')) {
    //   throw new Error('NotAuthenticate');
    // }
    //const token = authorization.replace('Bearer ', '');
    payload = jwt.verify(token, NODE_ENV ? JWT_SECRET : 'some-secret-key');
  } catch (error) {
    if (error.message === 'NotAuthenticate') {
      return res.status(401).send({ message: 'Необходима авторизация' });
    }

    if(error.name = 'JsonWebTokenError') {
      return res.status(401).send({ message: 'Необходима авторизация' });
    }

    return res.status(500).send({ message: "Ошибка на стороне сервера" });
  }

  req.user = payload;
  next();
}
