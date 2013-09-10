function adminCtrl($scope,$rootScope,$window,dataService){
	
	$rootScope.flags.loading = true;
	
	dataService.getAboutContent(function(response){
		if(response){
			$rootScope.flags.loading = false;
			$scope.aboutContent = response[0].pageData;
		}else{
			$scope.aboutContent = 'Unable to load data. Please try again.';
		}
	});
	$rootScope.flags.loading = true;
	dataService.getWorkContent(function(response){
		if(response){
			$rootScope.flags.loading = false;
			$scope.workContent = response[0].pageData.content.workExperience;
		}else{
			$scope.workContent = 'Unable to load data. Please try again.';
		}
	});
	$rootScope.flags.loading = true;
	dataService.getResumeContent(function(response){
		if(response){
			$rootScope.flags.loading = false;
			$scope.resumeContent = response[0].pageData.skills;
		}else{
			$scope.resumeContent = 'Unable to load data. Please try again.';
		}
	});
}
adminCtrl.inject = ['$scope','$rootScope','$window','dataService'];