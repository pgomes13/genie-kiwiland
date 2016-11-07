'use strict';

/**
 * The gulp tasks are split in several files in the gulp directory
 *  because putting all here was really too long
 */
var gulp = require('gulp');
var requireDir = require('require-dir');
var conf = require('./gulp/conf');

/** Require all tasks in gulp/tasks,
 * including sub folders
 */
requireDir('./gulp', {recurse: true});

/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
gulp.task('default', function () {
	if(conf.isDev()) {
		gulp.start('run:dev');
	} else {
		gulp.start('run:prod');
	}

});
