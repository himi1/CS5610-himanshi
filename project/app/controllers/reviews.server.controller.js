'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Review = mongoose.model('Review'),
	User = mongoose.model('User'),
	_ = require('lodash');

/**
 * Create a Review
 */
exports.create = function(req, res) {
	var Rev = new Review(req.body);
	Review.findOne({
		user_id : req.body.user_id,
		mobile_id : req.body.mobile_id
	}).exec(function(err, data) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		if(data) {
			data.rating = req.body.rating;
			data.review_text = req.body.review_text;
			data.LastUpdatedTime = Date.now();
			Rev = data;
		}
		Rev.save(function(err) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.json(Rev);
			}
		});
	});

};

/**
 * Update a Review
 */
exports.update = function(req, res) {
	var Review = req.Review;

	Review = _.extend(Review, req.body);

	Review.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(Review);
		}
	});
};

/**
 * Delete an Review
 */
exports.delete = function(req, res, next, id) {
	Review.findById(id).exec(function(err, Rev) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			Rev.remove();
		}
	});
};

/**
 * List of Reviews
 */
exports.list = function(req, res) {
	Review.find().exec(function(err, Reviews) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(Reviews);
		}
	});
};

exports.getReviewsByMobileId = function(req,res) {
	var mobileId = req.params.id;
	Review.find({mobile_id : mobileId}).populate('user_id','profilePicture').exec(function(err,Reviews){
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(Reviews);
		}
	});
};

exports.getReviewsByUserId = function(req,res) {
	var userId = req.params.userId;
	Review.find({user_id : userId}).populate('mobile_id','name brand').exec(function(err,Reviews){
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(Reviews);
		}
	});
};

/**
 * Get Highest review users
 */
exports.getFamousUsers = function (req, res) {
	Review.aggregate()
			.group({_id: '$user_id', numReviews: {$sum: 1}})
			.sort('-numReviews')
			.limit(5)
			.exec(function (err, reviews) {
				if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {
					var length = reviews.length;
					var count = 0;
					reviews.forEach(function(review){
						User.findById(review._id).select('displayName profilePicture').exec(function(err,user){
							if(err) {
								return;
							}
							review.user = user;
							count++;
							if(count === length) {
								res.json(reviews);
							}
						});
					});
				}
			});
};

/**
 * Review by ID
 */
exports.ReviewByID = function(req, res, next, id) {
	Review.findById(id).exec(function(err, Review) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(Review);
		}
	});
};
