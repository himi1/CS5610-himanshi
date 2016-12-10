'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	request = require('request'),
	errorHandler = require('./errors.server.controller'),
	Order = mongoose.model('Order'),
	Mobile = mongoose.model('Mobile'),
	User = mongoose.model('User'),
	_ = require('lodash');


function makeRequest(url, callback) {
	request(url, function(error, response, body) {
		if (!error) {
			var data;
			try {
				data = JSON.parse(body);
			} catch (err) {
				data = { error: err };
			} finally {
				if (!data.error) {
					callback(null, data);
				} else {
					callback('err: ' + data.error);
				}
			}
		} else {
			callback(error);
		}
	});
}
/**
 * Create a Order
 */
exports.create = function(req, res) {
	var order = req.body;
	order._id = 'OD' + new Date().valueOf();
	Mobile.findById(order.mobile_id).exec(function(err,Mobile){
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		order.amount = Mobile.price * order.quantity;
		order.mobileName = Mobile.name;
		makeRequest('https://bitpay.com/rates/INR',function(err,data) {
			order.bitcoin = order.amount / data.data.rate;
			var urlToBitcoinApi = 'https://blockchain.info/api/receive?method=create&address=' +
					'1EPT6nqqrhGg5WYmcqmkp7Yn6D5WskVeSP' +
					'&callback=' +
					'http://www.gronicalappstudios.com?oid=' +
					order._id;
			makeRequest(urlToBitcoinApi,function(err,data) {
				if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				}
				var result = {
					id: order._id,
					amount: order.bitcoin,
					address: data.input_address
				};
				order.toBCA = data.input_address;
				order.fromBCA = data.destination;
				var dbData = new Order(order);
				dbData.save(function(err){
					if (err) {
						return res.status(400).send({
							message: errorHandler.getErrorMessage(err)
						});
					}
					res.json(result);
				});
			});
		});
	});
};

/**
 * Update a Order
 */
exports.update = function(req, res) {
	var Order = req.Order;

	Order = _.extend(Order, req.body);

	Order.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(Order);
		}
	});
};

/**
 * Delete an Order
 */
exports.delete = function(req, res, next, id) {
	Order.findById(id).exec(function(err, Rev) {
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
 * List of Orders
 */
exports.list = function(req, res) {
	Order.find().exec(function(err, Orders) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(Orders);
		}
	});
};

exports.getOrdersByMobileId = function(req,res) {
	var mobileId = req.params.id;
	Order.find({mobile_id : mobileId}).populate('user_id','profilePicture').exec(function(err,Orders){
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(Orders);
		}
	});
};

exports.getOrdersByUserId = function(req,res) {
	var userId = req.params.userId;
	Order.find({user_id : userId}).exec(function(err,orders){
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(orders);
		}
	});
};

/**
 * Order by ID
 */
exports.OrderByID = function(req, res, next, id) {
	Order.findById(id).exec(function(err, Order) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(Order);
		}
	});
};
