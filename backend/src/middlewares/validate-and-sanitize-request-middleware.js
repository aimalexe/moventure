import { sendResponse } from '../utilities/index.js';

// A middleware function to validate and sanitize user inputs
export const validateAndSanitize = (validationFunction) =>
    (request, response, next) => {
        const { error, value } = validationFunction(request.body);
        if (error) return sendResponse(response, 400, error.details[0].message, error);

        // assign the validated and sanitizes value in a key to req for making it scope outside.
        request.validatedData = value;

        next();
    };
