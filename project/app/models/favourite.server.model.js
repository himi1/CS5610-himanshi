
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Favourite Schema
 */
var FavouriteSchema = new Schema({
	user_id : {
		type : String,
		ref : 'User'
	},
	mobile_id : { type: String, ref : 'Mobile'},
	createdTime : {
		type : Date,
		default : Date.now
	}
});

mongoose.model('Favourite', FavouriteSchema);
