var get_weather = function(){

	var apis = {
		consumer_key : 'dj0yJmk9VldMbTY1MjhtTGFsJmQ9WVdrOWFrc3dTMmROTkdzbWNHbzlNalE1TlRJMU5UWXkmcz1jb25zdW1lcnNlY3JldCZ4PWE0',
		geocode_uri : 'http://where.yahooapis.com/geocode?',
		weather_uri : 'http://query.yahooapis.com/v1/public/yql?'
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
				find_position(position);
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

	var find_weather = function(woeid){
		var url = apis.weather_uri + 'q=select%20*%20from%20weather.forecast%20where%20woeid%3D'+ woeid +'%20and%20u%3D\'c\'&format=json';
		$.getJSON(url).success(function(data){
			weather = data.query.results.channel;
			build_weather_module();
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