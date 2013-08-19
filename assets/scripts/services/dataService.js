angular.module("appService", [])
	.factory('dataService',['$http', function($http){
		var mongoLabUrl = 'https://api.mongolab.com/api/1/databases/t_website/collections/';
		return {
			getAboutContent : function(callback){
				$http({
					url:mongoLabUrl+'t_about?apiKey=Ty71bCX96vKu8p9bjK2dX2OMqZa2Lk3I',
					method :'GET',
					headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
				}).success(callback);
			},

			getResumeContent : function(callback){
				$http({
					url:mongoLabUrl+'t_resume?apiKey=Ty71bCX96vKu8p9bjK2dX2OMqZa2Lk3I',
					method :'GET',
					headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
				}).success(callback);
			},

			getWorkContent : function(callback){
				$http({
					url:mongoLabUrl+'t_workExperience?apiKey=Ty71bCX96vKu8p9bjK2dX2OMqZa2Lk3I',
					method :'GET',
					headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
				}).success(callback);
			}
		}
}]);

