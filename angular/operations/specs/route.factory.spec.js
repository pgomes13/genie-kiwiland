(function () {
	'use strict';

	describe('Route Factory', function () {
		var nodeFactory, routeFactory;
		var destination = null;
		var weight = 5;

		beforeEach(module('genie'));

		beforeEach(inject(function ($injector) {
			nodeFactory = $injector.get('NodeFactory');
			routeFactory = $injector.get('RouteFactory');
		}));

		beforeEach(function() {
			destination = new nodeFactory('A');
		});
		afterEach(function() {
			destination = null;
		});

		it('RouteFactory is defined', function () {
			expect(routeFactory).toBeDefined();
		});

		it('Creates a Route with end-point destination Node and weight', function(done) {
			var route = new routeFactory(destination, weight);
			expect(route.destination).not.toBe(undefined);
			expect(route.destination).toBe(destination);
			expect(route.weight).toBe(weight);
			done();
		});
	});
})();