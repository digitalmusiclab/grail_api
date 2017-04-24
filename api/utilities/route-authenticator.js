'use strict';

const restify = require("restify");
const TokenHelper = rootRequire("utilities/token-helper");


/////////////////////////////////////////////////
//  Restify Route Authenticator
/////////////////////////////////////////////////

exports.authenticate = (req, res, next) => {

    if (!req.route.authentication) {
        return next()
    }

    const auth_token = req.authorization.credentials;

    // Validate user authentication token
    TokenHelper.verifyToken(auth_token)
    .then( (user_id) => {

        req.username = user_id.toString();
        
        req.user_id = user_id;

        return next();
    })
    .catch( (error) => {

        // TODO: Server error handler, catch next(errror)
        res.send(error);

        return next(error);
    });
}