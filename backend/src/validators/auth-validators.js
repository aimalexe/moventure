import Joi from 'joi';
import { email, password, name } from './reuseable-validators.js';


export function validateLogin(data) {
    const validLogin = Joi.object({
        email,
        password,
    });
    return validLogin.validate(data);
};

export function validateSignup(data) {
    const validSignup = Joi.object({
        name,
        email,
        password,
    });
    return validSignup.validate(data);
}