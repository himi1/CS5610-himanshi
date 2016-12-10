/**
 * Created by Neha on 18-04-2015.
 */
'use strict';
angular.module('core').factory('SearchMobile', ['$resource',
	function ($resource) {
		return $resource('/mobiles/search', {},{
			fetch: {
				method: 'POST', // this method issues a POST request
				isArray : true
			}
		});
	}]);
