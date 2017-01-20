'use strict';

const db = rootRequire("models");
const routes = [];


/////////////////////////////////////////////////
//  User Registration
/////////////////////////////////////////////////

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
                password: { isRequired: true, isAlphanumeric: true, isLength: 6 }
            }
        }
        // TODO: Set CORS allow-origin
    },
    handler: function register (req, res, next) {

        db.User.create(req.body)
            .then(res.json.bind(res))
            .catch(next)
            .finally(next);
    }
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
    handler: function token (req, res, next) {

        const { email, password } = req.body;
        
        db.User.findByEmail(email)
            .then( (user) => {
                
                if (!user) {
                    return Promise.reject(new Error("No User Found"));
                }

                return Promise.all([ user, user.comparePassword(password) ]);
            })
            .then( ([ user, passwordMatch ]) => {
                
                if (!passwordMatch) {
                    return Promise.reject(new Error("Incorrect Password"));
                }

                if (!user.access_token) {
                    return user.generateAccessToken().save();
                }

                return user;
            })
            .then( (user) => {

                res.json(user);

                return next();
            })
            .catch(next);
    }
});


/////////////////////////////////////////////////
//  Module Exports
/////////////////////////////////////////////////

module.exports = routes;
