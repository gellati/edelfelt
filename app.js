(function(){
    var app = angular.module('edelfeltViewer', ["ngRoute", "ngAnimate"]);

    app.config(function($routeProvider) {
	$routeProvider
	    .when('/main', {
		templateUrl: 'main.html',
		controller: 'MainController'
	    })
	    .when('/persons',{
		templateUrl: 'persons.html',
		controller: 'PersonsController'
	    })

	    .when('/locations',{
		templateUrl: 'locations.html',
		controller: 'LocationsController'
	    })
	    .when('/letters',{
		templateUrl: 'letters.html',
		controller: 'LettersController'
	    })
	    .when('/pictures',{
		templateUrl: 'pictures.html',
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
