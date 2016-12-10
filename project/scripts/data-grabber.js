
var gsmArenaURL = "apple-phones-48.php",
	gsmArenaFormattedURL = "htc-phones-f-45-0-p",
	largestPageNumber = 1,
	mbrand = "Apple",
	duplicateArray = [],
	notFoundArray = [],
	count = 0;

var logging = {};
$.ajax({
	url: gsmArenaURL,
	success: function (data) {
		var links = $(data).find(".makers a");
		links.each(function (index) {
			//if(index === 35) {
				var imgURL = $(this).find("img").attr('src');
				console.log('Sending Request for ', $(this).attr('href'));
				$.ajax({
					url: $(this).attr('href'),
					success: function (content) {
						getData($(content), imgURL);
					},
					async: false
				});
			//}
		});
	}
});

for(var i=2;i<=largestPageNumber;i++) {
	$.ajax({
		url: gsmArenaFormattedURL + i + ".php",
		success: function (data) {
			var links = $(data).find(".makers a");
			links.each(function (index) {
				var imgURL = $(this).find("img").attr('src');
				$.ajax({
					url: $(this).attr('href'),
					success: function (content) {
						getData($(content),imgURL);
					},
					async: false
				});
			});
		}
	});
}

function getData($this, imgURL) {
	var obj = {
		features: [],
		specBrief : [],
		mainFeature: {}
	};

	//Adding brief specs
	$this.find('.specs-brief-accent').each(function () {
		obj.specBrief.push($(this).text());
	});

	//Adding main features
	$this.find('.help.accented').each(function () {
		var key = $(this).attr('class').split('-')[1];
		obj.mainFeature[key] = {};
		var high2 = $(this).find('strong span').text();
		var high = $(this).find('strong').text().replace(high2, '').trim() + ' ' + high2;
		var low = $(this).text().replace($(this).find('strong').text(), '').trim();
		obj.mainFeature[key]['high'] = high;
		obj.mainFeature[key]['low'] = low;
	});

	// Adding all features list from table
	var list = $this.find("#specs-list");

	obj.name = $this.find('.specs-phone-name-title').text();
	obj.brand = mbrand;
	obj._id = obj.name.split(' ').join('-').toLowerCase();

	console.log('Got data for ', obj.name);

	var featuresTable = list.find("table");

	featuresTable.each(function (index) {
		var feature = [];
		var featureName = $(this).find("th").text();

		var list = $(this).find("tr");

		list.each(function (index) {
			var data = {};
			data["key"] = $(this).find(".ttl").text();
			data["value"] = $(this).find(".nfo").text();
			feature.push(data);
		});
		obj.features.push({
			name: featureName,
			values: feature
		})
	});

	//Adding required features
	var features = obj.features,j;
	for(var i in features) {
		var values = features[i].values;
		if(features[i].name === 'Platform') {
			for(j in values) {
				if(values[j].key === 'CPU') {
					obj.cpu = values[j].value;
				} else if(values[j].key === 'OS') {
					obj.os = values[j].value;
				}
			}
		} else if(features[i].name === 'Memory') {
			for(j in values) {
				if(values[j].key === 'Internal') {
					var str = values[j].value.split(',');
					if(str.length === 2) {
						obj.internal = str[0];
						obj.ram = str[1];
					} else {
						obj.internal = str[0];
						obj.ram = '--';
					}
				}
			}
		} else if(features[i].name === 'Camera') {
			for(j in values) {
				if(values[j].key === 'Primary') {
					obj.camera = values[j].value;
				}
			}
		} else if(features[i].name === 'Display') {
			for( j in values) {
				if(values[j].key === 'Resolution') {
					obj.resolution = values[j].value;
				} else if(values[j].key === 'Size') {
					obj.screen = values[j].value;
				}
			}
		}
	}
	logging[obj._id] = {};
	logging[obj._id].i = 0;
	logging[obj._id].gI = 0;
	$.ajax({
		type: "POST",
		url: "http://localhost:3000/mobiles",
		data: obj,
		success: function (data) {
			console.log('Saving of ',obj.name,'success');
			logging[obj._id].success = 1;
		},
		error : function(data) {
			duplicateArray.push({_id:obj._id,name:obj.name});
		},
		async: false
	});

	// Getting thumb and main image
	sendRequest(obj._id, imgURL, mbrand, "thumb");
	sendRequest(obj._id, $this.find(".specs-photo-main img").attr('src'), mbrand, "main");

	// Getting gallery images
	var imageLink = $this.find(".specs-photo-main a").attr('href');

	$.ajax({
		type: "GET",
		url: imageLink,
		success: function (data) {
			downloadImage($(data), obj._id, mbrand);
		},
		async: false
	});

	count ++;
	console.log(count +" phones processed");
	//return obj;
}

function downloadImage ($this,id,brand) {
	var images = $this.find("#pictures-list p > img");
	images.each(function(index){
		sendRequest(id, $(this).attr('src'), brand, index + 1);
	});
	logging[id].i += images.length;

	$this.find('#gallery p a img').each(function (index) {
		var imgUrl = $(this).attr('src'), wordBreak;
		if(imgUrl.indexOf('/gal/') >= 0) {
			wordBreak = '/gal/';
		} else if(imgUrl.indexOf('/new/') >= 0) {
			wordBreak = '/new/';
		} else {
			return;
		}
		imgUrl = imgUrl.replace(imgUrl.split(wordBreak)[1].split('/')[0] + '/', '');
		sendRequest(id, imgUrl, brand, 'g' + (index + 1));
	});
	logging[id].gI += $this.find('#gallery p a').length;
}

function sendRequest(mobileId,imageURL,brand,suffix) {
	var data = {
		mobileId : mobileId,
		imageURL : imageURL,
		brand : brand,
		suffix : suffix
	};
	console.log('Sending image request ', data);
	$.ajax({
		url : "http://localhost:3000/mobile/downloadImage",
		type : "POST",
		data : data,
		success : function(data) {
		},
		error : function(data) {
			console.log(data,"not found");
			notFoundArray.push(mobileId);
		},
		async: false
	});
}