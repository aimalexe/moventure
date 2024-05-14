import express from 'express';
import config from 'config';

import { setEnvironmentConfig, logger, connect2DB } from './src/configurations/index.js';
import { useMiddlewares } from './src/middlewares/index.js';
import routes from './src/routes/index.js';

const main = () => {
    setEnvironmentConfig(); // Set environment configurations.

    const app = express();
    useMiddlewares(app); // use many built-in middlewares
    routes(app); // Add routes
    connect2DB(); // Connect to the database

    // Start the server for listening on a port and export it for testing purposes.
    const server = app.listen(config.get('PORT'), () => {
        logger.info(`App server is listening on port: ${config.get('PORT')} for ${config.get('APP_ENV')}`);
    });

    return server; // Export the server for testing purposes
};

main();

export default main;