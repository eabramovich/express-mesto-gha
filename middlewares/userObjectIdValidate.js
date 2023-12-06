import { Joi, celebrate } from "celebrate";

export default celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
});
