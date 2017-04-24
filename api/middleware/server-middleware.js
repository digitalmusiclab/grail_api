'use strict';

const restify = require("restify");
const config = rootRequire("config");
const routeAuthenticator = rootRequire("utilities/route-authenticator");
const restifyValidation = require("node-restify-validation");


/////////////////////////////////////////////////
//  Configure Server Middleware
/////////////////////////////////////////////////

exports.configure = (server) => {

    /* Pre Handler Hook */
    server.pre(function(req, res, next) {
        return next();
    });

    /* Parse Dates */
    server.use(restify.dateParser());
    
    /* Parse Request Accept Headers */
    server.use(restify.acceptParser(server.acceptable));
    
    /* Parse Request Authorization Headers */
    server.use(restify.authorizationParser());

    /* Validate Request Authentication */
    server.use(routeAuthenticator.authenticate);
    
    /* Parse Request Query Parameters */
    server.use(restify.queryParser({ mapParams: false }));
    
    /* Parse Request Body */
    server.use(restify.bodyParser({ mapParams: false }));
    
    /* Build Response From Headers */
    server.use(restify.fullResponse());
    
    /* GZip Response */
    server.use(restify.gzipResponse());

    /* Validate Route Parameters */
    server.use(restifyValidation.validationPlugin(config.server.validation_options));
}