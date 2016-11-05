var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var util = require('gulp-util');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();


// create a web server for live-reloading
gulp.task('server', function () {
	var baseDir = '';

	if (util.env.dev) {
		baseDir = '.'
	}
});