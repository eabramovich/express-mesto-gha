import jwt from 'jsonwebtoken';
const { JWT_SECRET, NODE_ENV } = process

export const generateToken = (payload) => {
  return jwt.sign(payload, NODE_ENV ? JWT_SECRET : 'some-secret-key', { expiresIn: '7d'});
}
