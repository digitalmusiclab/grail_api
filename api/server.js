'use strict';

/* Load Environment Variables */
require("dotenv-safe").config({
    path: `./api/config/.env.${process.env.NODE_ENV}`,
    sample: "./api/config/.env.requirements",
    silent: true
});

require("./utilities/root-require.js")();
const restify = require("restify");
const config = rootRequire("config");
const Database = rootRequire("models");
const ServerError = rootRequire("middleware/server-error");
const ServerRouter = rootRequire("middleware/server-router");
const ServerMiddleware = rootRequire("middleware/server-middleware");
const server = restify.createServer(config.server.restify);


/////////////////////////////////////////////////
//  Server Configuration
/////////////////////////////////////////////////

/* Configure Middleware */
ServerMiddleware.configure(server);

/* Configure Error Handling */
ServerError.configure(server);

/* Configure API Routing */
ServerRouter.configure(server);


/////////////////////////////////////////////////
//  Server Initialization
/////////////////////////////////////////////////

/* Connect & Sync Database */
Database.synchronize().then( (db) => {
    
    /* Start Server */
    server.listen(config.server.port, () => {
        console.log(`${server.name} listening at ${server.url}`);
    });
})
.catch(console.error);