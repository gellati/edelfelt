(function(){

  var app = angular.module("edelfeltViewer");

  var LocationsController= function($scope, $http){
    var baseUrl = "//edelfelt.sls.fi"

    var url = baseUrl + "/api/locations/?format=jsonp&callback=JSON_CALLBACK";
    //	url = "http://edelfelt.sls.fi/api/locations/?format=json";

    var targetSVG = "M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z";

    function filterNullLocations(locations){
      let i;
      var filteredLocations = [];
      let place = {};
      for(i = 0; i < locations.length; i++){
        if(($.type(locations[i].lat) !== "null") && ($.type(locations[i].long) !== "null")){
          place = {};
          place.lat = locations[i].lat;
          place.long = locations[i].long;
          place.name = locations[i].name;
          place.id = locations[i].id.toString();
          place.description = locations[i].lat + " " + locations[i].long
          place.country = locations[i].country;
          place.events = locations[i].events;
          place.svgPath = targetSVG;
          place.zoomLevel = 5;
          place.scale = 0.5;
          filteredLocations.push(place);
        }
      }
      return filteredLocations;
    }

    function getLines(locations, index, steps){
      var ilocations = []
      var i;
      index = Math.floor(index);
      var place = {};
      for(i = index; i < index + steps - 1; i++){
        place = {
          'latitudes' : [locations[i]['lat'], locations[i+1]['lat']],
          'longitudes' : [locations[i]['long'], locations[i+1]['long']]
        };
        ilocations.push(place);
      }
      return ilocations;
    }

    function getLocations(locations, index, steps){
      var ilocations = [];
      index = Math.floor(index);
      let i;
      for(i = index; i < index + steps; i++){
        let place = {};
        place.id = locations[i].id.toString();
        place.latitude = locations[i].lat;
        place.longitude = locations[i].long;
        place.scale = 0.6;
        place.title = locations[i].name + "<br>" + locations[i].lat + " " + locations[i].long;
        place.svgPath = targetSVG;
        place.country = locations[i].country;
        ilocations.push(place);
      }
      return ilocations;
    }

    function getLocationArray(locations){
      var locationArray = [];
      let i;
      for(i = 0; i < locations.length; i++){
        locationArray.push(locations[i].id.toString());
      }
      return locationArray;
    }

    var nextUrl = url;

    var v = function(url){
      return $http.jsonp(url)
      .then(function(response){
        return data.next
      });
      /*
      if(nextUrl !== null){
      getNext(nextUrl);
    }
    else{
    return;
  }
  */
}

var onError = function(reason){
  $scope.error = "could not fetch data";
}

$http.jsonp(url)
.success(function(data, status){

  var locationData = data.results;

  if(data.previous === null){
//    console.log("this null");
  }

  var locationArray = [];
  var location = {};

  var filteredLocations = filterNullLocations(locationData);

  var lineArray = getLines(filteredLocations, 0, filteredLocations.length);
  var placeArray = getLocations(filteredLocations, 0, filteredLocations.length);

  var mapChart = AmCharts.makeChart("mapcontainer", {
    // set path to images
    "type": "map",
//    "pathToImages": "libs/ammap/ammap/images/",

    "imagesSettings": {
      color: "#3300AA",
      rollOverColor: "#CC5500",
      rollOverScale : 3,  // for targetSVG when hovering over target
      selectedColor: "#000000",
    },

    "linesSettings" : {
      arc: -0.7,
      arrow: "middle",
      color: "#CC0000",
      alpha: 0.4,
      arrowAlpha: 1,
      arrowSize: 4
    },

    "images": filteredLocations,
    "dataProvider": {
      map: "worldLow",
      getAreasFromMap: true,
      zoomLevel: 3.5,
      zoomLongitude: 10,
      zoomLatitude: 55,
      lines: lineArray,
    },

    // pass data provider to the map object
    //		    "dataProvider": dataProvider,
    //		    "linesSettings": linesSet,
    //		    "imagesSettings": imagesSet

  });

  var slider = document.getElementById('rangeslider');
  var minpos = 0;
  var maxpos = filteredLocations.length - 1;
  var locationArray = getLocationArray(filteredLocations);

  noUiSlider.create(slider, {
    start: [ 0, filteredLocations.length - 1 ], // Handle start position
    step: 1, // Slider moves in increments of '1'
    margin: 1, // Handles must be more than '1' apart
    connect: true, // Display a colored bar between the handles
    direction: 'ltr', // Put '0' at the bottom of the slider
    orientation: 'horizontal', // Orient the slider vertically
    behaviour: 'tap-drag', // Move handle on tap, bar is draggable
    range: {'min': minpos, 'max': maxpos },
    pips: { mode: 'steps', density: 10 }
  });

  slider.noUiSlider.on('update', function (values, handle) {
    var places2 = getLocations(filteredLocations, values[0], values[1] - values[0] + 1);
    var lines2 = getLines(filteredLocations, values[0], values[1] - values[0] + 1);

    //		    var target = mapChart.dataProvider;
    //		    mapChart.dataProvider.lines = lines2;
    //		    mapChart.dataProvider.images = places2;

    mapChart.dataProvider.lines = lines2;
    mapChart.dataProvider.images = places2;

    //		    target.lines.setValue(lines2);
    //		    target.images = places2
    //      target.linesSettings = linesSet
    mapChart.validateNow();
  });


})
.error(function(data, status){
  console.log("error");
});
}

app.controller("LocationsController", LocationsController);

}());
