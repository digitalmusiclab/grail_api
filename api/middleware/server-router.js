'use strict';

const fs = require("fs");
const path = require("path");
const restify = require("restify");
const config = rootRequire("config");
const routes_path = path.join(__dirname, "..", "routes");
const rate_limiter = restify.throttle(config.server.throttle_options)


/////////////////////////////////////////////////
//  Configure Server API Routing
/////////////////////////////////////////////////

exports.configure = (server) => {

    /* Load Routes from File */
    fs.readdirSync(routes_path)
    .filter( (file) => {
        const hasExtentsion = (file.indexOf('.') !== 0);
        const isJavaScript = (file.slice(-3) === '.js');
        const notIndex = (file !== 'index.js');
        return (hasExtentsion && notIndex && isJavaScript);
    })
    .forEach(function(router) {

        // Load Router
        const routes = require(path.join(routes_path, router));
        
        // Register Router Endpoints
        routes.forEach( (route) => {

            const route_method = route.meta.method.toLowerCase();
            const route_paths  = route.meta.paths;

            // Register Endpoint
            route_paths.forEach((endpoint) => {
                
                const route_params = {
                    path: endpoint,
                    name: route.meta.name,
                    version: route.meta.version,
                    validation: route.meta.validation,
                    authentication: route.meta.authenticated
                }

                // ie. server.get('route', rate_limiter, handler)
                return server[route_method](route_params, rate_limiter, route.handler);
            });
        });
    });

    /* Serve Static Content */
    server.get(/.*/, restify.serveStatic({
        directory: './api/static/docs',
        default: 'index.html'
    }));
}