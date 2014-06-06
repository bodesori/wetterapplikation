var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;

  /*console.log('Your current position is:');
  console.log('Latitude : ' + crd.latitude);
  console.log('Longitude: ' + crd.longitude);
  console.log('More or less ' + crd.accuracy + ' meters.');*/

  $('.js-lat').text(crd.latitude);
  $('.js-long').text(crd.longitude);
  $('.js-acc').text(crd.accuracy + ' m');

  $.ajax({
  	url: 'https://api.forecast.io/forecast/08fe7a18b9273c9859e14b99ec1fe912/' + crd.latitude + ',' + crd.longitude,
  	data: {
  		units: 'si'
  	},
  	dataType: 'jsonp',
  	success: function(data) {
  		console.log(data);
  		$('.js-temp').text(data.currently.temperature + '°C');
  		$('.js-wspeed').text(data.currently.windSpeed + ' m pro Sekunde');
  	}
  });

  $.ajax({
  	url: 'https://maps.googleapis.com/maps/api/geocode/json',
  	data: {
  		latlng: crd.latitude + ',' + crd.longitude,
  		sonsor: true
  	},
  	success: function(data) {
  		console.log(data);
  		$('.js-address').text(data.results[0].formatted_address);
  	}
  });

  // Umgekehrte Geocoding
  $.ajax ({
    url: 'http://maps.googleapis.com/maps/api/geocode/json',
    data: {
      address: '1600+Amphitheatre+Parkway,+Mountain+View,+CA',
      sensor: true
    },
    success: function(data) {
      console.log(data);
    }
  });

};

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};

navigator.geolocation.getCurrentPosition(success, error, options);


