function aboutCtrl($scope,$rootScope,$window,dataService){
	
	$rootScope.flags.loading = true;
	$rootScope.flags.loading = false;

	var callback = function(response){
		$scope.content = response[0].pageData.content;
	}
	dataService.getAboutContent(callback);

}
aboutCtrl.inject = ['$scope','$rootScope','$window','dataService'];