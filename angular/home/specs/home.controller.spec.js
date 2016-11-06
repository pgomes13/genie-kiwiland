(function () {
	'use strict';

	describe('Home Controller', function () {

		var scope, controller;

		var testData = 'AB5,BC4,CD8,DC8,DE6,AD5,CE2,EB3,AE7';
		var resultData = [
			{
				test: 1,
				result: 9
			}, {
				test: 2,
				result: 5
			}, {
				test: 3,
				result: 13
			}, {
				test: 4,
				result: 22
			}, {
				test: 5,
				result: 'NO SUCH ROUTE'
			}, {
				test: 6,
				result: 2
			}, {
				test: 7,
				result: 3
			}, {
				test: 8,
				result: 9
			}, {
				test: 9,
				result: 9
			}, {
				test: 10,
				result: 7
			}
		];

		beforeEach(module('genie'));

		beforeEach(inject(function ($rootScope, $controller) {
			scope = $rootScope.$new();
			controller = $controller('HomeController as home', {
				$scope: scope
			});
		}));

		it('Controller is defined', function () {
			expect(controller).toBeDefined();
		});
		
		it('Uploading the input text file returns the output of the input string', function () {
			scope.home.showResults(testData);
			expect(scope.home.resultFactory.test()).toEqual(resultData);
		});
	});
})();

