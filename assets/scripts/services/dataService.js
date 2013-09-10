angular.module("appService", [])
	.factory('dataService',['$http', function($http){
		var mongoLabUrl = 'https://api.mongolab.com/api/1/databases/t_website/collections/';
		return {
			getAboutContent : function(callback){
				$http({
					url:'/about',
					method :'GET',
					headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
				}).success(callback);
			},

			getResumeContent : function(callback){
				$http({
					url:'/resume',
					method :'GET',
					headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
				}).success(callback);
			},

			getWorkContent : function(callback){
				$http({
					url:'/work',
					method :'GET',
					headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
				}).success(callback);
			},
			checkLogin : function(postData,callback){
				$http({
					url : '/login',
					method :'POST',
					data : $.param(postData),
					headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
				}).success(callback);
			},
			getAdminContent : function(postData,callback){
				$http({
					url : '/admin',
					method :'GET',
					headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
				}).success(callback);
			},
			getLoggedInUser : function(callback){
				$http({
					url : '/getLoggedInUser',
					method :'GET',
					headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
				}).success(callback);
			}
		};
}]);

