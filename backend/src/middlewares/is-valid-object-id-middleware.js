import mongoose from 'mongoose';
import { sendResponse, AppError } from '../utilities/index.js';

export const isValidId = (request, response, next) => {
    if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
        const error = new AppError(`the id:${request.params.id} is incorrect.`, 400, false);
        return sendResponse(response, 400, error.message, error);
    }
    next();
};

