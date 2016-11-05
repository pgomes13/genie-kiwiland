(function () {
	'use strict';

	NodeFactory.$inject = [''];

	angular
		.module('genie')
		.factory('NodeFactory', NodeFactory);

	function NodeFactory () {

		/**
		 * @param name
		 * A string representing node name
		 * @constructor
		 */
		var Node = function(name) {
			this.name = '';
			this.routes = new Map();

			if (name)
				this.name = name;
		};

		/**
		 * Adds a route for this node
		 * @param route
		 */
		Node.prototype.set = function(route) {
			if (route) {
				if (route.destination && route.weight) {
					var destinationName = route.destination.name;
					this.routes.set(destinationName, route);
				}
			}
		};

		/**
		 * Returns route from this node to destination
		 * @param destination
		 * @returns {V}
		 */
		Node.prototype.get = function(destination) {
			if (destination) {
				if (destination.name) {
					return this.routes.get(destination.name);
				}
			}
		};

		/**
		 * Removes route to destination
		 * @param destination
		 */
		Node.prototype.del = function(destination) {
			if (destination) {
				if (destination.name) {
					this.routes.delete(destination.name);
				}
			}
		};

	}


})();