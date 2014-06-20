$(document).ready(function() {
	var options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
	};

	// Default Sprache einstellen
	if (localStorage.getItem('language') === null) {
		localStorage.setItem('language', 'de');
	}

	// Default position setzen
	if (localStorage.getItem('position') === null) {
		localStorage.setItem('position', null);
	}

	var getAddress = function(pos) {
		if (typeof pos !== 'undefined') {
			localStorage.setItem('position', JSON.stringify(pos.coords));
		}

		var crd = JSON.parse(localStorage.getItem('position'));

		$.ajax({
			url: 'https://maps.googleapis.com/maps/api/geocode/json',
			data: {
				latlng: crd.latitude + ',' + crd.longitude,
				sensor: true,
				language: localStorage['language']
			},
			success: function(data) {
				$('.js-current-address').text(data.results[0].formatted_address);
			}
		});

		$('.js-current-position').text(crd.latitude + ', ' + crd.longitude);
	};

	var error = function(err) {
		console.warn('ERROR(' + err.code + '): ' + err.message);
	};

	navigator.geolocation.getCurrentPosition(getAddress, error, options);

	$(document).on('change', '.js-language', function(e) {
		localStorage['language'] = $(this).val();

		getAddress();
	});

	$('.js-language').val(localStorage.getItem('language'));
});