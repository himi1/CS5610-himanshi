'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location','$window', 'Authentication',
	function($scope, $http, $location,$window, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		/*if ($scope.authentication.user) $location.path('/');*/
		$scope.showPopup = false;
		$scope.loginPopUp = false;
		$scope.hidePopUp = false;

		$scope.$on('show-popup',function(event,showPopup) {
			//$scope.$apply(function(){
				$scope.showPopup = showPopup;
				$scope.loginPopUp = false;
				$scope.hidePopUp = false;
				$scope.registerPopUp = false;
			//})
		});
		$scope.showpopup = function(){
			$scope.showPopup = true;
		};
		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				//$location.path('/');
				$scope.showPopup = false;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				//$location.path('/');
				$scope.showPopup = false;
				$window.location.reload();
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
