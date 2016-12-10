'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	reviews = require('../../app/controllers/reviews.server.controller');

module.exports = function(app) {
	// Mobiles Routes
	app.route('/reviews')
		.get(reviews.list)
		.post(reviews.create);

	app.route('/reviews/:reviewId')
		.get(reviews.ReviewByID)
		.put(reviews.update)
		.delete(reviews.delete);

	app.route('/reviews/mobile/:id')
			.get(reviews.getReviewsByMobileId);

	app.route('/reviews/user/:userId')
			.get(reviews.getReviewsByUserId);

	app.route('/reviews/users/famous')
			.get(reviews.getFamousUsers);

	// Finish by binding the article middleware
	app.param('reviewId', reviews.ReviewByID);
};
