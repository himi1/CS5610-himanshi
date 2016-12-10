'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	mobiles = require('../../app/controllers/mobiles.server.controller');

module.exports = function(app) {
	// Mobiles Routes
	app.route('/mobiles')
		.get(mobiles.list)
		.post(mobiles.create);

	app.route('/mobiles/:mobileId')
		.get(mobiles.getMobileByID)
		.put(mobiles.update)
		.delete(mobiles.delete);

	app.route('/mobiles/search')
			.post(mobiles.getListBySearch);

	app.route('/mobiles/fullsearch')
			.post(mobiles.getFullListBySearch);

	app.route('/mobile/fullsearchcount')
			.post(mobiles.getTotalPageCountBySearch);

	app.route('/mobile/downloadImage')
			.post(mobiles.downloadImage);

	app.route('/mobile/affiliate/:mobileId/')
		.get(mobiles.getFlipkartDetailByMobileId);

	// Finish by binding the article middleware
	//app.param('mobileId', mobiles.MobileByID);
};
