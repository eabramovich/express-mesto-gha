import User from "../modules/User.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Ошибка на стороне сервера", error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("NotFound");
    }
    res.status(200).send(user);
  } catch (error) {
    if (error.message === "NotFound") {
      return res.status(404).send({ message: "Пользователь по id не найден" });
    }

    if (error.name === "CastError") {
      return res.status(400).send({ message: "Передан невалидный id" });
    }

    return res.status(500).send({ message: "Ошибка на стороне сервера" });
  }
};

export const createUser = async (req, res) => {
  try {
    console.log(req.body);
    const newUser = new User(req.body);
    return res.status(201).send(await newUser.save());
  } catch (error) {
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .send({ message: "Ошибка валидации полей", ...error });
    }

    return res.status(500).send({ message: "Ошибка на стороне сервера" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    });
    return res.status(200).send(user);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .send({ message: "Ошибка валидации полей", ...error });
    }

    return res.status(500).send({ message: "Ошибка на стороне сервера" });
  }
};

export const updateUserAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true }
    );
    return res.status(200).send(user);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .send({ message: "Ошибка валидации полей", ...error });
    }

    return res.status(500).send({ message: "Ошибка на стороне сервера" });
  }
};
