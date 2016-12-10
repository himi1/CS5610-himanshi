
var gsmArenaURL = "blackberry-phones-36";
var gsmArenaFormattedURL = "blackberry-phones-f-36-0-p";
var largestPageNumber = 3;
var mBrand = "Blackberry";
var notFoundArray = [];
var count = 0;

$.ajax({
	url: gsmArenaURL,
	success: function (data) {
		var links = $(data).find(".makers a");
		links.each(function (index) {
			var imgURL = $(this).find("img").attr('src');
			$.ajax({
				url: $(this).attr('href'),
				success: function (content) {
					getMobileData($(content),imgURL);
				},
				async: false
			});
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
						getMobileData($(content),imgURL);
					},
					async: false
				});
			});
		}
	});
}

function getMobileData($this,imgURL) {
	var brand = mBrand;
	var id = $this.find('#ttl h1').text().split(' ').join('-').toLowerCase();
	sendRequest(id,imgURL,brand,"thumb");
	sendRequest(id,$this.find("#specs-cp-pic img").attr('src'),brand,"main");

	var imageLink = $this.find(".specs-photo-main a").attr('href');

	$.ajax({
		type: "GET",
		url: imageLink,
		success: function (data) {
			downloadImage($(data),id,brand);
		},
		async: false
	});
	count ++;
	console.log(count +" phones processed");
}

function downloadImage($this,id,brand) {
	var images = $this.find("#pictures p > img");
	images.each(function(index){
		sendRequest(id,$(this).attr('src'),brand,index);
	});
}

function sendRequest(mobileId,imageURL,brand,suffix) {
	var data = {
			mobileId : mobileId,
			imageURL : imageURL,
			brand : brand,
			suffix : suffix
		};
	$.ajax({
		url : "http://localhost:3000/mobile/downloadImage",
		type : "POST",
		data : data,
		success : function(data) {
		},
		error : function(data) {
			console.log(data + "not found");
			notFoundArray.push(mobileId);
		}
	});
}

//$("#specs-cp-pic img").attr('src')
//$("#specs-cp-pic a").attr('href')
// -- send request to above
// get for $("#pictures p > img")
// get all src attribute and send query to them
