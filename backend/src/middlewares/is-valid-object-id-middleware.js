import mongoose from 'mongoose';
import { sendResponse, AppError } from '../utilities/index.js';

export const isValidId = (request, response, next) => {
    const { userId, destinationId, id } = request.params;
    const idToValidate = userId || destinationId || id;

    if (!mongoose.Types.ObjectId.isValid(idToValidate)) {
        const error = new AppError(`The ID: ${idToValidate} is incorrect.`, 400, false);
        return sendResponse(response, 400, error.message, error);
    }
    next();
};

