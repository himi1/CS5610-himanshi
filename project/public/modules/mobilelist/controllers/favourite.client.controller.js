
'use strict';
angular.module('mobilelist').controller('FavourireController', ['$scope','$timeout','$http','Authentication','Plugin',
	function($scope, $timeout,$http,Authentication,Plugin) {
		$scope.mobileList = [];
		$scope.totalResults = -1;

		$http.get('/favourites/user/' + Authentication.user._id).success(function(data){
			$scope.mobileList = data;
			$scope.totalResults = data.length;
			$timeout(function() {
				Plugin.initializePlugins();
				Plugin.rating();
			});
		}).error(function(){
			Plugin.zebra_alert('Error in getting list of favourite phones',{type:'error',title:'Error !!!'});
		});

		$scope.removeFavourite = function($event,index,id,name) {
			$http.delete('/favourites/'+id).success(function(data) {
				Plugin.zebra_alert(name + data,{type:'confirmation',title:'Success'});
				$scope.mobileList.splice(index,1);
				$scope.totalResults --;
			}).error(function() {
				Plugin.zebra_alert('Review posting failed due to some error.',{
					type:'warning',
					title:'Error'
				});
			});
			$event.stopPropagation();
			$event.preventDefault();
		};
	}
]);
