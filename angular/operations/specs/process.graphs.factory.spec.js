(function () {
	'use strict';

	describe('Process Graphs Factory', function () {
		var processGraphsFactory;
		var testData = 'AB5,BC4,CD8,DC8,DE6,AD5,CE2,EB3,AE7';
		var graph = null;

		beforeEach(module('genie'));

		beforeEach(inject(function ($injector) {
			processGraphsFactory = $injector.get('ProcessGraphsFactory');
		}));

		beforeEach(function() {
			graph = new processGraphsFactory(testData);
		});
		afterEach(function() {
			graph = null;
		});

		it('ProcessGraphsFactory is defined', function () {
			expect(processGraphsFactory).toBeDefined();
		});

		it('Build valid graph from input data string', function (done) {
			expect(graph.nodes.get('A')).not.toBe(undefined);
			expect(graph.nodes.get('A')).not.toBe(undefined);
			expect(graph.nodes.get('B')).not.toBe(undefined);
			expect(graph.nodes.get('C')).not.toBe(undefined);
			expect(graph.nodes.get('D')).not.toBe(undefined);
			expect(graph.nodes.get('E')).not.toBe(undefined);
			expect(graph.nodes.get('A').routes.get('B').weight).toBe(5);
			expect(graph.nodes.get('B').routes.get('C').weight).toBe(4);
			expect(graph.nodes.get('C').routes.get('D').weight).toBe(8);
			expect(graph.nodes.get('D').routes.get('C').weight).toBe(8);
			expect(graph.nodes.get('D').routes.get('E').weight).toBe(6);
			expect(graph.nodes.get('A').routes.get('D').weight).toBe(5);
			expect(graph.nodes.get('C').routes.get('E').weight).toBe(2);
			expect(graph.nodes.get('E').routes.get('B').weight).toBe(3);
			expect(graph.nodes.get('A').routes.get('E').weight).toBe(7);
			done();
		});

		it('Calculates distance of a defined path', function (done) {
			expect(graph.calcDistance('A-B-C')).toBe(5 + 4);
			expect(graph.calcDistance('A-D')).toBe(5);
			expect(graph.calcDistance('A-E-B-C-D')).toBe(7 + 3 + 4 + 8);
			done();
		});
	});
})();