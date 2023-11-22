import { Router } from 'express'
import { getCards, createCard, deleteCardById, likeCardById, deleteLikeCardById} from '../controllers/card.js';

const cardRouter = Router();

cardRouter.get('/', getCards);
cardRouter.post('/', createCard);
cardRouter.delete('/:idCard', deleteCardById);
cardRouter.put('/:cardId/likes', likeCardById);
cardRouter.delete('/:cardId/likes', deleteLikeCardById);
export default cardRouter;