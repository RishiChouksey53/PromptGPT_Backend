import Joi from "joi";

export const registerValidation = Joi.object({
  name: Joi.string().trim().min(3).max(30).required(),
  username: Joi.string().trim().alphanum().min(3).max(30).required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().min(6).required(),
});

export const loginValidation = Joi.object({
  username: Joi.string().trim().alphanum().min(3).max(30).required(),
  password: Joi.string().trim().min(6).required(),
})