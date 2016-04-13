(function(){

    var app = angular.module("edelfeltViewer");

    var MainController = function($scope, $interval, $location, $http){

	$scope.goToPersons = function(){
	    $location.path("/persons");
	}

	$scope.goToLocations = function(){
	    $location.path("/locations");
	}

	$scope.goToLetters = function(){
	    $location.path("/letters");
	}

	$scope.goToPictures = function(){
	    $location.path("/pictures");
	}

    }

    app.controller("MainController", MainController);

}());
