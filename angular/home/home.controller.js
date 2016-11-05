(function () {
	'use strict';

	HomeController.$inject = ['$scope'];

	angular
		.module('genie')
		.controller('HomeController', HomeController);


	function HomeController($scope) {
		const home = this;

		// initialise the functions when the controller loads
		home.showResults = showResults;

		/**
		 * Process the input graphs to show the output
		 * @param $fileContent
		 */
		function showResults ($fileContent) {
			home.results = $fileContent;
		}

		return home;
	}


})();