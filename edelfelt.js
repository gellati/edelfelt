

console.log('letters ' + letters.length);
console.log(letters[0]);
console.log(letters[1]);

for(var i = 0; i < letters.length; i++){
    if(letters[i].pages.length > 1){
        console.log(letters[i].pages.length);
    }
}

var lettersarray = [];
for(var i = 0; i < letters.length; i++){
    var letter = {};
    letter.id = letters[i].id;
    letter.start = letters[i].date;
    letter.content = letters[i].pages.length.toString();
    switch(letters[i].pages.length){
        case 1: letter.className = 'one'; break;
        case 2: letter.className = 'two'; break;
        case 3: letter.className = 'three'; break;
        case 4: letter.className = 'four'; break;
        case 5: letter.className = 'five'; break;
        case 6: letter.className = 'six'; break;
        case 7: letter.className = 'seven'; break;
        case 8: letter.className = 'eight'; break;
        case 9: letter.className = 'nine'; break;
        case 10: letter.className = 'ten'; break;
        case 11: letter.className = 'eleven'; break;
        case 12: letter.className = 'twelve'; break;
        case 13: letter.className = 'thirteen'; break;
        case 14: letter.className = 'fourteen'; break;
        case 15: letter.className = 'fifteen'; break;
        case 16: letter.className = 'sixteen'; break;
        case 17: letter.className = 'seventeen'; break;     
    }
    letter.title = letters[i].title + "\n" + (letters[i].pages.length.toString()) + " sidor" + "\n" + letters[i].date;
    lettersarray.push(letter);
}

  // DOM element where the Timeline will be attached
  var container = document.getElementById('letters');

  // Create a DataSet (allows two way data-binding)
  var items = new vis.DataSet(lettersarray);

  // Configuration for the Timeline
  var options = {};

  // Create a Timeline
  var timeline = new vis.Timeline(container, items, options);


/*
 * edelfelt api needs to implement jsonp
 * 
 */


/*

*/

/*
for(var i = 0; i < locations.length; i++){
    if(!locations[i].name){
        console.log("no country");
    }
}



console.log('persons ' + persons.length);
console.log(persons[0]);
console.log(persons[1]);
for(var i = 0; i < locations.length; i++){
    if(persons[i].name){
        console.log(persons[i].description);
    }
}








console.log('events ' + events.length);
console.log(events[0]);
console.log(events[1]);

for(var i = 0; i < events.length; i++){
    if(events[i].artworks.length > 0){
        console.log(events[i].id + " " + events[i].artworks.length);
    }
    
}


console.log('pictures ' + pictures.length);
console.log(pictures[0]);
console.log(pictures[1]);

for(var i = 0; i < pictures.length; i++){
    if(pictures[i].type){
        console.log(pictures[i].type);
    }
    
}

*/

function mapLinks(locationArray, index, steps){
    var lnks = {};
        index = Math.floor(index);
    for(var i = index; i < index + steps - 1; i++){
  //      i = Math.floor(i);

            var linkname = locationArray[i].name + "-" + locationArray[i + 1].name;
            var linkid = (locationArray[i].id + "-" + locationArray[i + 1].id).toString();            
   //         console.log("id " + locationArray[i].id + "-" + locationArray[i + 1].id);
            lnks[linkid] = {factor: -0.8,
                              between: [locationArray[i].id.toString(),                                  
                                        locationArray[i+1].id.toString()],
                              tooltip:{content: linkname},
                              attrs:{"stroke-width": 1}
            };
    }
    return lnks;
}

function mapPlaces(locationArray, index, steps){
    var plces = {};
  //  console.log("mapPlaces: array, index, steps: " + locationArray.length+ ", " + index + ", " + steps);
//    index = Math.floor(index);
 //   console.log("loc index id: " + locationArray[Math.floor(index)].id + ", " + index);
    
//        i = Math.floor(i);
        index = Math.floor(index);
    for(var i = index; i < index + steps; i++){
        console.log("mP2: " + i + ", " + Math.floor(i) + ", index: " + index + ", steps: " + steps);
        plces[locationArray[i].id] = {value: 10,
            longitude: locationArray[i].long, 
            latitude:  locationArray[i].lat,
            tooltip: {content: locationArray[i].name + ", " + locationArray[i].country},
            size: 4,
            country: locationArray[i].country
        };
    }
    return plces;
}


function drawMap(p, l){
	$(".mapcontainer").mapael({
		map : {
            // Set the name of the map to display
			name : "world_countries",
                        defaultArea: {
                            attrs: {
                                fill: "#f4f4e8",
                                stroke: "#ced8d0"
                            }
                        },
                        defaultPlot: {
                            text: {
                                attrs: {
                                    fill: "#000"
                                },
                                attrsHover: {
                                    fill: "#000"
                                }
                            }
                        },

                        zoom: {
                           enabled: true,
                           maxLevel: 20,
                           init:{
                                latitude: 55,
                                longitude: 25,
                                level: 10
                           }
                        }
                },
                plots: p,
                links: l
	});  
    
}

