/*globals navigator */

var get_weather = function () {

  var apis = {
      weather_uri : 'http://api.openweathermap.org/data/2.5/weather?',
      appid : 'cad3370b1bbe974e2dab04659aadd531'
    },
    target,
    h,
    weatherCodes = {
      200 : 'thunderstorm',
      201 : 'thunderstorm',
      202 : 'thunderstorm',
      210 : 'thunderstorm',
      211 : 'thunderstorm',
      212 : 'thunderstorm',
      221 : 'thunderstorm',
      230 : 'thunderstorm',
      231 : 'thunderstorm',
      232 : 'thunderstorm',

      300 : 'umbrella',
      301 : 'umbrella',
      302 : 'umbrella',
      310 : 'umbrella',
      311 : 'umbrella',
      312 : 'umbrella',
      313 : 'umbrella',
      314 : 'umbrella',
      321 : 'umbrella',

      500 : 'rain',
      501 : 'rain',
      502 : 'rain',
      503 : 'rain',
      504 : 'rain',
      511 : 'rain',
      520 : 'rain',
      521 : 'rain',
      522 : 'rain',
      531 : 'rain',

      600 : 'snow',
      601 : 'snow',
      602 : 'snow',
      611 : 'snow',
      612 : 'snow',
      615 : 'snow',
      616 : 'snow',
      620 : 'snow',
      621 : 'snow',
      622 : 'snow',

      701 : 'mist',
      711 : 'smoke',
      721 : 'haze',
      731 : 'sand',
      741 : 'fog',
      751 : 'dust',
      761 : 'ash',
      762 : 'volcanic-ash',
      771 : 'squalls',
      781 : 'tornado',

      800 : 'clear',
      801 : 'cloudy',
      802 : 'cloudy',
      803 : 'cloudy',
      804 : 'overcast',

      900 : 'tornado',
      901 : 'thunderstorm',
      902 : 'hurricane',
      903 : 'cold',
      904 : 'hot',
      905 : 'windy',
      906 : 'hail'

    },
    build_weather_module = function (weather) {
      var html = '';
      html += '<' + h + ' class="location">You are near ' + weather.name + '</' + h + '>';
      html += '<p class="temp">' + (parseInt(weather.main.temp, 10) - 273) + '°C</p>';
      html += '<p class="condition">' + weather.weather[0].main + ', ' + weather.weather[0].description + '</p>';
      html += '<i class="wi wi-' + weatherCodes[weather.weather[0].id] + '"></i>';
      $('#' + target).html(html);
    },
    get_weather = function (position) {
      var url = apis.weather_uri;
      $.getJSON(url, {
        appid : apis.appid,
        lat : position.coords.latitude,
        lon : position.coords.longitude,
      }).success(function (data) {
        build_weather_module(data);
      }).fail(function () {
        $('.status').text('Weather API not available.');
      });
    },
    get_location = function () {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
          get_weather(position);
        });
      } else {
        $('.status').text('Location not available.');
        return false;
      }
    };

  this.get = function (element, header_level) {
    get_location();
    target = element;
    h = header_level;
  };
};
