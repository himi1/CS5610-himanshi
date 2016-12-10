'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Favourite = mongoose.model('Favourite'),
		Review = mongoose.model('Review'),
	_ = require('lodash');

/**
 * Create a Favourite
 */
exports.create = function(req, res) {
	var Fav = new Favourite(req.body);
	Favourite.find({mobile_id:req.body.mobile_id,user_id:req.body.user_id}).exec(function(err, Favourite) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			if(Favourite.length <= 0) {
				Fav.save(function(err) {
					if (err) {
						return res.status(400).send({
							message: errorHandler.getErrorMessage(err)
						});
					} else {
						res.end(' successfully added to your favourite list');
					}
				});
			} else {
				res.end(' is already is in your favourite list.');
			}
		}
	});
};

exports.getFavouritesByUserId = function(req, res) {
	var userId = req.params.userId,k,j;
	Favourite.find({user_id:userId}).populate('mobile_id').exec(function(err, Favourites) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			for(var index in Favourites) {
				var features = Favourites[index].mobile_id._doc.features,j,str,k;
				for(var i in features) {
					var values = features[i].values;
					if(features[i].name === 'Platform') {
						for( j in values) {
							if(values[j].key === 'CPU') {
								 str = values[j].value.split(' ');
								for( k in str) {
									if(str[k].toLowerCase().indexOf('hz') !== -1){
										break;
									}
								}
								Favourites[index]._doc.mobile_id._doc.cpu = str[k-1] + ' ' + str[k];
								Favourites[index]._doc.mobile_id._doc.fullCpu = values[j].value;
								//console.log(str[k-1] + ' ' + str[k]);
							}
						}
					} else if(features[i].name === 'Memory') {
						for( j in values) {
							if(values[j].key === 'Internal') {
								 str = values[j].value.split(',');
								if(str.length === 2) {
									Favourites[index]._doc.mobile_id._doc.internal = str[0];
									Favourites[index]._doc.mobile_id._doc.ram = str[1];
								} else {
									Favourites[index]._doc.mobile_id._doc.internal = str[0];
									Favourites[index]._doc.mobile_id._doc.ram = '--';
								}
								//console.log(str[0]);
								//console.log(str[1]);
							}
						}
					} else if(features[i].name === 'Camera') {
						for( j in values) {
							if(values[j].key === 'Primary') {
								 str = values[j].value.split(' ');
								for( k in str) {
									if(str[k].toLowerCase().indexOf('mp') !== -1){
										break;
									}
								}
								Favourites[index]._doc.mobile_id._doc.camera = str[k-1] + ' ' + str[k].substr(0,2);
							}
						}
					}
				}
				delete Favourites[index]._doc.mobile_id._doc.features;
			}
			var count = 0;
			if(Favourites.length === 0) {
				res.json(Favourites);
				return;
			}
			Favourites.forEach(function(result) {
				Review.find({mobile_id:result.mobile_id._id}).exec(function(err,data){
					count++;
					if(!err && data.length > 0) {
						var rating = 0;
						for(var i in data) {
							rating = rating + data[i].rating;
						}
						result._doc.mobile_id._doc.avgRating = rating/data.length;
					}
					if(count === Favourites.length) {
						res.json(Favourites);
					}
				});
			});
			//res.json(Favourites);
		}
	});
};

exports.getFavouritesByMobileIdAndUserId = function(req, res) {
	var mobileId = req.params.mobileId;
	var userId = req.params.userId;
	Favourite.find({mobile_id:mobileId,user_id:userId}).exec(function(err, Favourite) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(Favourite);
		}
	});
};

/**
 * Delete an Favourite
 */
exports.delete = function(req, res) {
	var id = req.params.id;
	Favourite.findOneAndRemove({_id:id}).exec(function(err, Fav) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.status(200).end(' has been successfully deleted from favourites');
		}
	});
};

exports.getFavouritesByMobileId = function(req, res) {
	var mobileId = req.params.mobileId;
	Favourite.find({mobile_id:mobileId})
	.populate('user_id','displayName profilePicture address')
	.exec(function(err, Favourites) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(Favourites);
		}
	});
};


