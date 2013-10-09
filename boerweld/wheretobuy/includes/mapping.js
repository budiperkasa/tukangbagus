var map, lastMarker, resetPt, resetZm;
var baseIcon = new GIcon();
baseIcon.shadow = "images/markers/shadow50.html";
baseIcon.iconSize = new GSize(20, 34);
baseIcon.shadowSize = new GSize(37, 34);
baseIcon.iconAnchor = new GPoint(9, 34);
baseIcon.infoWindowAnchor = new GPoint(9, 2);
baseIcon.infoShadowAnchor = new GPoint(18, 25);

// Tiny Marker Icon
var tinyIcon = new GIcon();
tinyIcon.image = "images/markers/gMiniMarker.png";
tinyIcon.shadow = "images/markers/mm_20_shadow.html";
tinyIcon.iconSize = new GSize(12, 20);
tinyIcon.shadowSize = new GSize(22, 20);
tinyIcon.iconAnchor = new GPoint(6, 20);
tinyIcon.infoWindowAnchor = new GPoint(5, 1);

function resetMap() {
	map.closeInfoWindow();
	map.setCenter(resetPt, resetZm);
}
function markerClick(i) {
	map.closeInfoWindow();
	if (!locations[i]) return false;
	map.panTo(new GLatLng(locations[i][1], locations[i][0]));
	lastMarker = i;
	GEvent.addListener(map, "moveend", function() {
		markers[lastMarker].openInfoWindowHtml(infoWindowHtml(lastMarker));
		GEvent.clearListeners(map, "moveend");
	});
}
function highlightData(i) {
	var els = document.getElementById('resultsData').getElementsByTagName('DIV');
	for (var a in els) {
		if (String(els[a].className).indexOf('gmapLocation')!=-1 || String(els[a].className).indexOf('gmapLocation2')!=-1) els[a].style.background = '';
	}
	if (i!=-1) document.getElementById('loc'+i).style.background = '#DFEFFF';
}
function detailedMap(i) {
    map.closeInfoWindow();
	map.setCenter(new GLatLng(locations[i][1], locations[i][0]), 17);
}
function addMarkers(pg) {
	var recenter = false;
	var i;
	var minlng =  9999;
	var maxlng = -9999;
	var minlat =  9999;
	var maxlat = -9999;
	map.closeInfoWindow();
	map.clearOverlays();
	if (!pg) {
		locMin = 0;
		locMax = locations.length;
	} else {
		locMin = (pg-1)*3;
		locMax = pg*3;
		if (locMax>locations.length) locMax = locations.length;
	}
	var ptlat, ptlng;
	var bounds = map.getBounds();
	for (var i=locMin; i<locMax; i++) {
		ptlng = locations[i][0];
		ptlat = locations[i][1];
		markers[i] = createMarker(new GLatLng(ptlat, ptlng), i, locations[i][2]);
		map.addOverlay(markers[i]);

		// Check if Point within Map Bounds
		if (bounds.minX < ptlng && ptlng < bounds.maxX && bounds.minY < ptlat && ptlat < bounds.maxY) {
			// Point inside map bounds
			recenter = true;
		} else {
			// Point outside map bounds
			recenter = true;
		}
		
		// Keep track of vars for center
		if (ptlng < minlng) minlng = ptlng;
		if (ptlng > maxlng) maxlng = ptlng;
		if (ptlat < minlat) minlat = ptlat;
		if (ptlat > maxlat) maxlat = ptlat;
	}
	if (originPt.lat!=0 && originPt.lng!=0) {
		var originMarker = new GMarker(new GLatLng(originPt.lat, originPt.lng), tinyIcon);
		map.addOverlay(originMarker);
	}
	// Recenter Map if needed
	if (recenter) {
		// At least one point is outside the map boundaries, recenter map
		// Check zoom
		var zl;
		var gspan = map.getBounds().toSpan();
		while (gspan.lng()*0.97 < (maxlng-minlng) || gspan.lat()*0.97 < (maxlat-minlat)) {
			zl = map.getZoom();
			map.setZoom(zl-1);
			gspan = map.getBounds().toSpan();
			if (zl<11) break;
		}
		// Determine Center Point
		var clng = (maxlng + minlng) / 2;
		var clat = (maxlat + minlat) / 2;
		// Recenter
		map.panTo(new GLatLng(clat, clng));

		resetPt = new GLatLng(clat, clng);
		resetZm = map.getZoom();
	}
	// Pop Info Window open
    markerClick(locMin);
}
function displayResults(pg, skip) {
    
	var s = '';
	if (!pg) {
		locMin = 0;
		locMax = locations.length;
	} else {
		locMin = (pg-1)*3;
		locMax = pg*3;
		if (locMax>locations.length) locMax = locations.length;
	}
	
	if (!skip) {
		if (locations.length==0) {
			pg = 0;
			s += '<p>Sorry, no distributors could be found matching your selections.</p>';
		} else {
			for (var i=locMin; i < locMax; i++) {
				s += locationRows[i];
			}
		}
		document.getElementById('resultsData').innerHTML = s;
		s = '';
	}

	// Previous, New Search, Next Buttons
	if (pg>1) {
		s = '<a href="#" onclick="displayResults(' + (pg-1) + '); return false"><img src="images/previous.gif" alt="Previous" /></a> &nbsp;';
	} else {
		s = '<img src="images/previous_disabled.gif" alt="Previous" /> &nbsp;';
	}
	document.getElementById('pagePrev').innerHTML = s;
	if (pg*3 < locations.length) {
		s = ' &nbsp; <a href="#" onclick="displayResults(' + (pg+1) + '); return false"><img src="images/more.gif" alt="More" /></a>';
	} else {
		s = ' &nbsp; <img src="images/more_disabled.gif" alt="More" />';
	}
	document.getElementById('pageNext').innerHTML = s;

	// Add Markers to Map
	addMarkers(pg);
}
function infoWindowHtml(i) {
	var s = '<div class="bubblewrap">' + locations[i][2];
	if (locations[i][8])  s += '<br/><img src="images/logos/' + locations[i][8] + '" style="margin-top: 5px;" />';
	if (locations[i][10]) {
		s += '<br/>';
		if (locations[i][11] && locations[i][12]) {
			if (locations[i][13]) s += '<a href="' + locations[i][13] + '">';
			s += '<img src="images/photos/' + locations[i][10] + '" width="' + locations[i][11] + '" height="' + locations[i][12] + '" style="margin-top: 5px;" />';
			if (locations[i][13]) s += '</a>';
		} else {
			if (locations[i][13]) s += '<a href="' + locations[i][13] + '">';
			s += '<img src="images/photos/' + locations[i][10] + '" style="margin-top: 5px;" />';
			if (locations[i][13]) s += '</a>';
		}
	}
	s += '</div>';
	return s;
}

var markers = new Array();
function createMarker(point, index, desc) {
	var icon = new GIcon(baseIcon);
	var iconLetter = 'A';
	iconLetter = iconLetter.charCodeAt(0) + Number(index);
	iconLetter = String.fromCharCode(iconLetter);
	icon.image = "images/markers/omarker" + iconLetter + ".png";
	var marker = new GMarker(point, icon);
	var html = "<b>" + desc + "</b>";
	GEvent.addListener(marker, "click", function() {
		marker.openInfoWindowHtml(infoWindowHtml(Number(index)));
	});
	return marker;
}