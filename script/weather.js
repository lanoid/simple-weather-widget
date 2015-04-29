/*globals navigator */

var get_weather = function () {

  var apis = {
      weather_uri : '//api.openweathermap.org/data/2.5/weather?'
    },
    target,
    h,
    build_weather_module = function (weather) {
      console.log(weather);
      var html = '';
      html += '<' + h + ' class="location">' + weather.name + '</' + h + '>';
      html += '<p class="temp">' + (parseInt(weather.main.temp, 10) - 273) + '°C</p>';
      html += '<p class="condition">' + weather.weather[0].main + ', ' + weather.weather[0].description + '</p>';
      $('#' + target).append(html);
    },
    get_weather = function (position) {
      var url = apis.weather_uri;
      $.getJSON(url, {
        lat : position.coords.latitude,
        lon : position.coords.longitude,
      }).success(function (data) {
        build_weather_module(data);
      });
    },
    get_location = function () {
      if (navigator.hasOwnProperty('geolocation')) {
        navigator.geolocation.getCurrentPosition(function (position) {
          get_weather(position);
        });
      } else {
        console.log('Location not available.');
        return false;
      }
    };

  this.get = function (element, header_level) {
    get_location();
    target = element;
    h = header_level;
  };
};