var locations2 = [];

// mapael version
$(function(){

console.log('locations ' + locations.length);
console.log(locations[0]);
console.log(locations[1]);
console.log(locations[2]);



    for(var i = 0; i < locations.length; i++){
    // https://api.jquery.com/jQuery.type/
        if( ($.type(locations[i].lat) !== "null") && ($.type(locations[i].long) !== "null")){

            var place = {};
            place.lat = locations[i].lat;
            place.long = locations[i].long;
            place.name = locations[i].name;
            place.id = locations[i].id;
            place.country = locations[i].country;
            locations2.push(place);        
        }
    }

    var links = mapLinks(locations2, 0, locations2.length);
    console.log("function: array, index, steps: " + locations2.length + ", " + 0 + ", " + locations2.length);
    var places = mapPlaces(locations2, 0, locations2.length);

    drawMap(places, links);
    var slider = document.getElementById('rangeslider');
    var minpos = 0;
    var maxpos = locations2.length - 1;

    noUiSlider.create(slider, {
	start: [ 0, locations2.length ], // Handle start position
	step: 1, // Slider moves in increments of '10'
	margin: 1, // Handles must be more than '20' apart
	connect: true, // Display a colored bar between the handles
	direction: 'ltr', // Put '0' at the bottom of the slider
	orientation: 'horizontal', // Orient the slider vertically
	behaviour: 'tap-drag', // Move handle on tap, bar is draggable
	range: { // Slider can select '0' to '100'
		'min': minpos,
		'max': maxpos
	},
	pips: { // Show a scale with the slider
		mode: 'steps',
		density: 10
	}
    });

    console.log("t2: " + locations2.length);

    slider.noUiSlider.on('update', function(values, handle){
        console.log('update: ' + values[handle]);
        if(handle === 0){
            minpos = values[handle];
        }
        if(handle === 1){
            maxpos = values[handle];
        }

        console.log("t3: " + locations2.length);
        console.log("slider.noUiSlider: array, index, steps: " + locations2.length + ", " + minpos + ", " + (maxpos - minpos));
        var places2 = mapPlaces(locations2, minpos, maxpos - minpos + 1);
        var links2 = mapLinks(locations2, minpos, maxpos - minpos + 1);
        
        var newLinksArray = [];
        var oldLinksArray = [];

        for(var key in links2){
            newLinksArray.push(key);
        }
        for(var key in links){
            oldLinksArray.push(key);
        }
        
        console.log("links, old: " + oldLinksArray + ", new: " + newLinksArray);
        
            
        var newPlacesArray = [];
        var oldPlacesArray = [];

        for(var key in places2){
            newPlacesArray.push(key);
        }
        for(var key in places){
            oldPlacesArray.push(key.toString());
        }
        console.log("places, old: " + oldPlacesArray.length + ", new: " + newPlacesArray);

            
            
        console.log(places);
        console.log(links);
        
        var opt = {animDuration: 10, 'deletedLinks': oldLinksArray, 'newLinks': links2};
        
        $(".mapcontainer").trigger('update',
                                   [
//                                   {'areas': {}, 'plots': places2, 'links': links2},
                                   {'areas': {}, 'plots': {}, 'links': links2},
//                                   {},
                                   places2,
//                                   [],
                                   oldPlacesArray,                                   
                                   opt]);
//                                   {'resetPlots': true}]);
        places = places2;
        links = links2;
 
    });



var valueInput = document.getElementById('value-input'),
	valueSpan = document.getElementById('value-span');


        
        // When the slider value changes, update the input and span
slider.noUiSlider.on('update', function( values, handle ) {
	if ( handle ) {
		valueInput.value = values[handle];
	} else {
		valueSpan.innerHTML = values[handle];
	}
});



// When the input changes, set the slider value
valueInput.addEventListener('change', function(){
	slider.noUiSlider.set([null, this.value]);
});

});





//console.log("places: " + places.length);
/*  // amCharts, partially working, no zoom, https://www.amcharts.com/demos/
$(function(){

// add all your code to this method, as this will ensure that page is loaded
    AmCharts.ready(function() {
        // create AmMap object
        var map = new AmCharts.AmMap();
        // set path to images
        map.pathToImages = "libs/ammap/images/";

        // create data provider object
        // map property is usually the same as the name of the map file.
        // getAreasFromMap indicates that amMap should read all the areas available
        // in the map data and treat them as they are included in your data provider.
        // in case you don't set it to true, all the areas except listed in data
        // provider will be treated as unlisted.
        / /
        
        var dataProvider = {            
            map: "worldLow",
            getAreasFromMap:true,
    images:[{latitude:40.3951, longitude:-73.5619, type:"circle", color:"#6c00ff"}],
  areas:[{id:"AU", color:"#CC0000"},{id:"US", color:"#00CC00"},{id:"FR", color:"#0000CC"}]
        }; 
        // pass data provider to the map object
        map.dataProvider = dataProvider;

        // create areas settings
         // autoZoom set to true means that the map will zoom-in when clicked on the area
         // selectedColor indicates color of the clicked area.
         //

        map.areasSettings = {
            autoZoom: true,
            selectedColor: "#CC0000"
        };

        // let's say we want a small map to be displayed, so let's create it
        map.smallMap = new AmCharts.SmallMap();
        
        map.export = {
            enabled: true,
            position: "bottom-right"
        }

        // write the map to container div
        map.write("map");
    });

});
*/





