
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Review Schema
 */
var ReviewSchema = new Schema({
	user_id : {
		type : String,
		ref : 'User'
	},
	mobile_id : {
		type : String,
		ref : 'Mobile'
	},
	name : String,
	rating : Number,  //0-10
	review_text : String,
	createdTime : {
		type : Date,
		default : Date.now
	},
	LastUpdatedTime : {
		type : Date,
		default : Date.now
	}
});

mongoose.model('Review', ReviewSchema);
