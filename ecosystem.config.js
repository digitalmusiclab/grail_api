'use strict';


/////////////////////////////////////////////////
//  PM2 Application Manifest
/////////////////////////////////////////////////

module.exports = {
    apps : [{
        name      : "grail-api",
        script    : "./api/server.js",
        instances : 1,
        watch     : false,
        exec_mode : "fork",
        env       : { "NODE_ENV": "production" }
    }]
}
