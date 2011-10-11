function initializeUi() {
	$( "input:submit").button();
	$( "input:submit").click(function() {
		twitter_search_term = $( "search_term").val();
		twitter_gps_coordinate = $( "gps_coordinate").val();
		twitter_radius = $( "radius").val();
		refreshTwitter($( "#search_term").val(), $( "#gps_coordinate").val(), $( "#radius").val());
	});
}