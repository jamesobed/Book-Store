import Joi from "joi";
import jwt from "jsonwebtoken";
export const createBookSchema = Joi.object().keys({
  name: Joi.string().lowercase().required(),
  isPublished: Joi.boolean().required(),
  serialNumber: Joi.number().required(),
});

export const updateBookSchema = Joi.object().keys({
  name: Joi.string().lowercase(),
  isPublished: Joi.boolean(),
  serialNumber: Joi.number(),
});

export const registerSchema = Joi.object().keys({
  author: Joi.string().required(),
  age: Joi.number().required(),
  email: Joi.string().trim().lowercase().required(),
  address: Joi.string().required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  confirm_password: Joi.ref("password")
});

export const loginSchema = Joi.object().keys({
  email: Joi.string().trim().lowercase().required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
});

//Generate Token
export const generateToken = (user: { [key: string]: unknown }): unknown => {
  const pass = process.env.JWT_SECRET as string;
  return jwt.sign(user, pass, { expiresIn: "7d" });
};

export const options = {
  abortEarly: false,
  errors: {
    wrap: {
      label: "",
    },
  },
};
