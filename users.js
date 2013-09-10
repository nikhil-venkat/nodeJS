var users = [
	{
		username:'admin',
		password:'72adc15352810c6d960fea7edb398c77'
	}
];

exports.authenticate = function(req){
	
	var length = users.length;
	var user = [];
	for(var i=0; i < length; i++){
		if (req.username === users[i].username && req.password === users[i].password){
			user.push(users[i]);
		}
	}
	return user;

};


