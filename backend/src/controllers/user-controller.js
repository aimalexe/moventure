import bcrypt from 'bcrypt';
import { User } from '../models/index.js';
import { sendResponse } from '../utilities/index.js';


export const getMyProfile = async (request, response) => { //Route to see his profile
    const myId = request.user._id;

    const me = await User.findById(myId).select('-password');
    if (!me) return response.status(404).send('User is not registered');

    sendResponse(response, 200, me);
};

export const getAllUsers = async (request, response) => {
    const user = await User.find().select('-password');
    if (!user) return sendResponse(response, 404, 'We have not any registered users yet');

    sendResponse(response, 200, user);
};

export const getUserById = async (request, response) => {
    const user = await User.findById(request.params.userId);
    if (!user) return sendResponse(response, 404, `User with id: ${request.params.userId} isn't found.`);

    sendResponse(response, 200, user);
};

export const editUserProfile = async (request, response) => {
    const user = await User.findById(request.params.userId).select('-password');
    if (!user) return sendResponse(response, 404, `User with id: ${request.params.userId} isn't found.`);

    if (request.validatedData?.email && request.validatedData?.email !== user.email) {
        const isExistingUserEmail = await User.findOne({ email: request.validatedData?.email });
        if (isExistingUserEmail) return sendResponse(response, 409, 'The updated email is already registered with another user.');

        user.set({ email: request.validatedData.email });
    }

    user.set({ name: request.validatedData.name });
    await user.save();

    sendResponse(response, 200, user.toJSON());
};

export const deleteUserProfile = async (request, response) => {
    const user = await User.findById(request.params.userId);
    if (!user) return sendResponse(response, 404, `User with id: ${request.params.userId} isn't found.`);

    if (request.validatedData.email !== user.email)
        return sendResponse(response, 400, 'Invalid Password or Email.');

    const isValidPassword = await bcrypt.compare(request.validatedData.password, user.password);
    if (!isValidPassword) return sendResponse(response, 400, 'Invalid Password or Email.');

    await user.deleteOne();

    sendResponse(response, 200, 'user deleted successfully.');
};