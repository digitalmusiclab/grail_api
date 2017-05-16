'use strict';

const db = rootRequire("models");
const SessionController = rootRequire("controllers/Session.controller.js");
const routes = [];


/////////////////////////////////////////////////
//  User Registration
/////////////////////////////////////////////////

// TODO: Set CORS allow-origin
routes.push({
    meta: {
        name: 'session:register',
        method: 'POST',
        paths: [ '/session/register' ],
        version: '1.0.0',
        authenticated: false,
        validation: {
            content: {
                email: { isRequired: true, isEmail: true },
                password: { isRequired: true, isAlphanumeric: true, isLength: 6 },
                tos_agree: { isRequired: true, isBoolean: true },
                description: { isRequired: true }
            }
        }
    },
    handler: SessionController.register
});


/////////////////////////////////////////////////
//  User Token
/////////////////////////////////////////////////

routes.push({
    meta: {
        name: 'session:token',
        method: 'POST',
        paths: [ '/session/token' ],
        version: '1.0.0',
        authenticated: false,
        validation: {
            content: {
                email: { isRequired: true, isEmail: true },
                password: { isRequired: true, isAlphanumeric: true, isLength: 6 }
            }
        }
    },
    handler: SessionController.getToken
});


/////////////////////////////////////////////////
//  Module Exports
/////////////////////////////////////////////////

module.exports = routes;
