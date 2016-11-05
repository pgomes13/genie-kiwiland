(function () {
	'use strict';

	HomeController.$inject = ['$mdDialog'];

	angular
		.module('genie')
		.controller('HomeController', HomeController);


	function HomeController($mdDialog) {
		const home = this;

		// initialise the functions when the controller loads
		home.showResults = showResults;

		/**
		 * Process the input graphs to show the output
		 * @param $fileContent
		 */
		function showResults ($fileContent) {
			var graphs = $fileContent.split(',').map((graph) => {
				return graph.trim();
			});
		}

		function showResultsBar (data) {
			$mdDialog.show({
				templateUrl: '/assets/templates/results/results.html',
				controller: 'ResultsController as results',
				clickOutsideToClose: true,
				locals: {
					Results: data
				}
			});
		}

		return home;
	}


})();