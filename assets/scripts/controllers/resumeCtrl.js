function resumeCtrl($scope,$rootScope,dataService){

	$rootScope.flags.loading = true;
	$rootScope.flags.loading = false;

	$scope.showResume = function(){
		$scope.showResume = true;
	}

	dataService.getResumeContent(function(response){
		if(response){
			$scope.content = response[0].pageData.skills;
		}
	});
}
resumeCtrl.inject = ['$scope','$rootScope','dataService'];