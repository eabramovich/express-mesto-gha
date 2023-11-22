import { Router } from 'express';
import userRouter from './users.js';
import cardRouter from './cards.js';

const router = Router();

router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('*', (req, res) => {
  return res.status(404).send({ message: 'Ресурс не найден. Проверьте URL и метод запроса'});
});
export default router;