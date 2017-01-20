'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const lodash = require('lodash');
const config = require("../config").database;

const db = {};
const sequelize = new Sequelize(config.name, config.user, config.password, config.options);


/////////////////////////////////////////////////
//  Register Model Definitions
/////////////////////////////////////////////////

fs.readdirSync(__dirname)
.filter( (file) => {
	const hasExtentsion = (file.indexOf('.') !== 0);
	const isJavaScript = (file.slice(-3) === '.js');
	const notIndex = (file !== 'index.js');
    return (hasExtentsion && notIndex && isJavaScript);
})
.forEach( (file) => {
	const model_path = path.join(__dirname, file);
    const model = sequelize.import(model_path);
    db[model.name] = model;
});


/////////////////////////////////////////////////
//  Associate Models
/////////////////////////////////////////////////

Object.keys(db).forEach( (modelName) => {
    if (db[modelName].options.hasOwnProperty('associate')) {
        db[modelName].options.associate(db);
    }
});

/////////////////////////////////////////////////
//  Helper Functions
/////////////////////////////////////////////////

const synchronizeDatabase = () => {
    return sequelize.sync({ force: config.forceSync });
}


/////////////////////////////////////////////////
//  Module Exports
/////////////////////////////////////////////////

module.exports = lodash.extend({
    synchronize: synchronizeDatabase,
    sequelize: sequelize,
    Sequelize: Sequelize
}, db);