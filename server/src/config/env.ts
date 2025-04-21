import dotenv from 'dotenv';
import path from 'path';

if (!process.env.IS_DOCKER) {
    dotenv.config({
        path: path.resolve(__dirname, `../../.env.${process.env.NODE_ENV || 'development'}`),
    });
}