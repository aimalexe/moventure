import Joi from 'joi';

import { name, email, password } from './reuseable-validators.js';

export function editUser(data) {
    const validDetails = Joi.object({
        name,
        email: Joi
            .string()
            .email()
            .min(5)
            .max(255)
            .trim()
            .optional(),
    });

    return validDetails.validate(data);
}

export function deleteUser(data) {
    const validDetails = Joi.object({
        email,
        password,
    });

    return validDetails.validate(data);
}