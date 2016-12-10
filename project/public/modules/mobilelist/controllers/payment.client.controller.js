
'use strict';
angular.module('mobilelist').controller('PaymentController', ['$scope','$timeout','$http','$stateParams','Authentication','Plugin','Mobile',
	function($scope, $timeout,$http,$stateParams,Authentication,Plugin,Mobile) {
		var mobileId = $stateParams.mobileId;
		$scope.user = Authentication.user;
		$scope.isDifferent = false;

		$scope.quantity = 1;

		$scope.order = {
			displayName: $scope.user.displayName,
			address: {
				street: $scope.user.address.street,
				city: $scope.user.address.city,
				state: $scope.user.address.state,
				zip: $scope.user.address.zip
			},
			mobile: $scope.user.mobile,
			user_id: $scope.user._id,
			mobile_id: mobileId,
			quantity: $scope.quantity
		};

		Mobile.get({mobileId:mobileId},function(data){
			$scope.price = data.price;
			$scope.mobileDetails = data;
			$scope.success= true;
		});
		$http.get('https://bitpay.com/rates/INR').success(function(data){
			$scope.rate = data.data.rate;
		});

		$scope.placeOrder = function() {
			$http.post('/orders',$scope.order).success(function(data) {
				Plugin.zebra_alert('Your order has been placed successfully ' +
				'and we are processing your order. <br/><br/>' +
				'Please transfer <b>' + data.amount +
				' BTC</b> to BitCoin Account having address <b>' + data.address + '</b><br/>' +
				'Your order status will be pending, We will process your order once the payment will processed by you.',{
					type:'success',
					title:'Order Placed',
					buttons:  [{
						caption: 'OK',
						callback: function() {
							window.location.href = '/#!/';
						}
					}],
					onClose:  function(caption) {
						window.location.href = '/#!/';
					}
				});
			}).error(function() {
				Plugin.zebra_alert('Some error occurred while tracking your order',{
					type:'warning',
					title:'Error'
				});
			});
		};

		$timeout(function() {
			Plugin.initializePlugins();
			//Plugin.rating();
		});
	}
]);
