'use strict';


angular.module('core').controller('HomeController', ['$scope','$timeout', '$location', 'Authentication','Plugin','SearchMobile',
	function($scope,$timeout, $location, Authentication, Plugin, SearchMobile) {
		var ENTER_KEY = 13,
			UP_KEY = 38,
			DOWN_KEY = 40;
		// This provides Authentication context.
		$scope.authentication = Authentication;
		$timeout(function(){
			Plugin.initializePlugins();
		});
		$scope.brands = ['All','Asus','Apple','Blackberry','HTC','Gionee','Lenovo','LG','Micromax','Motorola','Microsoft','Nokia','Samsung','Sony','Xiaomi','ZTE'];
		$scope.searchResults = function(keyEvent) {
			if (keyEvent.which === ENTER_KEY) {
				if(!$scope.selectedIndex) {
					if($scope.searchText) {
						$location.url('/list/' + $scope.selectedBrand + '/' + $scope.searchText + '/1');
					}
				} else {
					$location.url('/detail/' + $scope.textSearchResult[$scope.selectedIndex - 1]._id);
				}
			}
			if (keyEvent.which === DOWN_KEY) {
				$scope.selectedIndex = $scope.selectedIndex + 1;
				if($scope.selectedIndex > $scope.textSearchResult.length) {
					$scope.selectedIndex = 1;
				}
				$timeout(function() {
					Plugin.autoScrollToElement('.slide .list-item.selected', '.list-slider');
				});
			} else if (keyEvent.which === UP_KEY) {
				$scope.selectedIndex = $scope.selectedIndex - 1;
				if($scope.selectedIndex < 0) {
					$scope.selectedIndex = $scope.textSearchResult.length;
				}
				$timeout(function() {
					Plugin.autoScrollToElement('.slide .list-item.selected', '.list-slider');
				});
			}
		};
		var tempFilterText = '', filterTextTimeout;
		$scope.selectedIndex = 0;
		$scope.selectedBrand = $scope.brands[0];
		$scope.loadingList = false;

		$scope.$watch('searchText', function(val) {
			$scope.loadingList = true;
			if (filterTextTimeout) {
				$timeout.cancel(filterTextTimeout);
			}
			if(!val){
				$scope.textSearchResult = [];
				$scope.loadingList = false;
				return;
			}

			tempFilterText = val;
			filterTextTimeout = $timeout(function() {
				SearchMobile.fetch({
					query : tempFilterText,
					brand : $scope.selectedBrand
				},function(data){
					$scope.textSearchResult = data;
					$scope.selectedIndex = 0;
					$scope.loadingList = false;
				});
			}, 300);
		});
	}
]);
