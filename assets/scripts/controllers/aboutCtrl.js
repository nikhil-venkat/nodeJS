function aboutCtrl($scope,$rootScope,$window,dataService){
	
	$rootScope.flags.loading = true;
	$rootScope.flags.loading = false;

	dataService.getAboutContent(function(response){
		if(response){
			$scope.content = response[0].pageData;
		}else{
			$scope.content = 'Unable to load data. Please try again.'
		}
		
	});
}
aboutCtrl.inject = ['$scope','$rootScope','$window','dataService'];