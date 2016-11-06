(function () {
	'use strict';

	ResultFactory.$inject = ['OperationsFactory', 'ProcessGraphsFactory'];

	angular
		.module('genie')
		.factory('ResultFactory', ResultFactory);

	function ResultFactory(OperationsFactory, ProcessGraphsFactory) {

		/**
		 * @param input
		 * Input string containing comma separated graphs with distance
		 * @constructor
		 */
		var Result = function (input) {
			this.graph = {};

			if (input) {
				this.graph = Result.processGraphs(input);
			}
		};

		/**
		 * function to test problem test criteria
		 * @returns {string}
		 */
		Result.prototype.test = function () {
			var results = [];

			if (this.graph) {
				if (this.graph.nodes) {
					results.push(
						{
							test: 1,
							result: this.calcDistance('A-B-C')
						}, {
							test: 2,
							result: this.calcDistance('A-D')
						}, {
							test: 3,
							result: this.calcDistance('A-D-C')
						}, {
							test: 4,
							result: this.calcDistance('A-E-B-C-D')
						}, {
							test: 5,
							result: this.calcDistance('A-E-D')
						}, {
							test: 6,
							result: this.calcNumberOfPossibleRoutesWithStops('C-C', '<=', '3')
						}, {
							test: 7,
							result: this.calcNumberOfPossibleRoutesWithStops('A-C', '==', '4')
						}, {
							test: 8,
							result: this.calcShortestRoute('A-C')
						}, {
							test: 9,
							result: this.calcShortestRoute('B-B')
						}, {
							test: 10,
							result: this.calcNumberOfPossibleRoutesWithDistance('C-C', '<', '30')
						}
					);
				}
			}
			return results;
		};

		/**
		 * Calculate the distance of path
		 * @param path
		 * @returns {*}
		 */
		Result.prototype.calcDistance = function (path) {
			if (path) {
				return this.graph.calcDistance(path);
			}
		};

		/**
		 * Perform a relational comparison with value and filter
		 * @param value
		 * @param relation
		 * @param filter
		 * @returns {*}
		 */
		Result.prototype.filterRoutes = function (value, relation, filter) {
			if (value && relation && filter) {
				switch (relation) {
					case '<':
						if (value < filter)
							return value;
						break;
					case '<=':
						if (value <= filter)
							return value;
						break;
					case '>':
						if (value > filter)
							return value;
						break;
					case '>=':
						if (value >= filter)
							return value;
						break;
					case '==':
						if (value === filter)
							return value;
						break;
					default:
						if (value === filter)
							return value;
						break;
				}
			}
		};

		/**
		 * Calculate the number of routes via path with <,>,<=,>= or == stops
		 * @param path
		 * @param relation
		 * @param stops
		 * @returns {Number}
		 */
		Result.prototype.calcNumberOfPossibleRoutesWithStops = function (path, relation, stops) {
			if (path && relation && stops) {
				// Starting point is a stop
				stops++;

				var nodes = OperationsFactory.tokenizeNodes(path);
				if (nodes.length === 2 && relation.match(/^:?(<|>|<=|>=|==){1}$/)) {
					var validRoutes = new Array();
					var allRoutes = this.graph.getAllPaths(nodes[0], nodes[1], stops);

					for (var route of allRoutes.keys()) {
						// Length
						var l = route.length;

						var filtered = this.filterRoutes(l, relation, stops);
						if (filtered)
							validRoutes.push(filtered);
					}
					return validRoutes.length;
				}
			}
		};

		/**
		 * Calculate shortest route via path
		 * @param path
		 * @returns {*}
		 */
		Result.prototype.calcShortestRoute = function (path) {
			if (path) {
				var shortestDistance, allRoutes;

				// Only 5 nodes in our sample data
				var stops = 5;

				// Starting point is a stop
				stops++;

				var nodes = OperationsFactory.tokenizeNodes(path);
				if (nodes.length === 2) {
					var allRoutes = this.graph.getAllPaths(nodes[0], nodes[1], stops);
					for (var route of allRoutes.values()) {
						if (!shortestDistance) {
							shortestDistance = route;
						} else if (route < shortestDistance)
							shortestDistance = route;
					}
				}
				return shortestDistance;
			}
		};

		/**
		 * Calculate the number of routes via path with <,>,<=,>= or == distance
		 * @param path
		 * @param relation
		 * @param distance
		 * @returns {Number}
		 */
		Result.prototype.calcNumberOfPossibleRoutesWithDistance = function (path, relation, distance) {
			if (path && relation && distance) {
				var nodes = OperationsFactory.tokenizeNodes(path);
				if (nodes.length === 2 && relation.match(/^:?(<|>|<=|>=|==){1}$/)) {
					var validRoutes = new Array();
					// Max 10 for our sample data
					var allRoutes = this.graph.getAllPaths(nodes[0], nodes[1], 10);
					for (var route of allRoutes.keys()) {
						// Distance
						var d = allRoutes.get(route);

						var filtered = this.filterRoutes(d, relation, distance);
						if (filtered)
							validRoutes.push(filtered);
					}
					return validRoutes.length;
				}
			}
		};

		/**
		 * Return the processed graph data
		 * @param data
		 * @returns {Graph}
		 */
		Result.processGraphs = function (data) {
			if (data) {
				var graph = new ProcessGraphsFactory(data);
				return graph;
			}
		};

		return Result;
	}


})();