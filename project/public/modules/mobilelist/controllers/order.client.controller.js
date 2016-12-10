
'use strict';
angular.module('mobilelist').controller('OrderController', ['$scope','$timeout','$http','Authentication','Plugin',
	function($scope, $timeout,$http,Authentication,Plugin) {
		$scope.orderList = [];
		$scope.affOrderList = [];
		$scope.totalResults = -1;
		$scope.totalAffResults = -1;

		$scope.affStatusFilter = {
			status : ''
		};
		$http.get('/affOrders/user/' + Authentication.user._id).success(function(data) {
			$scope.affOrderList = data;
			$scope.totalAffResults = data.length;
		}).error(function(){
			Plugin.zebra_alert('Error in getting list of orders tracked',{ type: 'error', title:'Error !!!' });
		});

		$http.get('/orders/user/' + Authentication.user._id).success(function(data) {
			$scope.orderList = data;
			$scope.totalResults = data.length;
		}).error(function(){
			Plugin.zebra_alert('Error in getting list of orders',{ type: 'error', title: 'Error !!!'});
		});

		$scope.getTotal = function(list,key,status) {
			var total = 0;
			for(var i=0; i<list.length; i++) {
				if(status === '' || list[i].status === $scope.statusFilter.status)
					total = total + list[i][key];
			}
			return total;
		};

		$timeout(function() {
			Plugin.initializePlugins();
			//Plugin.rating();
		});
	}
]);
