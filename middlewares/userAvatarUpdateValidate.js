import { Joi, celebrate } from "celebrate";
import { urlPattern } from "../utils/constants";

export default celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(new RegExp(urlPattern)),
  }),
});