/* // do it in jvectormap
var places = [];
for(var i = 0; i < locations.length; i++){
    // https://api.jquery.com/jQuery.type/
    if( ($.type(locations[i].lat) !== "null") && ($.type(locations[i].long) !== "null")){
        var place = {};
        console.log(locations[i].lat + " - " + locations[i].long);
        place.latLng = [locations[i].lat, locations[i].long]; 
        place.name = locations[i].name;
        places.push(place);
    }
}
//http://stackoverflow.com/questions/15794472/jvectormap-draw-lines-between-markers
$(function(){
  var map = $('#europe-map-markers').vectorMap({
    map: 'europe_mill',
    scaleColors: ['#C8EEFF', '#0071A4'],
    normalizeFunction: 'polynomial',
    hoverOpacity: 0.7,
    hoverColor: false,
    markerStyle: {
      initial: {
        fill: '#F8E23B',
        stroke: '#383f47'
      }
    },
    backgroundColor: '#383f47',
    markers: places
  });

var map = $('#europe-map-markers').vectorMap('get', 'mapObject');
    
var draw = SVG('path-map-markers'); //.size(600, 400);

for(var i = 0; i < places.length - 1; i++){
    var coords1 = map.latLngToPoint(places[i].latLng[0],places[i].latLng[1]);
    var coords2 = map.latLngToPoint(places[i+1].latLng[0],places[i+1].latLng[1]);
    draw.path().attr({ fill: 'none',stroke: '#c00', 'stroke-width': 2 }).M(coords1.x, coords1.y).L(coords2.x, coords2.y);
    console.log(places[i].latLng[0] + " " + places[i].latLng[1] + "-"  + places[i+1].latLng[0] + " " + places[i+1].latLng[1]);
}

});
*/ // jvectormap end









/*
var locs = {};
// country -> province -> name

for(i = 0; i < locations.length; i++){
    if(!locs[locations[i]['country']]){
//    if(typeof locs[locations[i].country] == 'undefined')
        locs[locations[i].country] = {};
        locs[locations[i].country].frequency = 0;
    }
    

//    if(locs[locations[i]['province']]){
//        console.log("if " + locs[locations[i]['province']]);
//        if(!locs[locations[i].country][locations[i]['province']]){
//            locs[locations[i].country][locations[i]['province']] = {};
//            locs[locations[i].country][locations[i]['province']].frequency = 0;
//        }
//    }


    if(locs[locations[i]['name']]){
        console.log("if " + locs[locations[i]['name']]);
        if(!locs[locations[i].country][locations[i]['name']]){
            locs[locations[i].country][locations[i]['name']] = {};
            locs[locations[i].country][locations[i]['name']].frequency = 0;
        }
        ++locs[locations[i].country][locations[i]['name']].frequency;
    }
    
 
    
    ++locs[locations[i].country].frequency;

}

console.log(locs);

*/








/*
// counting in a recursive / functional way
// http://stackoverflow.com/questions/5667888/counting-the-occurrences-of-javascript-array-elements
var locs = locations.reduce(function(acc, curr){
    if(typeof acc[curr.country] == 'undefined'){
        acc[curr.country] = 1;
    }else{
        acc[curr.country] += 1;
    }
    return acc;
},{});
*/





/*
var locs = {};

for(var i = 0; i < locations.length; i++){
//    console.log(locations[i].name);
    n = locations[i].name;

    if(typeof locs.n == 'undefined'){
        locs.n = n;
        locs.n.frequency = 1;
//        locs.locations[i].name.freq = 1;        
    }
    else{
        locs.n.frequency = locs.n.frequency + 1;
    }
       
}

*/




var personsarray = [];
for(var i = 0; i < persons.length; i++){
        if( ($.type(persons[i].birth_year) !== "null") && ($.type(persons[i].death_year) !== "null")){
console.log(persons[i]);
    var person = {};
    person.id = persons[i].id;
    person.start = persons[i].birth_year; // Date(persons[i].birth_year, 0, 0);
    person.end = persons[i].death_year; // Date(persons[i].death_year, 0, 0);
    person.content = persons[i].name;
    person.title = persons[i].description + "\n" + person.start + "-" + person.end;
    personsarray.push(person);
        }
            
        }

  // DOM element where the Timeline will be attached
  var container = document.getElementById('persons');

  // Create a DataSet (allows two way data-binding)
  var items = new vis.DataSet(personsarray);

  // Configuration for the Timeline
  var options = {};

  // Create a Timeline
  var timeline = new vis.Timeline(container, items, options);
