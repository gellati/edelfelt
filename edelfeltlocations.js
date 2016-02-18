
function showlocationsdata(){

// svg path for target icon
var targetSVG = "M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z";

function filterNullLocations(locs){
    var locations2 = [];

      for(var i = 0; i < locs.length; i++){
      // https://api.jquery.com/jQuery.type/
          if( ($.type(locations[i].lat) !== "null") && ($.type(locations[i].long) !== "null")){

              var place = {};
              place.lat = locations[i].lat;
              place.long = locations[i].long;
              place.name = locations[i].name;
              place.id = locations[i].id.toString();
              place.country = locations[i].country;
              locations2.push(place);
          }
      }

    return locations2;
}

function getLocations(locs, index, steps){
    var locations2 = [];
    index = Math.floor(index);

      for(var i = index; i < index + steps; i++){

              var place = {};
              place.id = locs[i].id.toString();
              place.latitude = locs[i].lat;
              place.longitude = locs[i].long;
              place.scale = 0.6;
              place.title = locs[i].name;
     		     place.svgPath = targetSVG;
              place.country = locs[i].country;
              locations2.push(place);

          }
    return locations2;
}

function getLocationArray(locs){
	var locations2 = []
	for(var i = 0; i < locs.length; i++){
      locations2.push(locs[i].id.toString())
	}
	return locations2
}


function getLines(locs, index, steps){
	    var locations2 = [];
	    index = Math.floor(index);    
	    
	    for(var i = index; i < index + steps - 1; i++){
		    var place = {
			'latitudes' :[locs[i]['lat'], locs[i+1]['lat']],
			'longitudes' : [locs[i]['long'], locs[i+1]['long']]
				}
		    locations2.push(place);		    
		}
	    return locations2;
	}



    var locations2 = filterNullLocations(locations);
        
    
    // add all your code to this method, as this will ensure that page is loaded
    AmCharts.ready(function() {
        // create AmMap object
        var map = new AmCharts.AmMap();
        // set path to images
        map.pathToImages = "libs/ammap/ammap/images/";

        /* create data provider object
         map property is usually the same as the name of the map file.

         getAreasFromMap indicates that amMap should read all the areas available
         in the map data and treat them as they are included in your data provider.
         in case you don't set it to true, all the areas except listed in data
         provider will be treated as unlisted.
        */

   	 var lineArray = getLines(locations2, 0, locations2.length);
	    var placeArray = getLocations(locations2, 0, locations2.length);

       var linesSet = {
	    arc: -0.7,
	    arrow: "middle",
	    color: "#CC0000",
	    alpha: 0.4,
	    arrowAlpha: 1,
	    arrowSize: 4
	    }
	    
	    var imagesSet = {
	    	color: "#CC0000",
         rollOverColor: "#CC0000",
         selectedColor: "#000000"
	    }
	
	
       var dataProvider = {
            map: "worldLow",
            getAreasFromMap: true,
	    zoomLevel: 3.5,
	    zoomLongitude: 10,
	    zoomLatitude: 55,
	    lines: lineArray,
	    images: placeArray
        };

        // pass data provider to the map object
        map.dataProvider = dataProvider;
        map.linesSettings = linesSet;
        map.imagesSettings = imagesSet;


//	map.dataprovider.zoomTo =	map.zoomTo(10, 10, 50, false);
//	map.dataprovider.zoomToLongLat = map.zoomToLongLat(10, 10, 50, false);
//	map.dataprovider.zoomToMapXY = map.zoomToMapXY(10, 10, 50, false);

//	map.zoomTo(10, 10, 50);
//	map.zoomToLongLat(10, 10, 50);
//	map.zoomToMapXY(10, 10, 50);

//	var info = map.getDevInfo();
//	console.log(info.longitude + "-" + info.latitude);
//	map.zoomTo(map.zoomLevel(), 10, 50);
//	map.zoomToLongLat(map.zoomLevel(), 10, 50);
//	map.zoomToMapXY(map.zoomLevel(), 10, 50);

	
        // let's say we want a small map to be displayed, so let's create it
//        map.smallMap = new AmCharts.SmallMap();

        // write the map to container div
        map.write("mapcontainer");



    var slider = document.getElementById('rangeslider');
    var minpos = 0;
    var maxpos = locations2.length - 1;
    var locationArray = getLocationArray(locations2);

    noUiSlider.create(slider, {
  	    start: [ 0, locations2.length - 1 ], // Handle start position
  	    step: 1, // Slider moves in increments of '10'
 	    margin: 1, // Handles must be more than '20' apart
 	    connect: true, // Display a colored bar between the handles
 	    direction: 'ltr', // Put '0' at the bottom of the slider
 	    orientation: 'horizontal', // Orient the slider vertically
  	    behaviour: 'tap-drag', // Move handle on tap, bar is draggable
  	    range: {'min': minpos, 'max': maxpos },
  	    pips: { mode: 'steps', density: 10 }
    });
    
    slider.noUiSlider.on('update', function (values, handle) {
    	var places2 = getLocations(locations2, values[0], values[1] - values[0] + 1);
    	var lines2 = getLines(locations2, values[0], values[1] - values[0] + 1);


    	console.log("places2");
    	console.log(places2);
    	console.log("lines2");
    	console.log(lines2);

    	
    	var target = map.dataProvider;
    	target.lines = lines2
    	target.images = places2
//    	target.linesSettings = linesSet

    	map.validateNow()  	
    	
    });
	
});
}