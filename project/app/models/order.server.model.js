
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Order Schema
 */
var OrderSchema = new Schema({
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
	mobileName: String,
	displayName : String,
	status: {
		type: String,
		enum: ['pending','success','cancelled'],
		default: 'pending'
	},
	address : {
		street : String,
		city : String,
		state : String,
		country : String,
		zip : String
	},
	quantity : {
		type: Number
	},
	amount: {
		type: Number
	},
	bitcoin: {
		type: Number
	},
	toBCA: String,
	fromBCA: String,
	createdTime : {
		type : Date,
		default : Date.now
	},
	LastUpdatedTime : {
		type : Date,
		default : Date.now
	}
});

mongoose.model('Order', OrderSchema);
