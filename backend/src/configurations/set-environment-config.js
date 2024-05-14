import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import config from 'config';

import { AppError } from '../utilities/index.js';

// Export a function that performs configuration validation
export const setEnvironmentConfig = () => {
    // Get the directory name
    const __dirname = dirname(fileURLToPath(import.meta.url));

    const environmentDirectory = join(__dirname, '../../env');
    const environmentFilesToCheck = ['production.json', 'development.json', 'test.json'];


    if (existsSync(environmentDirectory)) { // Check if the env directory exists and hve the required config files.

        // Check if the config files are present within the directory.
        const filesPresent = environmentFilesToCheck.every(fileName => {
            const filePath = join(environmentDirectory, fileName);
            return existsSync(filePath);
        });

        if (filesPresent) // env config files are not present in the specified directory
        {
            // if files are present checking their most relevant contents. Check for essential configurations
            if (!config.has('PORT'))
                throw new AppError('CONFIG_ERROR: \'PORT\' is not defined.', '7002', false);

            if (!config.has('APP_ENV'))
                throw new AppError('CONFIG_ERROR: \'APP_ENV\' is not defined.', '7002', false);

            if (!config.has('BASE_URL'))
                throw new AppError('CONFIG_ERROR: \'BASE_URL\' is not defined.', '7002', false);

            if (!config.has('JWT_PRIVATE_KEY'))
                throw new AppError('CONFIG_ERROR: \'JWT_PRIVATE_KEY\' is not defined.', '7002', false);

            // Check for DB configuration
            if (config.has('DB'))
            {
                if (!config.has('DB.username'))
                    throw new AppError('CONFIG_ERROR: \'DB.username\' is not defined.', '7002', false);

                if (!config.has('DB.password'))
                    throw new AppError('CONFIG_ERROR: \'DB.password\' is not defined.', '7002', false);

                if (!config.has('DB.cluster'))
                    throw new AppError('CONFIG_ERROR: \'DB.cluster\' is not defined.', '7002', false);

                if (!config.has('DB.clusterId'))
                    throw new AppError('CONFIG_ERROR: \'DB.clusterId\' is not defined.', '7002', false);

                if (!config.has('DB.collection'))
                    throw new AppError('CONFIG_ERROR: \'DB.collection\' is not defined.', '7002', false);
            }
            else {throw new AppError('CONFIG_ERROR: \'DB\' is not defined.', '7002', false);}

            // Check for MAILER configuration
            if (config.has('MAILER'))
            {
                if (!config.has('MAILER.email'))
                    throw new AppError('CONFIG_ERROR: \'MAILER.email\' is not defined.', '7002', false);

                if (!config.has('MAILER.password'))
                    throw new AppError('CONFIG_ERROR: \'MAILER.password\' is not defined.', '7002', false);
            }
            else {throw new AppError('CONFIG_ERROR: \'MAILER\' is not defined.', '7002', false);}
        }
        else {throw new AppError(`some or all of the specified files (${environmentFilesToCheck}) are missing in the env directory.`, '7005', false);}

    }
    else
        throw new AppError('config directory does not exist in app\'s root. please create one.', '7004', false);
};