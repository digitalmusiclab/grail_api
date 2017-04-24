'use strict';

const restify = require("restify");
const jwt = require("jsonwebtoken");
const config = rootRequire("config");


/////////////////////////////////////////////////
//  Create Authentication Token
/////////////////////////////////////////////////

exports.createToken = (user_id) => {

    const options = { expiresIn: config.auth.expiration }

    return jwt.sign({ user_id }, config.auth.secret, options);
}


/////////////////////////////////////////////////
//  Verify Authentication Token
/////////////////////////////////////////////////

exports.verifyToken = (token) => {
  
    return new Promise( (resolve, reject) => {
        
        jwt.verify(token, config.auth.secret, (err, decoded) => {
            
            if (err) {
                return reject(new restify.InvalidCredentialsError(err.name));
            }

            return resolve(decoded.user_id);
        });
    });
}