'use strict';

const SolrSearch = rootRequire("utilities/solr-search");
const constants = rootRequire("utilities/constants");
const routes = [];


/////////////////////////////////////////////////
//  Search SOLR
/////////////////////////////////////////////////

routes.push({
    meta: {
        name: 'search',
        method: 'GET',
        paths: [ '/search' ],
        version: '1.0.0',
        authenticated: true,
        validation: {
            queries: {
                id:   { isRequired: true, notContains: ["*"] },
                type: { isRequired: true, isIn: constants.queryTypes },
                offset: { isRequired: false, isInt: true, isNatural: true },
                limit:  { isRequired: false, isInt: true, isNatural: true }
            }
        }
    },
    handler: function search (req, res, next) {

        const { type, id, offset, limit } = req.query;

        // TODO: Add Pagination 'next' url
        // TODO: Add rate-limit, limit-remaining
        SolrSearch.query(type, id, { offset, limit })
            .then(res.json.bind(res))
            .catch(next)
            .then(next);

        return next();
    }
});


/////////////////////////////////////////////////
//  Module Exports
/////////////////////////////////////////////////

module.exports = routes;