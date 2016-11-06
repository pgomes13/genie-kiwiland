(function () {
	'use strict';

	RouteFactory.$inject = [];

	angular
		.module('genie')
		.factory('RouteFactory', RouteFactory);

	function RouteFactory() {

		/**
		 * @param destination
		 * @param weight
		 * @constructor
		 */
		var Route = function (destination, weight) {
			this.destination = {};
			this.weight = 0;

			if (destination && weight) {
				this.destination = destination;
				this.weight = weight;
			}
		};

		/**
		 * Add destination to route
		 * @param destination
		 * @param weight
		 */
		Route.prototype.set = function (destination, weight) {
			if (destination && weight) {
				this.destination = destination;
				this.weight = weight;
			}
		};

		return Route;
	}


})();