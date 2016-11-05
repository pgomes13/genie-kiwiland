(function () {
	'use strict';

	HomeRoute.$inject = ['$stateProvider'];

	angular.module('genie')
		.config(HomeRoute);


	function HomeRoute($stateProvider) {
		$stateProvider
			.state('app.home', {
				url: '/home',
				abstract: false,
				templateUrl: '/assets/templates/home/home.html',
				controller: 'HomeController as home'
			});

	}


})();