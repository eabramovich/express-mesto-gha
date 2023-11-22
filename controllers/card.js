import Card from "../modules/Card.js";

export const getCards = async (req, res) => {
  try {
    const cards = await Card.find({}).populate(["owner", "likes"]);
    res.send(cards);
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Ошибка на стороне сервера", error: error.message });
  }
};

export const createCard = async (req, res) => {
  try {
    req.body.owner = req.user;
    const newCard = new Card(req.body);
    return res.status(201).send(await newCard.save());
  } catch (error) {
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .send({ message: "Ошибка валидации полей", error: error.message });
    }

    return res
      .status(500)
      .send({ message: "Ошибка на стороне сервера", error: error.message });
  }
};

export const deleteCardById = async (req, res) => {
  try {
    const { idCard } = req.params;
    const card = await Card.findByIdAndDelete(idCard);
    if (!card) {
      throw new Error("NotFound");
    }
    return res.status(200).send(card);
  } catch (error) {
    if (error.message === "NotFound") {
      return res
        .status(404)
        .send({ message: "Карточка с данным id не найдена" });
    }

    if (error.name === "CastError") {
      return res.status(400).send({ message: "Передан невалидный id" });
    }

    return res
      .status(500)
      .send({ message: "Ошибка на стороне сервера", error: error.message });
  }
};

export const likeCardById = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      cardId,
      {
        $addToSet: { likes: req.user._id },
      },
      { new: true }
    ).populate("likes");
    if (!card) {
      throw new Error("NotFound");
    }
    return res.status(200).send(card);
  } catch (error) {
    if (error.message === "NotFound") {
      return res
        .status(404)
        .send({ message: "Карточка с данным id не найдена" });
    }

    if (error.name === "CastError") {
      return res.status(400).send({ message: "Передан невалидный id" });
    }

    return res
      .status(500)
      .send({ message: "Ошибка на стороне сервера", error: error.message });
  }
};

export const deleteLikeCardById = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      cardId,
      {
        $pull: { likes: req.user._id },
      },
      { new: true }
    ).populate("likes");
    if (!card) {
      throw new Error("NotFound");
    }
    return res.status(200).send(card);
  } catch (error) {
    if (error.message === "NotFound") {
      return res
        .status(404)
        .send({ message: "Карточка с данным id не найдена" });
    }

    if (error.name === "CastError") {
      return res.status(400).send({ message: "Передан невалидный id" });
    }

    return res
      .status(500)
      .send({ message: "Ошибка на стороне сервера", error: error.message });
  }
};
