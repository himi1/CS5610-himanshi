
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Follower Schema
 */
var FollowerSchema = new Schema({
	follower_id : {
		type: String,
		ref : 'User'
	},
	following_id : {
		type : String,
		ref : 'User'
	},
	createdTime : {
		type : Date,
		default : Date.now
	},
	LastUpdatedTime : {
		type : Date,
		default : Date.now
	}
});

mongoose.model('Follower', FollowerSchema);
