function loginCtrl($scope,$rootScope,dataService,$window){
	
	$rootScope.flags.loading = true;
	$rootScope.flags.loading = false;

	$scope.checkLogin = function(){

		var password = md5($scope.password);
		var user = {
			'username':$scope.username,
			'password':password,
			'redirectTo':$window.location.search.split('?redir=/')[1]
		};

		dataService.checkLogin(user,function(response){
			console.log(response);
			if(response){
				window.location = response;
			}
		});
	};
}
loginCtrl.inject = ['$scope','$rootScope','$window','dataService','$window'];