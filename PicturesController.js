(function(){

    var app = angular.module("edelfeltViewer");

    count = function(ary, classifier){
	return ary.reduce(function (counter,item){
	    var p = (classifier || String)(item);
	    counter[p] = counter.hasOwnProperty(p) ? counter[p] + 1 : 1;
	    return counter;
	}, {})
    }

    var PicturesController = function($scope, $http){
	var url = "http://edelfelt.sls.fi/api/pictures/?format=jsonp&callback=JSON_CALLBACK";
	$http.jsonp(url)
	    .success(function(data, status){
		var pictureData = data.results;

		var pictureTypes = count(pictureData,
					 function(item){
					     return item.type;
					 });

		var pictureArray = [];
		var picture = {};
		for(var key in pictureTypes){
		    picture = {};
		    picture["type"] = key;
		    picture["frequency"] = pictureTypes[key]
		    pictureArray.push(picture);
		}

		var chart = AmCharts.makeChart("picturechart",{
		    "type" : "pie",
		    "dataProvider": pictureArray,
		    "valueField": "frequency",
		    "titleField": "type",
		    "labelText": "[[type]]",
		    "export": {"enabled": true},
		    "radius": "30%" 
		});
	    })
	    .error(function(data, status){
		console.log("error");
	    });
    }
    app.controller("PicturesController", PicturesController);
    
}());

 
