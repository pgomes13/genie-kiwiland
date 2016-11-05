(function () {
	'use strict';

	ProcessGraphsFactory.$inject = ['OperationsFactory', 'NodeFactory', 'RouteFactory'];

	angular
		.module('genie')
		.factory('ProcessGraphsFactory', ProcessGraphsFactory);

	function ProcessGraphsFactory(OperationsFactory, NodeFactory, RouteFactory) {
		/**
		 * A comma separated string of node paths with weight
		 * @param nodes
		 * @constructor
		 */
		var Graph = function (nodes) {
			this.nodes = new Map();

			if (nodes) {
				this.nodes = Graph.makeNodes(nodes);
			}
		};

		/**
		 * Traverse grapgh & finds all paths with from
		 * maximum source to destination with max stops
		 * @param source
		 * @param destination
		 * @param stops
		 * @returns {Map}
		 */
		Graph.prototype.getAllPaths = function (source, destination, stops) {
			source = source.toUpperCase(),
				destination = destination.toUpperCase();

			// All found paths
			var allPaths = new Map();
			if (source && destination && stops) {
				if (this.nodes.get(source) && this.nodes.get(destination)) {
					// Intermediate paths
					var path = new Array(),
						pathIndex = 0;

					// Starting point is a stop
					var count = ++stops;

					function traverse(s, d, path, count) {
						path.push(s);
						count--;

						if (((s.name === d.name) && (count <= stops - 1)) || count <= 0) {
							if (s.name === d.name) {
								// Don't count paths with 1 stop
								if (path.length > 1) {
									var pathStr = '',
										weight = 0;

									for (var i = 0; i < path.length; i++) {
										// Build path string
										pathStr = pathStr + path[i].name;
										if (i !== path.length - 1) {
											// Calculate total weight
											weight += path[i].routes.get(path[i + 1].name).weight;
										}
									}
									// Add path
									allPaths.set(pathStr, weight);
								}
							}
							// Capture larger paths
							if (d.name === s.name && count > 0) {
								for (var node in s.routes.keys()) {
									traverse(s.routes.get(node).destination, d, path, count);
								}
							}
						} else {
							for (var node in s.routes.keys()) {
								traverse(s.routes.get(node).destination, d, path, count);
							}
						}
						path.pop();
					}

					//Init
					traverse(this.nodes.get(source), this.nodes.get(destination), path, count);
				}
			}
			return allPaths;
		};

		/**
		 * Returns distance of nodes in path or throws
		 * exception when no such route exists
		 * @param path
		 * @returns {number}
		 */
		Graph.prototype.calcDistance = function (path) {
			if (path && path.match(/^(?:[A-Z]-+)+[A-Z]{1}$/)) {
				path = path.toUpperCase();
				var tokens = path.split('-');

				// Ensure all nodes exist
				var validNodes = new Array();
				for (var t in tokens) {
					var nodeName = tokens[t];
					if (this.nodes.get(nodeName)) {
						validNodes.push(this.nodes.get(nodeName));
					} else {
						throw new Error('NO SUCH ROUTE.');
					}
				}

				// Calculate distance of path
				var distance = 0;
				for (var i = 0; i <= validNodes.length; i++) {
					var next = i + 1;
					if (next <= validNodes.length - 1) {
						// Check if direct path exists
						if (!validNodes[i].routes.get(validNodes[next].name))
							throw new Error('NO SUCH ROUTE.')
						distance += validNodes[i].routes.get(validNodes[next].name).weight;
					}
				}
				return distance;
			}
		};

		/**
		 * function function to build node objects with their requisite routes
		 * @param data
		 * @returns {Map}
		 */
		Graph.makeNodes = function (data) {
			var strNodes = [];

			if (data) {
				strNodes = OperationsFactory.parseRoutes(data);
			}

			var nodes = new Map();

			for (var r in strNodes) {
				var nameOfNodeA = r[0],
					nameOfNodeB = r[1];
				var weight = parseInt(r[2]);

				var nodeA, nodeB;

				// check if node already exists
				if (nodes.has(nameOfNodeA)) {
					nodeA = nodes.get(nameOfNodeA);
				} else {
					nodeA = new NodeFactory(nameOfNodeA);
				}

				// for destination
				if (nodes.has(nameOfNodeB)) {
					nodeB = nodes.get(nameOfNodeB);
				} else {
					nodeB = new NodeFactory(nameOfNodeB);
				}

				// Set Route from nodeA to nodeB
				var routeToB = new RouteFactory(nodeB, weight);
				nodeA.set(routeToB);

				// Update map
				nodes.set(nodeA.name, nodeA);
				nodes.set(nodeB.name, nodeB);
			}

			return nodes;
		};


		return Graph;

	}


})();