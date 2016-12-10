'use strict';

// Setting up route
angular.module('mobilelist').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// List state routing
		$stateProvider.
		state('listMobiles', {
			url: '/list/:brand/:query/:page',
			templateUrl: 'modules/mobilelist/views/list.client.view.html'
		}).
		state('detailMobile', {
			url: '/detail/:id',
			templateUrl: 'modules/mobilelist/views/detail.client.view.html'
		}).
		state('favourites', {
			url: '/favourites',
			templateUrl: 'modules/mobilelist/views/favourites.client.view.html'
		}).
		state('orders', {
			url: '/orders',
			templateUrl: 'modules/mobilelist/views/orders.client.view.html'
		}).state('payment', {
			url: '/payment/:mobileId',
			templateUrl: 'modules/mobilelist/views/payment.client.view.html'
		});
	}
]);
