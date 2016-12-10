'use strict';

angular.module('users').controller('UserController', ['$scope', '$http','$stateParams','$timeout','$rootScope', 'Users', 'Authentication','Plugin',
	function($scope, $http,$stateParams,$timeout,$rootScope, Users, Authentication,Plugin) {
		$scope.authentication = Authentication;
		$scope.authenticatedUser = $scope.authentication.user;
		var userId = $stateParams.userId;

		$scope.userId = userId;
		$scope.userList = []; //list of users to follow

		$scope.isFollowing = false;

		//getting user information
		if($scope.authenticatedUser._id !== userId) {
			$http.get('/users/profile/'+userId).success(function(data){
				$scope.user = data;
			}).error(function(){
				Plugin.zebra_alert('Error in getting user information',{type:'error',title:'Error !!!'});
			});
		} else {
			$scope.user = $scope.authenticatedUser;
		}

		//Showing Reviews
		$scope.reviewList = [];
		$scope.totalReviews = -1;
		$http.get('/reviews/user/' + userId).success(function(data) {
			$scope.reviewList = data;
			$scope.totalReviews = data.length;
		}).error(function(){
			Plugin.zebra_alert('Error in getting list of Reviews for User',{type:'error',title:'Error !!!'});
		});

		//Showing famous users
		$http.get('reviews/users/famous').success(function(data){
			$scope.userList = data;
		}).error(function(){
			console.error('Error in getting list of users to follow');
		});

		//checking if user is following or not
		if($scope.authenticatedUser) {
			$http.get('/follower/entry/'+ $scope.authenticatedUser._id +'/' + userId).success(function(data){
				if(data && data !== 'null') {
					$scope.isFollowing = true;
				}
			}).error(function(){
				console.error('Error in getting list of users to follow');
			});
		}

		//Getting followers of user
		$scope.followers = [];
		$http.get('/follower/following/' + userId).success(function(data){
			$scope.followers = data;
		}).error(function(){
			console.error('Error in getting list of followers');
		});

		//Getting followings of user
		$scope.followings = [];
		$http.get('/follower/user/' + userId).success(function(data){
			$scope.followings = data;
		}).error(function(){
			console.error('Error in getting list of followings');
		});


		$scope.followUser = function(userId,name,onlyFollow) {
			if(!$scope.authenticatedUser) {
				authenticationRequired();
			} else {
				if($scope.isFollowing && !onlyFollow) {
					$http.delete('/follower/entry/'+ $scope.authenticatedUser._id +'/' + userId).success(function(){
						$scope.isFollowing = false;
						Plugin.zebra_alert('You have successfully unfollowed '+name,{type:'confirmation',title:'Congratulations !!'});
					}).error(function(){
						Plugin.zebra_alert('Some internal error occured, Please try again !!',{
							type:'warning',
							title:'Error'
						});
					});
				} else {
					$http.post('/follower',{
						follower_id : $scope.authenticatedUser._id,
						following_id : userId
					}).success(function(data) {
						$scope.isFollowing = true;
						Plugin.zebra_alert(data + name,{type:'confirmation',title:'Congratulations !!'});
					}).error(function() {
						Plugin.zebra_alert('Some internal error occured, Please try again !!',{
							type:'warning',
							title:'Error'
						});
					});
				}

			}
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
			//Plugin.rating();
		});
	}
]);
