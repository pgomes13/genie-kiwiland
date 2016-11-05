(function () {
	'use strict';

	OperationsFactory.$inject = [''];

	angular
		.module('genie')
		.factory('OperationsFactory', OperationsFactory);

	function OperationsFactory () {
		return {
			parseRoutes: parseRoutes
		}


		/**
		 * Parse comma separated string of routes &
		 * extract each individual valid route
		 * @param data
		 * @returns {Array}
		 */
		function parseRoutes (data) {
			if (data) {
				data = data.toUpperCase().replace(/\s+/g, '');

				var found = data.split(',');
				for (var i = found.length - 1; i >=0; i--) {
					var valid = found[i].match(/^[A-Z]{1}[A-Z]{1}[0-9]+$/);

					if (valid === null) {
						if (i > -1) {
							// remove invalid token
							found.splice(i, 1);
						}
					}
				}

				return found;
			}
		}

	}


})();