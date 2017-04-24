'use strict';

const path = require("path");


/////////////////////////////////////////////////
//  Root Require Module Helper
/////////////////////////////////////////////////

module.exports = () => {

    /* Add Function To Global Namespace */
    global.rootRequire = (filename) => {

        const module_path = path.join(__dirname, "..", filename);
        
        return require(path.normalize(module_path));
    }

}