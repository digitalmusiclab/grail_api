'use strict';

const db = rootRequire("models");
const knex = require('knex')({client: 'mysql'});


/////////////////////////////////////////////////
//  Search GRAIL 
/////////////////////////////////////////////////

exports.grail = (req, res, next) => {

    // Request Parameters
    const search_id = req.query.id;
    const search_entity = req.params.entity;
    const search_namespace = req.query.namespace;
    const return_entity = req.query.include_entity;
    const return_namespace = req.query.include_namespace;
    const query_params = { search_id, search_entity, search_namespace, return_entity, return_namespace}

    // Database Query Parameters
    const search_table = grailTable(search_entity);
    const search_column = grailEntityNamespaceId(search_entity, search_namespace);
    const return_column = grailEntityNamespaceId(return_entity, return_namespace);
    const return_column_criteria = grailEntityNamespaceCriteria(return_entity, return_namespace);
    const return_table = grailTable(return_entity);

    // Database Query String
    let db_query = "";

    // Searching in a single entity table
    if (search_entity == return_entity) {
        db_query = knex.select(return_column, return_column_criteria).from(search_table).where(search_column, search_id).whereNotNull(return_column);
    }
    // Search From Track -> Artist/Release
    else if (search_entity == "track") {
        const search_ref_id = grailEntityId(return_entity);
        const sub_query = knex.select(search_ref_id).from("grail_track").where(search_column, search_id).whereNotNull(search_ref_id);
        db_query = knex.distinct(return_column).select(return_column_criteria).from(return_table).where(search_ref_id, "in", sub_query);
    }
    // Search From Artist/Release -> Track
    else if (return_entity == "track") {
        const search_ref_id = grailEntityId(search_entity);
        const sub_query = knex.select(search_ref_id).from(search_table).where(search_column, search_id).whereNotNull(search_ref_id);
        db_query = knex.distinct(return_column).select(return_column_criteria).from(return_table).where(search_ref_id, "in", sub_query);
    }
    // Search through Track Table ie. artist -> release, release -> artist
    else {
        const search_reference_column = grailEntityId(search_entity);
        const return_reference_column = grailEntityId(return_entity);
        const source_query = knex.select(search_reference_column).from(search_table).where(search_column, search_id);
        const track_query = knex.select(return_reference_column).from('grail_track').where(search_reference_column, 'in', source_query);
        db_query = knex.distinct(return_column).select(return_column_criteria).from(return_table).where(return_reference_column, 'in', track_query);
    }

    // Execute Database Query
    return db.sequelize.query(db_query.toString(), { type: db.sequelize.QueryTypes.SELECT })
        .then((results) => {
            res.json({ query: query_params, data: results })
        })
        .catch(next)
        .then(next);
}


/////////////////////////////////////////////////
//  Helper Functions
/////////////////////////////////////////////////

const grailTable = (entity) => `grail_${entity}`;
const grailEntityId = (entity) => `grail_${entity}_id`;
const grailEntityNamespaceId = (entity, namespace) => `${namespace}_${entity}_id`;
const grailEntityNamespaceCriteria = (entity, namespace) => `${namespace}_${entity}_criteria`;