import mongoose from 'mongoose';
import config from 'config';

import {logger} from './logger.js';

export const connect2DB = () => {
    const username = config.get('DB.username');
    const password = config.get('DB.password');
    const cluster = config.get('DB.cluster');
    const clusterId = config.get('DB.clusterId');
    const collection = config.get('DB.collection');

    const connectionString = `mongodb+srv://${username}:${password}@${cluster}.${clusterId}.mongodb.net/${collection}?retryWrites=true&w=majority`;

    mongoose.connection
        .on('connected', () => {
            logger.info('database is connected');
        })
        .once('open', () => {
            logger.info('database is open for data');
            logger.info(`connected to mongo atlas, DB: ${collection}`);
        })
        .on('close', () => {
            logger.warn('database connection closed');
        })
        .on('disconnected', () => {
            logger.warn('database disconnecting');
        })
        .on('disconnected', () => {
            logger.error('database disconnected');
            mongoose.connect(connectionString);
        })
        .on('reconnected', () => {
            logger.info('database reconnected');
        })
        .on('error', (error) => {
            logger.error('database connection error');
            logger.error(error);
            mongoose.disconnect();
        });

    mongoose.connect(connectionString);
};