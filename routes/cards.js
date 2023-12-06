import { Router } from "express";
import {
  getCards,
  createCard,
  deleteCardById,
  likeCardById,
  deleteLikeCardById,
} from "../controllers/card.js";
import cardCreateValidate from "../middlewares/cardCreateValidate.js";
import cardObjectIdValidate from "../middlewares/cardObjectIdValidate.js";

const cardRouter = Router();

cardRouter.get("/", getCards);
cardRouter.post("/", cardCreateValidate, createCard);

cardRouter.delete("/:cardId", cardObjectIdValidate, deleteCardById);

cardRouter.put("/:cardId/likes", cardObjectIdValidate, likeCardById);

cardRouter.delete("/:cardId/likes", cardObjectIdValidate, deleteLikeCardById);

export default cardRouter;
