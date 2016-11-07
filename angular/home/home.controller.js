(function () {
	'use strict';

	HomeController.$inject = ['$mdDialog', 'ResultFactory'];

	angular
		.module('genie')
		.controller('HomeController', HomeController);


	function HomeController($mdDialog, ResultFactory) {
		var home = this;

		// initialise the functions when the controller loads
		home.showResults = showResults;

		/**
		 * Process the input graphs to show the output
		 * @param $fileContent
		 */
		function showResults ($fileContent) {
			home.resultFactory = new ResultFactory($fileContent);
			showResultsBar(home.resultFactory.test());
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