$(document).ready(function() {
	var options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
	};

	var success = function(pos) {
		var crd = pos.coords;

		$('.js-current-position').text(crd.latitude + ', ' + crd.longitude);
	};

	var error = function(err) {
		console.warn('ERROR(' + err.code + '): ' + err.message);
	};


	navigator.geolocation.getCurrentPosition(success, error, options);
});