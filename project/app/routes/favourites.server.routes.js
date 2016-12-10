'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	favourites = require('../../app/controllers/favourites.server.controller');

module.exports = function(app) {
	// Mobiles Routes
	app.route('/favourites')
		.post(favourites.create);

	app.route('/favourites/:id')
		.delete(favourites.delete);

	app.route('/favourites/user/:userId')
			.get(favourites.getFavouritesByUserId);

	app.route('/favourites/mobile/:mobileId')
			.get(favourites.getFavouritesByMobileId);

	app.route('/favourites/mobile/:mobileId/user/:userId')
			.get(favourites.getFavouritesByMobileIdAndUserId);
};
