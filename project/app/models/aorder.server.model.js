
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * AffOrder Schema
 */
var AffOrderSchema = new Schema({
	_id : {
		type: String
	},
	user_id : {
		type : String,
		ref : 'User'
	},
	mobile_id : {
		type : String,
		ref : 'Mobile'
	},
	status: {
		type: String,
		enum: ['Initiated', 'Pending', 'Approved','Cancelled'],
		default: 'Initiated'
	},
	createdTime : {
		type : Date,
		default : Date.now
	},
	LastUpdatedTime : {
		type : Date,
		default : Date.now
	},
	name: String,
	price: Number,
	cashback: Number,
	orderDate: String
});

mongoose.model('AffOrder', AffOrderSchema);
