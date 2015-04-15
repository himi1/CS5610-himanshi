$(function () {

    var autocomplete;
    var geocoder;
    var input = document.getElementById('location');
    var options = {
        componentRestrictions: { 'country': 'us' },
        types: ['(regions)'] 
    };

    autocomplete = new google.maps.places.Autocomplete(input, options);

    $('#go').click(function () {
        var location = autocomplete.getPlace();
        geocoder = new google.maps.Geocoder();
        lat = location['geometry']['location']['k'];
        lng = location['geometry']['location']['D'];
        var latlng = new google.maps.LatLng(lat, lng);
        geocoder.geocode({ 'latLng': latlng }, function (results) {
            for (i = 0; i < results.length; i++) {
                for (var j = 0; j < results[i].address_components.length; j++) {
                    for (var k = 0; k < results[i].address_components[j].types.length; k++) {
                        if (results[i].address_components[j].types[k] == "postal_code") {
                            zipcode = results[i].address_components[j].short_name;
                            $('span.zip').html(zipcode);
                        }
                    }
                }
            }
        });

    });


});