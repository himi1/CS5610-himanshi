'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	AffOrder = mongoose.model('AffOrder'),
	User = mongoose.model('User'),
	_ = require('lodash');

/**
 * Create a AffOrder
 */
exports.create = function(req, res) {
	var affOrder = new AffOrder(req.body);
	affOrder.cashback = affOrder.price / 100;
	affOrder.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(affOrder);
		}
	});
};

/**
 * Update a AffOrder
 */
exports.update = function(req, res) {
	var AffOrder = req.AffOrder;

	AffOrder = _.extend(AffOrder, req.body);

	AffOrder.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(AffOrder);
		}
	});
};

/**
 * Delete an AffOrder
 */
exports.delete = function(req, res, next, id) {
	AffOrder.findById(id).exec(function(err, Rev) {
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
 * List of AffOrders
 */
exports.list = function(req, res) {
	AffOrder.find().exec(function(err, AffOrders) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(AffOrders);
		}
	});
};

exports.getAffOrdersByMobileId = function(req,res) {
	var mobileId = req.params.id;
	AffOrder.find({mobile_id : mobileId}).populate('user_id','profilePicture').exec(function(err,AffOrders){
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(AffOrders);
		}
	});
};

exports.getAffOrdersByUserId = function(req, res) {
	var userId = req.params.userId;
	AffOrder.find({user_id : userId}).exec(function(err,affOrders){
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(affOrders);
		}
	});
};

/**
 * AffOrder by ID
 */
exports.AffOrderByID = function(req, res, next, id) {
	AffOrder.findById(id).exec(function(err, AffOrder) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(AffOrder);
		}
	});
};

exports.dummyFunction = function() {
	var sampleData = {
		'orderList': [
			{
				'price': 54800,
				'category': 'books',
				'title': 'Apple Iphone 6',
				'productId': '9780751541397',
				'quantity': 1,
				'sales': {
					'amount': 54800,
					'currency': 'INR'
				},
				'status': 'tentative',
				'affiliateOrderItemId': '12345',
				'orderDate': '02-09-2014',
				'commissionRate': 2,
				'tentativeCommission': {
					'amount': 600,
					'currency': 'INR'
				},
				'affExtParam1': '1437849446532',
				'affExtParam2': '',
				'salesChannel': 'WEBSITE',
				'customerType': 'NEW'
			},
			{
				'price': 67000,
				'category': 'books',
				'title': 'Samsung Galaxy S4',
				'productId': '9780751541397',
				'quantity': 1,
				'sales': {
					'amount': 67000,
					'currency': 'INR'
				},
				'status': 'approved',
				'affiliateOrderItemId': '12345',
				'orderDate': '02-09-2014',
				'commissionRate': 2,
				'tentativeCommission': {
					'amount': 324,
					'currency': 'INR'
				},
				'affExtParam1': 'test',
				'affExtParam2': '',
				'salesChannel': 'WEBSITE',
				'customerType': 'NEW'
			},
			{
				'price': 7000,
				'category': 'books',
				'title': 'Yu Yuphoria',
				'productId': '9780751541397',
				'quantity': 1,
				'sales': {
					'amount': 7000,
					'currency': 'INR'
				},
				'status': 'cancelled',
				'affiliateOrderItemId': '12345',
				'orderDate': '02-09-2014',
				'commissionRate': 2,
				'tentativeCommission': {
					'amount': 36,
					'currency': 'INR'
				},
				'affExtParam1': '1437849446534',
				'affExtParam2': '',
				'salesChannel': 'WEBSITE',
				'customerType': 'NEW'
			}
		],
		'previous': '',
		'next': '',
		'first': 'https://affiliate-api.flipkart.net/affiliate/report/orders/detail/json?startDate=2014-09-01&endDate=2014-10-02&status=cancelled&offset=0',
		'last': 'https://affiliate-api.flipkart.net/affiliate/report/orders/detail/json?startDate=2014-09-01&endDate=2014-10-02&status=cancelled&offset=0'
	};
	var returnData = [],item,data;
	var checkForAffiliate = function(affOrders,data) {
		return true;
		for(var i = 0;i<affOrders.length;i++) {
			if(affOrders[i]._id === data.affExtParam1) {
				return true;
			}
		}
		return false;
	};
	for(var i=0;i<sampleData.orderList.length;i++) {
		item = {};
		data = sampleData.orderList[i];
		if(checkForAffiliate(affOrders,data)) {
			item.name = data.title;
			item.price = data.sales.amount;
			item.cashback = data.tentativeCommission.amount / 2;
			item.orderDate = data.orderDate;
			item.status = data.status;
			returnData.push(item);
			console.log('item is:',item);
		}
	}
	res.json(returnData);
};