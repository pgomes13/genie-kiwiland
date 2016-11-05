'use strict';

var gulp = require('gulp');
var path = require('path');
var conf = require('./conf');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

// Compile SASS
gulp.task('sass',function () {
	return gulp.src(path.join(conf.paths.sass, '/app.scss'))
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(path.join(conf.paths.assets, '/css')))

});