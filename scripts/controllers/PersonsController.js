(function(){

  var app = angular.module("edelfeltViewer");

  var PersonsController = function($scope, $http){
    //	var url = "http://edelfelt.sls.fi/api/persons/?format=json";
    var baseUrl = "http://edelfelt.sls.fi"

    var urlp = baseUrl + "/api/persons/?format=jsonp&callback=JSON_CALLBACK";
    $http.jsonp(urlp)
    .success(function(data, status){
      //		console.log(response);


      //		$scope.personData = data.results;


      var personData = data.results;

      // persons in the database
      var personsArray = [];
      var person = {};

      // people that to the timeline
      var historicalPersonsArray = [];
      var h = {};

      for(var i = 0; i < personData.length; i++){
        if( ($.type(personData[i].birth_year) !== "null") && ($.type(personData[i].death_year) !== "null")){
          //  console.log(persons[i]);
          person = {};
          //	console.log(personData[i].type);
          person.id = personData[i].id;


          person.name = personData[i].name;
          person.birth = personData[i].birth_year;
          person.death = personData[i].death_year;
          person.link = personData[i].web_url;
          person.type = personData[i].type;


          person.title = personData[i].description + "\n" + person.start + "-" + person.end;
          // push object onto array
          personsArray.push(person);


          // data for the time axis
          // filter out those without birth or death years
          if(personData[i].type === 'contemporary' && personData[i].birth_year !== "" && personData[i].death_year !== ""){
            h = {};
            h.content = personData[i].name;
            h.end = personData[i].death_year; // Date(persons[i].death_year, 0, 0);
            h.start = personData[i].birth_year; // Date(persons[i].birth_year, 0, 0);
            historicalPersonsArray.push(h);
          }

        }
      }

      $scope.persons = personsArray;


      // custom filters to get persons belonging to specific categories
      $scope.contemporaryFilter = function(item){
        return item.type === 'contemporary';
      };
      $scope.historicalFilter = function(item){
        return item.type === 'historical';
      };
      $scope.mythologicalFilter = function(item){
        return item.type === 'mythological';
      };


      // create the timeline for contemporary figures
      // DOM element where the Timeline will be attached
      var container = document.getElementById('personstimeline');

      // Create a DataSet (allows two way data-binding)
      var items = new vis.DataSet(historicalPersonsArray);

      // Configuration for the Timeline
      var options = {};

      // Create a Timeline
      var timeline = new vis.Timeline(container, items, options);


    })
    .error(function(data, status){
      console.log("error");
    });

  }
  app.controller("PersonsController", PersonsController);

}());
