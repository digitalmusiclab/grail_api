'use strict';

const gulp = require("gulp");
const env = require("gulp-env");
const exec = require('child_process').exec;
const nodemon = require("gulp-nodemon");


/////////////////////////////////////////////////
//  Gulp Tasks
/////////////////////////////////////////////////

/* Start Development App Server */
gulp.task("develop", () => {
    nodemon({
        env: {'NODE_ENV': 'development'},
        script: "./api/server.js",
        ext: 'js'
    })
});

/* Build API Documentation */
gulp.task("build-docs", (cb) => {
    const build_path = "./api/static/docs";
    const docs_path = "./documentation/mkdocs.yml";
    const build_cmd = `mkdocs build -f ${docs_path} -d ${build_path}`;
    exec(build_cmd, cb);
});