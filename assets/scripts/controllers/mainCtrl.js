function mainCtrl($scope,$rootScope,$window){
	$scope.myName = 'Nikhil Venkat';
	$rootScope.flags.loading = true;

	$scope.templateLoaded = function(){
		setTimeout(function(){
			$scope.$emit('templateLoaded',true);
		},500);
	}

	$scope.$on('templateLoaded',function(event,templateLoaded){
		if(templateLoaded){
			var hash;
			hash = $window.location.hash.split('#/')[1];
			if(!hash){
				hash = 'home';
			}
			$rootScope.setActiveTab(hash);		
			$rootScope.flags.loading = false;
			
			
		}
	});
	
}
mainCtrl.inject = ['$scope','$rootScope','$window'];




