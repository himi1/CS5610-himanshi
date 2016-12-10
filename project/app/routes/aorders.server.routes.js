'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	affOrders = require('../../app/controllers/aorders.server.controller');

module.exports = function(app) {
	// Mobiles Routes
	app.route('/affOrders')
		.get(affOrders.list)
		.post(affOrders.create);

	app.route('/affOrders/:affId')
		.get(affOrders.AffOrderByID)
		.put(affOrders.update)
		.delete(affOrders.delete);

	app.route('/affOrders/mobile/:id')
			.get(affOrders.getAffOrdersByMobileId);

	app.route('/affOrders/user/:userId')
			.get(affOrders.getAffOrdersByUserId);

	// Finish by binding the article middleware
	app.param('affId', affOrders.AffOrderByID);
};
