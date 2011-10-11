var twitter_search_url;
var twitter_search_term;
var twitter_gps_coordinate;
var twitter_additional_params;
var tweets;

function initializeTwitter() {
	twitter_search_url = 'http://search.twitter.com/search.json?q=';
	refreshTwitter('asu', '33.424099,-111.939619', '.5mi');
}

function refreshTwitter(term, coordinate, radius) {
	tweets = new Array();

	$.ajaxSetup({ cache: true });
	
	var built_url = twitter_search_url + term + '&rpp=100&geocode=' + coordinate + ',' + radius + '&callback=?';
	
	console.log("Fetching tweets from: " + built_url);
	$.getJSON(
		built_url,
		function(data) {
		  $.each(data.results, function(i, tweet) {
		  	if(tweet.geo != null)
		  	{
				tweets.push(tweet);
			}
		});
		clearMap();
		$.each(tweets, function(i, tweet) {
			addMarker(new google.maps.LatLng(tweet.geo.coordinates[0], tweet.geo.coordinates[1]), tweet.from_user + ": " + tweet.text);
		});
		console.log("Fetched " + tweets.length + " tweets");
    });
}