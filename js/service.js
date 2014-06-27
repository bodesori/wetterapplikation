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

	// clear-day, clear-night, rain, snow, sleet, wind, fog, cloudy, partly-cloudy-day, or partly-cloudy-night
	var weatherIcons = {
	  'clear-day': 'B',
        'clear-night': 'C',
        'rain': 'R',
        'snow': 'X',
        'sleet': 'W',
        'wind': 'S',
        'fog': 'M',
        'cloudy': 'N',
        'partly-cloudy-day': 'H',
        'partly-cloudy-night': 'I'
	}

	var getAddress = function(pos) {
		if (typeof pos !== 'undefined') {
			localStorage.setItem('position', JSON.stringify(pos.coords));
		}

		var crd = JSON.parse(localStorage.getItem('position'));

		/**
		* Anfrage an Google
		*/
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


		/**
		* Anfrage an Forecast
		*/
		$.ajax({
		  	url: 'https://api.forecast.io/forecast/08fe7a18b9273c9859e14b99ec1fe912/' + crd.latitude + ',' + crd.longitude,
		  	data: {
		  		units: 'si'
		  	},
		  	dataType: 'jsonp',
		  	success: function(data) {
		  		console.log(data);
		      $('.js-weather-icon').text(weatherIcons[data.currently.icon]);
			}
		});
	};

	/**
    * Umgekehrtes Geocoding
    * Anhand von Adresseingabe wird Ergebnis geliefert
    */
	$('.js-custom-address').on('click','a', function(event) {
	    event.preventDefault(); // unterbindet das defaultverhalten

	    // Das val element liest den Inhalt aus dem Inputelement
	    var address = $('input', '.js-custom-address').val();

	    // Anfrage an Google mit Adresse aus Inputfeld
	    $.ajax({
	      url: 'http://maps.googleapis.com/maps/api/geocode/json',
	      data: {
	        address: address,
	        sensor: false
	      },
	      success: function(data) {
	        console.log(data);
	        
	        /**
	        * Anfrage an Forecast mit eingegebenen Koordinaten von Adresse
	        */
	        var lat = data.results[0].geometry.location.lat;
	        var lng = data.results[0].geometry.location.lng;
	        $('.js-custom-address-output').text(data.results[0].formatted_address);

	        // Anfrage an Forecast mit lat und lang
	        $.ajax({
	          url: 'https://api.forecast.io/forecast/08fe7a18b9273c9859e14b99ec1fe912/' + lat + ',' + lng,
	          data: {
	            units: 'si'
	          },
	          dataType: 'jsonp',
	          success: function(data) {
	            console.log(data);
	            /*$('.js-custom-address').textS
	            $('.js-custom-temp').text(data.currently.temperature + '°C');
	            $('.js-custom-wspeed').text(data.currently.windSpeed + ' m pro Sekunde');
	            $('.js-custom-weather-icon').text(weatherIcons[data.currently.icon]);*/
	          }
	        });
	      }
	    });
	});

	var error = function(err) {
		// hausaufgabe:
		// falls die errorfunktion aufgerufen wird, wird die successfunktion mit einem festen wert aufgerufen
		console.warn('ERROR(' + err.code + '): ' + err.message);
	};

	navigator.geolocation.getCurrentPosition(getAddress, error, options);

	$(document).on('change', '.js-language', function(e) {
		localStorage['language'] = $(this).val();

		getAddress();
	});

	$('.js-language').val(localStorage.getItem('language'));
});