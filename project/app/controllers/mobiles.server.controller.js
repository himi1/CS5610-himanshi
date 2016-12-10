'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
		errorHandler = require('./errors.server.controller'),
		Mobile = mongoose.model('Mobile'),
		Review = mongoose.model('Review'),
		_ = require('lodash'),
		fs = require('fs'),
		request = require('request'),
		mkdirp = require('mkdirp');

/**
 * Create a Mobile
 */
exports.create = function (req, res) {
	var Mob = new Mobile(req.body);
	Mob.save(function (err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(Mob);
		}
	});
};

/**
 * Update a Mobile
 */
exports.update = function (req, res) {
	var Mobile = req.Mobile;
	Mobile = _.extend(Mobile, req.body);

	Mobile.save(function (err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(Mobile);
		}
	});
};

/**
 * Delete a Mobile
 */
exports.delete = function (req, res, next, id) {
	Mobile.findById(id).exec(function (err, mob) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			mob.remove();
		}
	});

	/*Mobile.remove(function(err) {
	 if (err) {
	 return res.status(400).send({
	 message: errorHandler.getErrorMessage(err)
	 });
	 } else {
	 res.json(Mobile);
	 }
	 });*/
};

/**
 * List of Mobiles
 */
exports.list = function (req, res) {
	Mobile.find().limit(10).exec(function (err, Mobiles) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(Mobiles);
		}
	});
};

/**
 * Mobile by ID
 */
exports.getMobileByID = function (req, res) {
	var id = req.params.mobileId;
	Mobile.findById(id).exec(function (err, Mobile) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(Mobile);
		}
	});
};

/*exports.MobileByID = function (req, res, next, id) {
	Mobile.findById(id).exec(function (err, Mobile) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			req.Mobile = Mobile;
			next();
		}
	});
};*/

/**
 * Get list of mobiles with start of string
 * input :-
 * query : 'apple',
 * page : '2',
 * size : '10'
 */
