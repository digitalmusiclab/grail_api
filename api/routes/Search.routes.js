'use strict';

const SearchController = rootRequire("controllers/Search.controller.js");
const constants = rootRequire("utilities/constants");
const _ = require("lodash");
const routes = [];


/////////////////////////////////////////////////
//  Search
/////////////////////////////////////////////////

routes.push({
    meta: {
        name: 'search',
        method: 'GET',
        paths: [ '/search/:entity' ],
        version: '1.0.0',
        authenticated: true,
        validation: {
            resources: {
                entity: { isRequired: true, isIn: ['artist','track', 'release'] }
            },
            queries: {
                id:   { isRequired: true, notContains: ["*"] },
                offset: { isRequired: false, isInt: true, isNatural: true },
                limit:  { isRequired: false, isInt: true, isNatural: true },
                namespace: {isRequired: true},
                include_namespace: {isRequired: true},
                include_entity: { isRequired: true, isIn: ['artist','track', 'release']}
            }
        }
    },
    handler: SearchController.grail
});


/////////////////////////////////////////////////
//  Module Exports
/////////////////////////////////////////////////

module.exports = routes;