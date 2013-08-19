function workCtrl($scope,$rootScope,dataService){
	
	var callback = function(response){
		$scope.content = response[0].pageData.content;
	}
	dataService.getWorkContent(callback);	
}
workCtrl.inject = ['$scope','$rootScope','dataService'];