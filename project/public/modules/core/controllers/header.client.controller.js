'use strict';

angular.module('core').controller('HeaderController', ['$scope','$rootScope', 'Authentication',
	function($scope,$rootScope, Authentication) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
		$scope.showPopup = function() {
			$rootScope.$broadcast('show-popup', true);
		};
	}
]);
