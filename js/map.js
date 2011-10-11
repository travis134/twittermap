var mapCenter = new google.maps.LatLng(33.424099,-111.939619);
var radius; //meters
var delay; //minutes
var map;
var areaWidgets;

function initializeMap() {
	var mapOptions = {
		zoom: 15,
		center: mapCenter,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	radius = 250;
	delay = 180;

	map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
	
	areaWidgets = new Array();
}

function clearMap()
{
	if (areaWidgets)
	{
		for (i in areaWidgets)
		{
			areaWidgets[i].set('map', null);
		}
	}
}

function addMarker(position, text)
{
	areaWidgets.push(new AreaWidget(map, position, text));
}

function AreaWidget(map, center, text) {
	this.set('map', map);
	this.set('position', center);

	var marker = new google.maps.Marker({
		draggable: false,
		title: text
	});

	marker.bindTo('map', this);
	marker.bindTo('position', this);
	
	var radiusWidget = new RadiusWidget();
	radiusWidget.bindTo('map', this);
	radiusWidget.bindTo('center', this, 'position');
	
	this.bindTo('distance', radiusWidget);
	this.bindTo('bounds', radiusWidget);
}
AreaWidget.prototype = new google.maps.MVCObject();

function RadiusWidget() {
	var circle = new google.maps.Circle({
		strokeWeight: 0,
		fillColor: '#FF0000',
		fillOpacity: .2
	});

	this.set('distance', .25);
	
	this.bindTo('bounds', circle);
	
	circle.bindTo('center', this);
	circle.bindTo('map', this);
	circle.bindTo('radius', this);
}
RadiusWidget.prototype = new google.maps.MVCObject();

RadiusWidget.prototype.distance_changed = function() {
	if(((this.get('distance') * 1000) <= 500) && ((this.get('distance') * 1000) >= 10)) this.set('radius', this.get('distance') * 1000);
};

