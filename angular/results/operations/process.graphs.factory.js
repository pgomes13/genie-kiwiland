(function () {
	'use strict';

	ProcessGraphsFactory.$inject = ['OperationsFactory'];

	angular
		.module('genie')
		.factory('ProcessGraphsFactory', ProcessGraphsFactory);

	function ProcessGraphsFactory (OperationsFactory) {
		var Graph = function (nodes) {
			this.nodes = new Map();

			if (nodes) {
				this.nodes = Graph.makeNodes(nodes);
			}
		};

		Graph.makeNodes = function (data) {
			var strNodes = [];

			if (data) {
				strNodes = OperationsFactory.parseRoutes(data);
			}

			var nodes = new Map();
			
			for (var r in strNodes) {
				var nameOfNodeA = r[0],
					nameOfNodeB = r[1],
					weight = parseInt(r[2]);

				var nodeA, nodeB;

				if (nodes.has(nameOfNodeA)) {
					nodeA = node
				} else {
					nodeB = new Node(nameOfNodeB);
				}
			}
			
		};


		return Graph;

	}


})();