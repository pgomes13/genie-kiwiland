(function () {
	'use strict';

	appReady.$inject = ['$state'];

	angular.module('genie')
		.run(appReady);

	function appReady ($state) {
		$state.go('app.home');
	}
})();