'use strict';


/////////////////////////////////////////////////
//  Configure Server Error Handlers
/////////////////////////////////////////////////

exports.configure = (server) => {

    /* Emitted after a route has finished all the handlers you registered. */
    server.on('after', function (request, response, route, error) {

        // TODO: Add request audit logging

        console.log(`${new Date() - request.time()}ms`);
        
        if (!error) return;

        console.error({
            path: route.spec.path,
            errorCode: error.statusCode,
            body: error.body,
            name: error.name,
            message: error.message,
            errors: error.errors,
            req_params: request.params,
            req_body: request.body,
            req_query: request.query
        });
    });
}