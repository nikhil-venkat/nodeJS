exports.getPageContent = function(collection,res) {
		collection.find().toArray(function (err, data) {
				var payload;
				if (err) {
					throw err;
				}
				if (data) {
					payload = JSON.stringify(data);
					res.writeHead(200, {
						'Content-Type': 'application/json'
					});
				}else{
					res.writeHead(404,{
						'Content-Type':'application/json'
					});
				}
				res.end(payload);
		});
};

exports.getAboutContent = function(collection,res,req){
	
		collection.find().toArray(function (err, data) {
			var payload;
			if (err) {
				throw err;
			}
			
			if (data){
				payload = JSON.stringify(data);
				res.writeHead(200, {
					'Content-Type': 'application/json'
				});
			}else{
				res.writeHead(404,{
					'Content-Type':'application/json'
				});
			}
			res.end(payload);
		});
		
		
};

exports.getResumeContent = function(collection,res){
	
		collection.find().toArray(function (err, data) {
			var payload;
			if (err) {
				throw err;
			}
			if (data){
				
				payload = JSON.stringify(data);
				res.writeHead(200, {
					'Content-Type': 'application/json'
				});
			}else{
				res.writeHead(404,{
					'Content-Type':'application/json'
				});
			}
			res.end(payload);
		});
};

exports.getWorkContent = function(collection,res){
	
		collection.find().toArray(function (err, data) {
			var payload;
			if (err) {
				throw err;
			}
			if (data){
				
				payload = JSON.stringify(data);
				res.writeHead(200, {
					'Content-Type': 'application/json'
				});
			}else{
				res.writeHead(404,{
					'Content-Type':'application/json'
				});
			}
			res.end(payload);
	});
};
