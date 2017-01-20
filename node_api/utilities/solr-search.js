'use strict';

const solr = require("solr-client");
const config = rootRequire("config");
const client = solr.createClient(config.solr.client);


/////////////////////////////////////////////////
//  SOLR Search Interface
/////////////////////////////////////////////////

exports.query = (type, identifier, options) => {

    // Clean Query Parameters
    const query_offset = options.offset || 0;
    const query_limit  = Math.min(50, options.limit || 10);
    const query_string = [type, identifier].join(":");

    // Build SOLR Query
    const query = client.createQuery()
        .q(query_string)
        .start(query_offset)
        .rows(query_limit);


    return new Promise( (resolve, reject) => {
        
        client.search(query, (err, data) => {

            if (err) {
                // TODO: User Restify 404 Error
                return reject(err);
            }

            // Parse Query Response Data
            const { q, start, rows } = data.responseHeader.params;
            const { docs, numFound } = data.response;

            // Calculate Pagination Counts
            const count = Math.min(rows, (numFound - start));
            const remaining_count = (numFound - start - count);
            
            // Build Search Response Structure
            const query = { q, offset: start, limit: rows }
            const paging = { total_count: numFound, remaining_count }
            const results = { count, data: docs }

            return resolve({ query, paging, results })
        });

    });
}