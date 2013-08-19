function feedbackCtrl($scope,$rootScope){
	$rootScope.flags.loading = true;
	$rootScope.flags.loading = false;
}
feedbackCtrl.inject = ['$scope','$rootScope'];