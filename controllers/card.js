import Card from "../modules/Card.js";
import { NotFoundError } from "../errors/not-found-err.js";
import { ForbiddenError } from "../errors/forbidden-err.js";

export const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({}).populate(["owner", "likes"]);
    res.send(cards);
  } catch (error) {
    next(error);
  }
};

export const createCard = async (req, res, next) => {
  try {
    req.body.owner = req.user;
    const newCard = new Card(req.body);
    return res.status(201).send(await newCard.save());
  } catch (error) {
    next(error);
  }
};

export const deleteCardById = async (req, res, next) => {
  try {
    const { idCard } = req.params;
    const card = await Card.findById(idCard).populate("owner");
    if (!card) {
      throw new NotFoundError("Карточка с данным id не найдена");
    }
    if (String(card.owner._id) != req.user._id) {
      throw new ForbiddenError("Можно удалять только собственные карточки");
    }

    const deletedCard = await card.deleteOne();
    return res.status(200).send({ message: "Карточка удалена" });
  } catch (error) {
    next(error);
  }
};

export const likeCardById = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      cardId,
      {
        $addToSet: { likes: req.user._id },
      },
      { new: true, runValidators: true }
    ).populate("likes");
    if (!card) {
      throw new NotFoundError("Карточка с данным id не найдена");
    }
    return res.status(200).send(card);
  } catch (error) {
    next(error);
  }
};

export const deleteLikeCardById = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      cardId,
      {
        $pull: { likes: req.user._id },
      },
      { new: true, runValidators: true }
    ).populate("likes");
    if (!card) {
      throw new NotFoundError("Карточка с данным id не найдена");
    }
    return res.status(200).send(card);
  } catch (error) {
    next(error);
  }
};
