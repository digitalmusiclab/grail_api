'use strict';

const db = rootRequire("models");


/////////////////////////////////////////////////
//  User Registration
/////////////////////////////////////////////////

exports.register = (req, res, next) => {
    
    db.User.create(req.body)
        .then(res.json.bind(res))
        .catch(next)
        .finally(next);
}


/////////////////////////////////////////////////
//  Get User Token
/////////////////////////////////////////////////

exports.getToken = (req, res, next) => {

    const { email, password } = req.body;
    
    db.User.findByEmail(email)
        .then( (user) => {
            
            if (!user) {
                // TODO: Use Restify HTTP Errors
                return Promise.reject(new Error("No User Found"));
            }

            return Promise.all([ user, user.comparePassword(password) ]);
        })
        .then( ([ user, passwordMatch ]) => {
            
            if (!passwordMatch) {
                // TODO: Use Restify HTTP Errors
                return Promise.reject(new Error("Incorrect Password"));
            }

            return user;
        })
        .then( (user) => {

            res.json(user);

            return next();
        })
        .catch(next);
}