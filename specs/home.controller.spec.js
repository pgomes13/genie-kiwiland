(function () {
	'use strict';

	describe('App', function () {

		var scope, controller;

		beforeEach(module('genie'));

		beforeEach(inject(function ($rootScope, $controller, $injector) {
			scope = $rootScope.$new();
			controller = $controller('HomeController as home', {
				$scope: scope
			});
		}));

		it('Controller is defined', function() {
			expect(controller).toBeDefined();
		});
	});
})();