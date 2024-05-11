import Joi from 'joi';

// name of a user.
export const name = Joi
    .string()
    .min(3)
    .max(50)
    .trim()
    .required();

export const email = Joi
    .string()
    .email()
    .min(5)
    .max(255)
    .trim()
    .required();

export const password = Joi
    .string()
    .min(8)
    .max(255)
    .trim()
    .required();