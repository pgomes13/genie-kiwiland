'use strict';

/**
 * The main paths of this project.
 * Please handle with care!
 */
exports.paths = {
	root:'./',
	build: './.build',
	tmp: './.tmp',
	app: './app',
	angular: './app/angular',
	sass: './sass'
};

exports.sources = {
	angular: [
		exports.paths.angular + '/app.modules.js',
		exports.paths.angular + '/**/*.js'
	]
};