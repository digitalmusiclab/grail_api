'use strict';

var bcrypt = require("bcrypt");


/////////////////////////////////////////////////
//  Hash Password
/////////////////////////////////////////////////

exports.hashPassword = (password) => {

    return generateSalt().then( (salt) => {
        
        return generatePasswordHash(password, salt);
    });
}


/////////////////////////////////////////////////
//  Compare Password & Password Hash
/////////////////////////////////////////////////

exports.comparePassword = (password, password_hash) => {

    return new Promise( (resolve, reject) => {

        bcrypt.compare(password, password_hash, (err, isMatch) => {
            
            if (err) {
                return reject(err);
            }

            return resolve(isMatch);
        });
    });
}


/////////////////////////////////////////////////
//  Generate Password Hash
/////////////////////////////////////////////////

const generatePasswordHash = (password, salt) => {

    return new Promise( (resolve, reject) => {

        bcrypt.hash(password, salt, (err, hash) => {

            if (err) {
                return reject(err);
            }

            return resolve(hash);
        });
    });
}

/////////////////////////////////////////////////
//  Generate Hashing Salt
/////////////////////////////////////////////////
const generateSalt = (err, salt) => {
    
    return new Promise( (resolve, reject) => {
        
        bcrypt.genSalt(5, (err, salt) => {
            
            if (err) {
                return reject(err);
            }

            return resolve(salt);
        });
    });
}