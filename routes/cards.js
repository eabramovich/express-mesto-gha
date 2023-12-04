import { Router } from "express";
import {
  getCards,
  createCard,
  deleteCardById,
  likeCardById,
  deleteLikeCardById,
} from "../controllers/card.js";
import { celebrate, Joi } from "celebrate";
import { urlPattern } from "../utils/constants.js";

const cardRouter = Router();

cardRouter.get("/", getCards);
cardRouter.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().pattern(new RegExp(urlPattern)),
    }),
  }),
  createCard
);

cardRouter.delete(
  "/:idCard",
  celebrate({
    params: Joi.object().keys({
      idCard: Joi.string().alphanum().length(24),
    }),
  }),
  deleteCardById
);

cardRouter.put(
  "/:cardId/likes",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24),
    }),
  }),
  likeCardById
);

cardRouter.delete(
  "/:cardId/likes",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24),
    }),
  }),
  deleteLikeCardById
);

export default cardRouter;
