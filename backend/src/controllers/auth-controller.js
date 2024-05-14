import bcrypt from 'bcrypt';
import _ from 'lodash';

import { User } from '../models/index.js';
import { sendResponse } from '../utilities/index.js';

export const signup = async (request, response) => {
    let user = await User.findOne({ email: request.body.email }); //check if user is present
    if (user) return sendResponse(response, 400, 'user already registered!');

    user = new User(_.pick(request.validatedData, ['name', 'email', 'password']));

    await user.save();
    const token = user.generateAuthToken();

    // in headers set the token
    response.header('x-auth-token', token);

    sendResponse(response, 201, user.toJSON());

};

export const login = async (request, response) => {
    const { email, password } = request.validatedData;

    const user = await User.findOne({ email }); //check if user is present
    if (!user) return sendResponse(response, 400, 'invalid email or password');

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return sendResponse(response, 400, 'invalid email or password');

    const token = user.generateAuthToken();

    // in headers set the token
    response.header('x-auth-token', token);

    sendResponse(response, 200, user.toJSON());
};

export const logout = async (request, response) => {
    // in headers set the token empty
    response.header('x-auth-token', '');

    sendResponse(response, 200, 'logout successfully');
};