'use strict';

// TODO: Find a better way than adding dependency
const restify = require("restify");


/////////////////////////////////////////////////
//  Development Configuration
/////////////////////////////////////////////////

module.exports = {
    auth: {
        secret: process.env.AUTH_SECRET,
        expiration: "180d"
    },
    server: {
        restify: {
            name: process.env.SERVER_NAME,
            version: "1.0.0",
            acceptable: [ "application/json" ]
        },
        port: process.env.SERVER_PORT,
        url: process.env.SERVER_URL,
        throttle_options: {
            rate: 2,
            burst: 1,
            ip: false,
            username: true
        },
        validation_options: {
            errorsAsArray: true,
            forbidUndefinedVariables: true,
            errorHandler: restify.errors.InvalidArgumentError
        }
    },
    database: {
        database: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        forceSync: process.env.DB_SYNC,
        options: {
            logging: false,
            language: "en",
            dialect: "mysql",
            host: process.env.DB_HOST
        }
    }
}