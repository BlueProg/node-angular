
var scotchTodo = angular.module('scotchTodo', []);

function mainController($scope, $http) {
	$scope.formData = {};

	$http.get('/api/todos')
		.success(function(data) {
			$scope.todos = data;
		})
		.error(function(err) {
			console.log('Error: ' + err);
		})

	$scope.createTodo = function() {
		$http.post('/api/todos', $scope.formData)
			.success(function(data) {
				$scope.formData = {};
				$scope.todos = data;
				console.log(data);
			})
			.error(function(err) {
				console.log('Error: ' + err);
			})
	}
}