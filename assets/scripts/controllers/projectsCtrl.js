function projectsCtrl($scope,$rootScope){
	
	$rootScope.flags.loading = true;
	$rootScope.flags.loading = false;
}
projectsCtrl.inject = ['$scope','$rootScope'];