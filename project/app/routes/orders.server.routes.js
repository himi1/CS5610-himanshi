'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	orders = require('../../app/controllers/orders.server.controller');

module.exports = function(app) {
	// Mobiles Routes
	app.route('/orders')
		.get(orders.list)
		.post(orders.create);

	app.route('/orders/:orderId')
		.get(orders.OrderByID)
		.put(orders.update)
		.delete(orders.delete);

	app.route('/orders/mobile/:id')
			.get(orders.getOrdersByMobileId);

	app.route('/orders/user/:userId')
			.get(orders.getOrdersByUserId);

	// Finish by binding the article middleware
	app.param('affId', orders.OrderByID);
};
