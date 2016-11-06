(function () {
	'use strict';

	describe('Result Factory', function () {
		var resultFactory;
		var testData = 'AB5,BC4,CD8,DC8,DE6,AD5,CE2,EB3,AE7';
		var result = null;

		beforeEach(module('genie'));

		beforeEach(inject(function ($injector) {
			resultFactory = $injector.get('ResultFactory');
		}));

		beforeEach(function() {
			result = new resultFactory(testData);
		});
		afterEach(function() {
			result = null;
		});

		it('ResultFactory is defined', function () {
			expect(resultFactory).toBeDefined();
		});

		it('Calculates distance of a defined path', function (done) {
			expect(result.calcDistance('A-B-C')).toBe(5 + 4);
			expect(result.calcDistance('A-D')).toBe(5);
			expect(result.calcDistance('A-E-B-C-D')).toBe(7 + 3 + 4 + 8);
			done();
		});

		it('Calculates number of possible routes with max stops', function(done) {
			expect(result.calcNumberOfPossibleRoutesWithStops('C-C', '<=', 3)).toBe(2);
			expect(result.calcNumberOfPossibleRoutesWithStops('A-B', '<=', 3)).toBe(3);
			expect(result.calcNumberOfPossibleRoutesWithStops('A-E', '<=', 3)).toBe(4);
			done();
		});

		it('Calculates number of possible routes with exact stops', function(done) {
			expect(result.calcNumberOfPossibleRoutesWithStops('C-C', '==', 3)).toBe(1);
			expect(result.calcNumberOfPossibleRoutesWithStops('A-B', '==', 3)).toBe(1);
			expect(result.calcNumberOfPossibleRoutesWithStops('A-C', '==', 4)).toBe(3);
			done();
		});

		it('Calculates shortest possible route', function(done) {
			expect(result.calcShortestRoute('A-C')).toBe(9);
			expect(result.calcShortestRoute('B-B')).toBe(9);
			done();
		});

		it('Calculates number of possible trips with less-than distance', function(done) {
			expect(result.calcNumberOfPossibleRoutesWithDistance('C-C', '<', 30)).toEqual(7);
			done();
		});
		it('Calculates number of possible trips with exact distance', function(done) {
			expect(result.calcNumberOfPossibleRoutesWithDistance('C-C', '==', 30)).toEqual(2);
			done();
		});
	});
})();