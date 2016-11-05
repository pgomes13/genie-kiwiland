(function () {
	'use strict';

	ResultsController.$inject = ['Results'];

	angular
		.module('genie')
		.controller('ResultsController', ResultsController);


	function ResultsController(Results) {
		const results = this;

		results.display = Results;

		return results;
	}


})();