(function () {
	'use strict';

	readFile.$inject = ['$parse'];

	angular
		.module('genie')
		.directive('readFile', readFile);

	function readFile($parse) {
		return {
			restrict: 'A',
			scope: false,
			link: function (scope, element, attrs) {
				var fn = $parse(attrs.readFile);

				element.on('change', function (onChangeEvent) {
					var reader = new FileReader();

					reader.onload = function (onLoadEvent) {
						scope.$apply(function () {
							fn(scope, {$fileContent: onLoadEvent.target.result});
						});
					};

					reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
				});
			}
		};
	}

})();