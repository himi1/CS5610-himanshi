
'use strict';
var $ = window.$;
angular.module('mobilelist').controller('MobileListController', ['$scope','$timeout','$location','$http','$stateParams','Plugin','Mobile','FullSearch','Authentication','$rootScope',
	function($scope, $timeout,$location,$http,$stateParams, Plugin,Mobile,FullSearch,Authentication,$rootScope) {
		$scope.authentication = Authentication;
		var path = $location.path();
		if(path.indexOf('/list') !== -1) {
			var query = $stateParams.query || '';
			var page = $stateParams.page || '1';
			var brand = $stateParams.brand || 'All';
			$scope.mobileList = [];
			$scope.totalPages = -1;
			$scope.totalResults = 0;
			$scope.query = query;
			$scope.page = parseInt(page);
			$scope.brand = brand;
			FullSearch.fetch({
				query : query,
				page : page,
				brand : brand
			},function(data){
				$scope.mobileList = data;
				$timeout(function(){
					Plugin.rating();
				});
			});
			$http.post('/mobile/fullsearchcount',{query:query, brand:brand})
					.success(function(data){
						$scope.totalPages = Math.ceil(data/24);
						$scope.totalResults = parseInt(data);
						$timeout(Plugin.resizeBox());
					})
					.error(function(){
						console.error('Error in getting search count');
					});
			$scope.getPageNumber = function(num) {
				return new Array(num);
			};
		} else {
			var mobileId = $stateParams.id;
			$scope.mobileDetails = {};
			$scope.reviewList = [];
			$scope.products = [];
			$scope.success = false;
			$scope.successReview = false;
			$scope.uniqueId = new Date().valueOf();
			Mobile.get({mobileId:mobileId || 'apple-iphone-6'},function(data){
				$scope.mobileDetails = data;
				$scope.success= true;
				$timeout(function() {
					Plugin.initializePlugins();
					Plugin.drawOwlCarousel(false);
				});
			});
			$scope.submitReview = function(reviewText) {
				console.log(reviewText);
				var reviewToSend = {
					user_id : $scope.authentication.user._id,
					name : $scope.authentication.user.displayName,
					mobile_id : mobileId,
					rating : $('.user-rating .star-rating i.active').length,
					review_text : reviewText
				};
				$http.post('/reviews',reviewToSend).success(function(data) {
					$scope.successReview = true;
					Plugin.zebra_alert('Your Review has been successfully posted.',{
						type:'confirmation',
						title:'Review posted'
					});
				}).error(function() {
					Plugin.zebra_alert('Review posting failed due to some error.', {
						type:'warning',
						title:'Error'
					});
				});
			};

			//Getting reviews by mobile id
			$http.get('/reviews/mobile/' + mobileId).success(function(data) {
				$scope.reviewList = data;
				$scope.rating = 0;
				for(var i in data) {
					$scope.rating += data[i].rating;
				}
				$scope.rating = Math.round($scope.rating/data.length);
				$timeout(function(){
					Plugin.rating();
				});
			});

			//Getting users by mobile id
			$scope.favouritesUsers = [];
			$http.get('/favourites/mobile/' + mobileId).success(function(data) {
				$scope.favouritesUsers = data;
			}).error(function(){
				console.error('Failed to get list of users added this phone to favourites');
			});

			$http.get('/mobile/affiliate/' + mobileId).success(function (data) {
				$scope.products = data;
			}).error(function() {
				console.error('Failed to get details from flipkart server');
			});

			$scope.getImages = function(num) {
				return new Array(num);
			};
			$scope.buyNow = function(product) {
				if(!$scope.authentication.user) {
					return;
				}
				$http.post('/affOrders', {
					_id: $scope.uniqueId,
					user_id: $scope.authentication.user._id,
					mobile_id: $scope.mobileDetails._id,
					name: product.title,
					price: product.price
				}).success(function() {
					$scope.uniqueId = new Date().valueOf();
				}).error(function() {
					Plugin.zebra_alert('Some error occurred while tracking your order', {
						type: 'warning',
						title: 'Error'
					});
				});
			};
		}
		$scope.addToFavourite = function($event,id,name) {
			if(!$scope.authentication.user) {
				authenticationRequired();
			} else {
				$http.post('/favourites',{
					user_id : $scope.authentication.user._id,
					mobile_id : id
				}).success(function(data) {
					Plugin.zebra_alert(name + data,{type:'confirmation',title:'Success'});
				}).error(function() {
					Plugin.zebra_alert('Review posting failed due to some error.',{
						type:'warning',
						title:'Error'
					});
				});

			}
			$event.stopPropagation();
			$event.preventDefault();
		};
		$scope.writeReview = function() {
			authenticationRequired();
		};
		function authenticationRequired() {
			Plugin.zebra_alert('Please sign-in first',{
				type:'warning',
				title:'Authentication Required',
				buttons:  [{
					caption: 'Sign-in',
					callback: function() {
						$scope.$apply(function(){
							$rootScope.$broadcast('show-popup',true);
						});
					}
                }, 'Later']
			});
		}
		$timeout(function() {
			Plugin.initializePlugins();
		});
	}
]);
