import { Router } from 'express';
import userRouter from './users.js';
import cardRouter from './cards.js';
import auth from '../middlewares/auth.js';

const router = Router();

router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);
router.use('*', auth, (req, res) => {
  return res.status(404).send({ message: 'Ресурс не найден. Проверьте URL и метод запроса'});
});
export default router;