'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Follower = mongoose.model('Follower'),
	_ = require('lodash');

/**
 * Create a Follower
 */
exports.create = function(req, res) {
	var FollowerData = new Follower(req.body);
	Follower.findOne({
		follower_id : req.body.follower_id,
		following_id : req.body.following_id
	}).exec(function(err, data) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		if(data) {
			res.end('You are already following ');
		} else {
			FollowerData.save(function(err) {
				if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {
					res.end('You are now following ');
				}
			});
		}
	});
};

/**
 * Delete an Follower
 */
exports.delete = function(req, res) {
	var follower_id = req.params.follower_id;
	var following_id = req.params.following_id;
	Follower.find({
		follower_id : follower_id,
		following_id : following_id
	}).exec(function(err, data) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			data[0].remove();
			res.json(data);
		}
	});
};

/**
 * Get single entry using follower_id and following_id
 * @param req
 * @param res
 */

exports.getEntry = function(req, res) {
	var followerId = req.params.follower_id;
	var followingId = req.params.following_id;
	Follower.findOne({
		follower_id: followerId,
		following_id: followingId
	}).exec(function (err, data) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(data);
		}
	});
};

/**
 * List of Followers
 */
exports.getFollowersByUserId = function(req, res) {
	var userId = req.params.user_id;
	Follower.find({
		follower_id : userId
	}).select('following_id -_id')
	.populate('following_id','displayName profilePicture address')
	.exec(function(err, Followers) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(Followers);
		}
	});
};

exports.getFollowingsByUserId = function(req,res) {
	var userId = req.params.user_id;
	Follower.find({
		following_id: userId
	}).select('follower_id -_id')
	.populate('follower_id','displayName profilePicture address')
	.exec(function (err, Followers) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(Followers);
		}
	});
};
