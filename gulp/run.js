'use strict';

var gulp = require('gulp');
var path = require('path');
var conf = require('./conf');
var runSequence = require('run-sequence');

gulp.task('run', function (done) {
	runSequence(
		'inject',
		'server',
		done
	)
});