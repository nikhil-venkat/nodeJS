function resumeCtrl($scope,$rootScope,dataService){

	$rootScope.flags.loading = true;
	$rootScope.flags.loading = false;

	$scope.showResume = function(){
		$scope.showResume = true;
	}

	var callback = function(response){
		$scope.content = response[0].pageData.skills;
	}
	dataService.getResumeContent(callback);
}
resumeCtrl.inject = ['$scope','$rootScope','dataService'];