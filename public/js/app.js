var app = angular.module('versinator', []);

app.controller('VerseController', ['$http', '$scope', function($http, $scope) {

	$scope.lookup = function(verse) {

	
		$http({
			url: '/bible',
			method: 'GET'
		}). then(function(response) {
			console.log('Verse: ', response.data);
		})
	};
}]);
