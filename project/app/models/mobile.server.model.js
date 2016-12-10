
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Mobile Schema
 */
var MobileSchema = new Schema({
	_id : String,
	name : String,
	brand : String,
	images : Number,
	gImages: Number,
	features: [Schema.Types.Mixed],
	specBrief: [Schema.Types.Mixed],
	mainFeature: Schema.Types.Mixed,
	cpu: String,
	os: String,
	ram: String,
	internal: String,
	camera: String,
	resolution: String,
	screen: String,
	createdTimestamp : {
		type : Date,
		default : Date.now
	},
	lastUpdatedTimestamp: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('Mobile', MobileSchema);
