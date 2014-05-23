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
  	url: 'https://api.forecast.io/forecast/08fe7a18b9273c9859e14b99ec1fe912/37.8267,-122.423',
  	jsonp: 'callback',
  	success: function(data) {
  		console.log(data);
  	}
  });
};

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};

navigator.geolocation.getCurrentPosition(success, error, options);

