var get_weather = function(){

	var apis = {
		weather_uri : '//api.openweathermap.org/data/2.5/weather?'
	};

	var location = {};
	var weather = {};
	var target,h;

	this.get = function(element,header_level){
		get_location();
		target = element;
		h = header_level;
	};

	var get_location = function(){
		if("geolocation" in navigator){
			navigator.geolocation.getCurrentPosition(function(position){
				find_weather(position);
			});
		} else {
			console.log('Location not available.');
			return false;
		}
	};
	
	var find_position = function(position){
		var url = apis.geocode_uri + 'location=' + position.coords.latitude + ',' + position.coords.longitude + '&flags=J&gflags=R&appid=' + apis.consumer_key;
		$.getJSON(url).success(function(data){
			location = data.ResultSet.Results[0];
			find_weather(location.woeid);
		});
	};

	var find_weather = function(position){
		var url = apis.weather_uri;
		$.getJSON(url, {
			lat : position.coords.latitude,
			lon : position.coords.longitude,
		}).success(function(data){
			console.log(data);
		});
	};

	var build_weather_module = function(){
		var html = '';
		html += '<'+h+' class="location">'+location.neighborhood+', '+location.city+'</'+h+'>';
		html += '<p class="temp">'+weather.item.condition.temp+'°C</p>';
		html += '<p class="condition">'+weather.item.condition.text+'</p>'
		$('#'+target).append(html);
	};
};