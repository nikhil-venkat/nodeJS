function homeCtrl($scope,$rootScope,$window){
	
	$rootScope.flags.loading = true;
	$rootScope.flags.loading = false;

}
homeCtrl.inject = ['$scope','$rootScope','$window'];