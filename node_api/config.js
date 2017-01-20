'use strict';

// TODO: Find a better way than adding dependency
const restify = require("restify");


/////////////////////////////////////////////////
//  Development Configuration
/////////////////////////////////////////////////

module.exports = {
    auth: {
        secret: "a9eec0e0-23b7-4788-9a92-318347b9a39f",
        expiration: "180d"
    },
    server: {
        restify: {
            name: "grail-api",
            version: "1.0.0",
            acceptable: [ "application/json" ]
        },
        port: 3000,
        url: "http://localhost:3000",
        throttle_options: {
            rate: 50,
            burst: 10,
            ip: false,
            username: true
        },
        validation_options: {
            errorsAsArray: true,
            forbidUndefinedVariables: true,
            errorHandler: restify.errors.InvalidArgumentError
        }
    },
    solr: {
        client: {
            port: 8983,
            host: "localhost",
            core: "grail_search"
        },
        query_options: {
            offset: 0,
            limit: 10
        }
    },
    database: {
        name: "grail-api-dev-db",
        user: "grail-api",
        password: "",
        options: {
            logging: false,
            language: "en",
            dialect: "sqlite",
            host: "localhost",
            storage: "grail-api-dev-db.sqlite"
        },
        forceSync: false,
        uri: "sqlite:///grail-api-dev-db.sqlite"
    }
}