'use strict';

const fs = require("fs");
const path = require("path");
const routes_path = path.join(__dirname, "..", "routes");


/////////////////////////////////////////////////
//  Configure Server API Routing
/////////////////////////////////////////////////

exports.configure = (server) => {

    // Find Routes
    fs.readdirSync(routes_path).forEach(function(router) {

        // Load Router
        const routes = require(path.join(routes_path, router));
        
        // Register Router Endpoints
        routes.forEach( (route) => {

            const route_method = route.meta.method.toLowerCase();
            const route_paths  = route.meta.paths;

            // Register Endpoint
            route_paths.forEach((endpoint) => {
                
                const routeMeta = {
                    name: route.meta.name,
                    path: endpoint,
                    version: route.meta.version,
                    validation: route.meta.validation,
                    authentication: route.meta.authenticated
                }

                // ie. server.get('route', handler)
                return server[route_method](routeMeta, route.handler);
            });

        });

    });
}