exports.getFullListBySearch = function (req, res) {
	var query = req.body.query || '';
	var brand = req.body.brand;
	var page = parseInt(req.body.page);
	var size = 24; //parseInt(req.body.size);
	var skip = page > 0 ? ((page - 1) * size) : 0;


	var findObj = {};
	if(query && query !== '') {
		query = '\"' + query + '\"';
		findObj.$text = {$search: query};
	}
	if(brand && brand !== 'All') {
		findObj.brand = brand;
	}
	Mobile.find(findObj,
			{ score: { $meta: 'textScore' } }
	).skip(skip)
			.limit(size)
			.sort( { score: { $meta: 'textScore' } })
			//.select({ name : 1, brand : 1})
			.exec(function (err, results) {
				if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {
					for(var index in results) {
						var features = results[index].features,k;
						for(var i in features) {
							var values = features[i].values,j,str;
							if(features[i].name === 'Platform') {
								for(j in values) {
									if(values[j].key === 'CPU') {
										str = values[j].value.split(' ');
										for(k in str) {
											if(str[k].toLowerCase().indexOf('hz') !== -1){
												break;
											}
										}
										results[index]._doc.cpu = str[k-1] + ' ' + str[k];
										results[index]._doc.fullCpu = values[j].value;
										//console.log(str[k-1] + ' ' + str[k]);
									}
								}
							} else if(features[i].name === 'Memory') {
								for(j in values) {
									if(values[j].key === 'Internal') {
										 str = values[j].value.split(',');
										if(str.length === 2) {
											results[index]._doc.internal = str[0];
											results[index]._doc.ram = str[1];
										} else {
											results[index]._doc.internal = str[0];
											results[index]._doc.ram = '--';
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
										results[index]._doc.camera = str[k-1] + ' ' + str[k].substr(0,2);
									}
								}
							}
						}
						delete results[index]._doc.features;
					}
					var count = 0;
					results.forEach(function(result) {
						Review.find({mobile_id:result._id}).exec(function(err,data){
							count++;
							if(!err && data.length > 0) {
								var rating = 0;
								for(var i in data) {
									rating = rating + data[i].rating;
								}
								result._doc.avgRating = rating/data.length;
							}
							if(count === results.length) {
								res.json(results);
							}
						});
					});
				}
			});
};

exports.getTotalPageCountBySearch = function (req, res) {
	var query = req.body.query || '';
	var brand = req.body.brand;

	var findObj = {};
	if(query && query !== '') {
		query = '\'' + query + '\'';
		findObj.$text = {$search: query};
	}
	if(brand && brand !== 'All') {
		findObj.brand = brand;
	}
	Mobile.find(findObj,
			{ score: { $meta: 'textScore' } }
	).limit(500).select({ name : 1})
			.exec(function (err, results) {
				if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {
					res.json(results.length);
				}
			});
};

exports.getListBySearch = function (req, res) {
	var query = req.body.query || '';
	var brand = req.body.brand || '';
	var findObj = {};
	if(query && query !== '') {
		query = new RegExp(query, 'i');
		findObj.name = query;
	}
	if(brand && brand !== 'All') {
		findObj.brand = brand;
	}
	Mobile.find(findObj).limit(10).select({ name : 1, brand : 1})
			.exec(function (err, results) {
				if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {
					res.json(results);
				}
			});
};

var downloadImg = function(uri, filename, callback) {
	request.head(uri, function(err, res, body){
		//console.log('content-type:', res.headers['content-type']);
		//console.log('content-length:', res.headers['content-length']);
		console.log('Downloading for ' + filename);
		request(uri).pipe(fs.createWriteStream(filename, { defaultEncoding: 'base64'})).on('close', callback);
	});
};

exports.downloadImage = function(req,res) {
	var mobileId = req.body.mobileId;
	var url = req.body.imageURL;
	var brand = req.body.brand;
	var suffix = req.body.suffix;

	if(suffix.indexOf('g') === 0) {
		Mobile.findOneAndUpdate({_id:mobileId},{gImages:parseInt(suffix.slice(1))},function(err,doc) {
			if(!doc) {
				res.status(400).end(mobileId);
			}
		});
	} else if(parseInt(suffix) >= 0) {
		Mobile.findOneAndUpdate({_id:mobileId},{images:parseInt(suffix)},function(err,doc) {
			if(!doc) {
			     res.status(400).end(mobileId);
			} 
		});
	}

	var path = '/Users/himi/Downloads/phones/' + brand + '/'+mobileId;
	var imageName = path +'/' + mobileId + '-'+suffix+'.jpg';
	mkdirp(path, function(err) {
		if (err) {
			return res.status(400).send({
				message: 'Failed to create folder' + path
			});
		} else {
			downloadImg(url, imageName, function() {
				//res.end('Downloaded - ',imageName);
			});
		}
	});
	res.end('Downloaded - ',imageName);
};

exports.getFlipkartDetailByMobileId = function(req, res) {
	var id = req.params.mobileId.replace(/-/g,' ');
	var flipkartApiUrl = 'https://affiliate-api.flipkart.net/affiliate/search/json?query=' + id + '&resultCount=2';
	request({
		url: flipkartApiUrl,
		headers: {
			'Fk-Affiliate-Id': 'nikhiljai3', 
			'Fk-Affiliate-Token': '42785863026240bf8567f0276770323f'
		}
	}, function (err, response, body) {
		if(err) {
			return res.status(500).send({
				message: 'Failed to load flipkart details for' + id
			});
		}
		body = JSON.parse(body);
		var info = body.productInfoList[0].productBaseInfo.productAttributes;
		var category = body.productInfoList[0].productBaseInfo.productIdentifier.categoryPaths.categoryPath[0][0].title.replace(/>/g, ' > ');
		var data = [{
			price: info.sellingPrice.amount,
			mprice: info.maximumRetailPrice.amount,
			url: info.productUrl,
			title: info.title,
			image: info.imageUrls['100x100'],
			brand: info.productBrand,
			color: info.color,
			merchant: 'flipkart',
			category: category
		}];
		res.json(data);

	});
};
