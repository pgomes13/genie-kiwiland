(function () {
	'use strict';

	describe('Node Factory', function () {
		var nodeFactory, routeFactory;
		var node = null;

		beforeEach(module('genie'));

		beforeEach(inject(function ($injector) {
			nodeFactory = $injector.get('NodeFactory');
			routeFactory = $injector.get('RouteFactory');
		}));

		beforeEach(function() {
			node = new nodeFactory('A');
		});
		afterEach(function() {
			node = null;
		});

		it('NodeFactory is defined', function () {
			expect(nodeFactory).toBeDefined();
		});

		it('Creates a Node with name', function(done) {
			expect(node.name).not.toBe(undefined);
			expect(node.name).toBe('A');
			expect(node.routes).not.toBe(undefined);
			done();
		});

		it('Adds Route to this Node', function(done) {
			var destination = new nodeFactory('B');
			var route = new routeFactory(destination, 5);
			var node = new nodeFactory('A');
			node.set(route);
			expect(node.routes.get('B')).not.toBe(undefined);
			expect(node.routes.get('B').weight).toBe(5);
			done();
		});
	});
})();