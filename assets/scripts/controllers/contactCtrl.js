function contactCtrl($scope,$rootScope){
	
	$rootScope.flags.loading = true;
	$rootScope.flags.loading = false;
}
contactCtrl.inject = ['$scope','$rootScope'];