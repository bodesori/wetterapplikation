var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

// clear-day, clear-night, rain, snow, sleet, wind, fog, cloudy, partly-cloudy-day, or partly-cloudy-night
var weatherIcons = {
  'clear-day' : 'B',
  'clear-night' : 'C',
  'rain' : 'R',
  'partly-cloudy-night' : 'I'
}

function success(pos) {
  var crd = pos.coords;

  /*console.log('Your current position is:');
  console.log('Latitude : ' + crd.latitude);
  console.log('Longitude: ' + crd.longitude);
  console.log('More or less ' + crd.accuracy + ' meters.');*/

  $('.js-lat').text(crd.latitude);
  $('.js-long').text(crd.longitude);
  $('.js-acc').text(crd.accuracy + ' m');

  $.ajax({ // Anfrage an Forecast
  	url: 'https://api.forecast.io/forecast/08fe7a18b9273c9859e14b99ec1fe912/' + crd.latitude + ',' + crd.longitude,
  	data: {
  		units: 'si'
  	},
  	dataType: 'jsonp',
  	success: function(data) {
  		console.log(data);
  		$('.js-temp').text(data.currently.temperature + '°C');
  		$('.js-wspeed').text(data.currently.windSpeed + ' m pro Sekunde');
      $('.js-weather-icon').text(weatherIcons[data.currently.icon]);
  	}
  });

  $.ajax({ // Anfrage an GoogleAPI
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

  
  /**
  * Umgekehrtes Geocoding
  * Anhand von Adresseingabe wird Ergebnis geliefert
  */
  $('.js-custom-address').on('click','a', function(event) {
    event.preventDefault(); // unterbindet das defaultverhalten

    // var address = $('.js-custom-address input') Wäre auch eine Variante
    var address = $('input', '.js-custom-address').val(); // Das val element liest den Inhalt aus dem Inputelement

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
        // Koordinaten von Anfrage
        var lat = data.results[0].geometry.location.lat;
        var lng = data.results[0].geometry.location.lng;
        $('.js-custom-address-output').text(data.results[0].formatted_address);

        $.ajax({ // Anfrage an Forecast mit lat und lang
          url: 'https://api.forecast.io/forecast/08fe7a18b9273c9859e14b99ec1fe912/' + lat + ',' + lng,
          data: {
            units: 'si'
          },
          dataType: 'jsonp',
          success: function(data) {
            console.log(data);
            $('.js-custom-address').text
            $('.js-custom-temp').text(data.currently.temperature + '°C');
            $('.js-custom-wspeed').text(data.currently.windSpeed + ' m pro Sekunde');
            $('.js-custom-weather-icon').text(weatherIcons[data.currently.icon]);
          }
        });
      }
    });

  });

  // Rio de Janeiro auslesen
  var address = 'Rua Professor Eurico Rabelo';

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
      // Koordinaten von Anfrage
      var lat = data.results[0].geometry.location.lat;
      var lng = data.results[0].geometry.location.lng;
      $('.js-address-janeiro').text(data.results[0].formatted_address);

      $.ajax({ // Anfrage an Forecast mit lat und lang
        url: 'https://api.forecast.io/forecast/08fe7a18b9273c9859e14b99ec1fe912/' + lat + ',' + lng,
        data: {
          units: 'si'
        },
        dataType: 'jsonp',
        success: function(data) {
          console.log(data);
          $('.js-temp-janeiro').text(data.currently.temperature + '°C');
          $('.js-wind-janeiro').text(data.currently.windSpeed + ' m pro Sekunde');
        }
      });
    }
  });


  // Wetter in Manaus
  $.ajax({
      url: 'http://maps.googleapis.com/maps/api/geocode/json',
      data: {
        address: 'Manaus',
        sensor: false
      },
      success: function(data) {
        var lat = data.results[0].geometry.location.lat;
        var lng = data.results[0].geometry.location.lng;
        $('.js-address-manaus').text(data.results[0].formatted_address);

        $.ajax({
          url: 'https://api.forecast.io/forecast/a955df0e9afe8c822ebb3adf30265fb6/' + lat + ',' + lng,
          data: {
            units : 'si'
          },
          dataType: 'jsonp',
          success: function(data) {
            $('.js-weather-manaus').text(data.currently.summary + ' (' + data.currently.temperature + '°)');
          }
        });
      }
  });




}

var getWeahterData = function(lat, lng, callback) {
  $.ajax({
    url: 'https://api.forecast.io/forecast/a955df0e9afe8c822ebb3adf30265fb6/' + lat + ',' + lng,
    data: {
      units : 'si'
    },
    dataType: 'jsonp',
    success: function(data) {
      callback(data);
    }
  });
};



function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
}

navigator.geolocation.getCurrentPosition(success, error, options);