(function () {
	'use strict';

	describe('Operations Factory', function () {
		var operationsFactory;
		var testData = 'AB5,BC4,CD8,DC8,DE6,AD5,CE2,EB3,AE7';
		var testDataArray = ['AB5', 'BC4', 'CD8', 'DC8', 'DE6', 'AD5', 'CE2', 'EB3', 'AE7'];

		beforeEach(module('genie'));

		beforeEach(inject(function ($injector) {
			operationsFactory = $injector.get('OperationsFactory');
		}));

		beforeEach(function() {

		});
		afterEach(function() {

		});

		it('RouteFactory is defined', function () {
			expect(operationsFactory).toBeDefined();
		});

		it('Parses data and extracts routes, returning array of string routes', function(done) {
			var routes = operationsFactory.parseRoutes(testData);
			expect(routes.length).toBe(9);
			expect(typeof routes[0]).toBe('string');
			expect(typeof routes[1]).toBe('string');
			expect(typeof routes[2]).toBe('string');
			expect(typeof routes[3]).toBe('string');
			expect(typeof routes[4]).toBe('string');
			expect(typeof routes[5]).toBe('string');
			expect(typeof routes[6]).toBe('string');
			expect(typeof routes[7]).toBe('string');
			expect(typeof routes[8]).toBe('string');
			expect(routes[0]).toBe(testDataArray[0]);
			expect(routes[1]).toBe(testDataArray[1]);
			expect(routes[2]).toBe(testDataArray[2]);
			expect(routes[3]).toBe(testDataArray[3]);
			expect(routes[4]).toBe(testDataArray[4]);
			expect(routes[5]).toBe(testDataArray[5]);
			expect(routes[6]).toBe(testDataArray[6]);
			expect(routes[7]).toBe(testDataArray[7]);
			expect(routes[8]).toBe(testDataArray[8]);
			done();
		});

		it('Extracts nodes from path tokenized by "-"', function(done) {
			var nodes = operationsFactory.tokenizeNodes('A-C');
			expect(nodes.length).toBe(2);
			expect(typeof nodes[0]).toBe('string');
			expect(typeof nodes[1]).toBe('string');
			expect(nodes[0]).toBe('A');
			expect(nodes[1]).toBe('C');
			done();
		});

	});
})();