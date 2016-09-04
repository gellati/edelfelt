(function(){
    var app = angular.module('edelfeltViewer', ["ngRoute", "ngAnimate"]);

    app.config(function($routeProvider) {
      var viewsDir = 'scripts/views/'
	$routeProvider
	    .when('/main', {
		templateUrl: viewsDir + 'main.html',
		controller: 'MainController'
	    })
	    .when('/persons',{
		templateUrl: viewsDir + 'persons.html',
		controller: 'PersonsController'
	    })

	    .when('/locations',{
		templateUrl: viewsDir + 'locations.html',
		controller: 'LocationsController'
	    })
	    .when('/letters',{
		templateUrl: viewsDir + 'letters.html',
		controller: 'LettersController'
	    })
	    .when('/pictures',{
		templateUrl: viewsDir + 'pictures.html',
		controller: 'PicturesController'
	    })

	    .otherwise({
		redirectTo: '/main'
	    })
    });


    app.run(function($rootScope, $window){
	$rootScope.slide = '';
	$rootScope.$on('$routeChangeStart', function(){
	    $window.history.back = function(){
		$rootScope.slide = 'slide-right';
		$window.history.back();
	    }
	    $rootScope.next = function(){
		$rootScope.slide = 'slide-left';
	    }
	    });
    });


}());



	/*
        resolve: {
            initializeData: function($q, $timeout, myService) {
                return myService.promiseToHaveData();
            }
	}
*/
