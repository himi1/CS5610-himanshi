'use strict';

/**
 * Module dependencies.
 */
var follower = require('../../app/controllers/follower.server.controller');

module.exports = function(app) {
	// Mobiles Routes
	app.route('/follower')
		.post(follower.create);

	app.route('/follower/entry/:follower_id/:following_id')
			.get(follower.getEntry)
			.delete(follower.delete);

	app.route('/follower/user/:user_id')
			.get(follower.getFollowersByUserId);

	app.route('/follower/following/:user_id')
			.get(follower.getFollowingsByUserId);
};
