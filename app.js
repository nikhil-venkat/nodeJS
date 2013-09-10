var express = require('express'),
http = require('http'),
url = require('url'),
mongodb = require('mongodb'),
ObjectID = mongodb.ObjectID,
fs = require('fs'),
app = express();


//app.use(express.bodyParser());
app.use(express.bodyParser({ keepExtensions: true, uploadDir: 'assets/files' }));
//All assets like js/css/image files are loaded from the assets folder
app.use(express.static('assets'));

/**Session configs**/
var MemStore = require('connect/lib/middleware/session/memory');
app.use(express.cookieParser("secretKey"));
app.use(express.session({store:MemStore({
	reapInterval:6000
})}));

//dataModel is our database connection service
var dataModel = require('./dataModel');

var users = require('./users');

//MongoDB connection settings for appfog 
if(process.env.VCAP_SERVICES){
	var service_type = "mongodb-1.8";
	var json = JSON.parse(process.env.VCAP_SERVICES);
	var credentials = json[service_type][0]["credentials"];
	var server = new mongodb.Server( credentials["host"], credentials["port"]);
  	var db = new mongodb.Db( credentials["db"], server, {} );
  		db.open( function(err,client) {
    		client.authenticate( credentials["username"], credentials["password"], function(err,replies) { 
    	});
  	});

}
else{
    
	// MongoDB connection settings for local.
	process.env.MONGODB_HOST = '127.0.0.1';
	process.env.MONGODB_PORT = 27017;
	process.env.MONGODB_DB = 'Website';

	// Connect to our MongoDB server.
	var mongoServer = new mongodb.Server(process.env.MONGODB_HOST, process.env.MONGODB_PORT, {});

	// Open  MongoDB database.
	var db = new mongodb.Db(process.env.MONGODB_DB, mongoServer, {w: 0});
	db.open(function (err) {
		if (err) {
			throw err;
		}
	});
}


function requiresLogin(req,res,next){
	if(req.session.user){
		next();
	}else{
		res.redirect('/login?redir=' + req.url);
	}
}

//index page
app.get('/',function(req,res){
	res.sendfile('./views/index.html');
});

/**other pages**/
app.get('/views/:page',function(req,res){
	res.sendfile('./views/'+req.params.page);
});

//Login page
app.get('/login',function(req,res){
	res.sendfile('./views/login.html');
});

//check login
app.post('/login',function(req,res){
	
	var user = users.authenticate(req.body);
	if(user.length !== 0){
		req.session.user = user;
		var redirectTo = req.body.redirectTo;
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});
		res.end(redirectTo);
	}else{
		var redirectTo = '/loginFailed';
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});
		res.end(redirectTo);
	}
});

app.get('/getLoggedInUser',function(req,res){
	
	if(req.session.user){
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});
		res.end(req.session.user);
	}
	
});

//Login page
app.get('/loginFailed',function(req,res){
	res.sendfile('./views/loginFailed.html');
});


//logout
app.get('/logout',function(req,res){
	req.session.user = '';
	res.sendfile('./views/logout.html');
});


//Get about page contents
app.get('/about',function(req,res){
	var parts = url.parse(req.url, true);
	var query = parts.query;
	if (req.method === 'GET') {
			var collection =  db.collection('C_About', function (err, col) {
			if (err) {
				throw err;
			}
			console.log('fetching data from ',col.collectionName);
				dataModel.getAboutContent(col,res);
			});
	}
});


//Get resume page contents
app.get('/resume',function(req,res){

	var parts = url.parse(req.url, true);
	// Extract query.
	var query = parts.query;
	if (req.method === 'GET') {
			
		var collection =  db.collection('C_Resume', function (err, col) {
		if (err) {
			throw err;
		}
		console.log('fetching data from ',col.collectionName);
		dataModel.getResumeContent(col,res);
		});
	}
});


//Get work page contents
app.get('/work',function(req,res){

	var parts = url.parse(req.url, true);
	// Extract query.
	var query = parts.query;
	if (req.method === 'GET') {
		var collection =  db.collection('C_Work', function (err, col) {
			if (err) {
				throw err;
			}
			console.log('fetching data from ',col.collectionName);
			dataModel.getWorkContent(col,res);
		});
	}
});



/**admin pages**/
app.get('/admin', requiresLogin, function(req,res){

	//console.log('loading admin');
	
	// Extract URL parts.
	var parts = url.parse(req.url, true);
	// Extract query.
	var query = parts.query;

	if (req.method === 'GET') {
        // Open our collection of documents.

		
			var collection =  db.collection('C_About', function (err, col) {
				if (err) {
					throw err;
				}
				// var data = {
				// 	pageData: "I have a passion for Front End Engineering and I love working with HTML/Javascript/CSS . When I am not working I hang out with my wife or play console games. I have a bachelors degree in Information Technology and a Masters Degree in Computer Science from <a href=\"http://www.usc.edu/\" target=\"_blank\">USC</a>. I am a huge house music fan. Feel free to check out links to a few sets i made on <a href=\"https://soundcloud.com/nikhilv-1\" target=\"_blank\">soundcloud</a>. I like opensource and I own an i-phone <a href=\"http://www.reactiongifs.com/wp-content/uploads/2013/08/eminem-apathy1.gif\" target=\"_blank\">Thats right!</a>"
				// };
				// col.update({ _id: ObjectID('522d56c1526c7d165b000001') }, { $set: data});
				// var data = {
				// pageData: "I have a passion for Front End Engineering and I love working with HTML/Javascript/CSS . When I am not working I hang out with my wife or play console games. I have a bachelors degree in Information Technology and a Masters Degree in Computer Science from <a href=\"http://www.usc.edu/\" target=\"_blank\">USC</a>. I am a huge house music fan. Feel free to check out links to a few sets i made on <a href=\"https://soundcloud.com/nikhilv-1\" target=\"_blank\">soundcloud</a>. I like opensource and I own an i-phone <a href=\"http://www.reactiongifs.com/wp-content/uploads/2013/08/eminem-apathy1.gif\" target=\"_blank\">Thats right!</a>"		
				// };
				// col.insert({
				// pageData: "I have a passion for Front End Engineering and I love working with HTML/Javascript/CSS . When i am not working I hang out with my wife or play console games. I have a bachelors degree in Information Technology and a Masters Degree in Computer Science from <a href=\"http://www.usc.edu/\" target=\"_blank\">USC</a>. I am a huge house music fan. Feel free to check out links to a few sets i made on <a href=\"https://soundcloud.com/nikhilv-1\" target=\"_blank\">soundcloud</a>. I like opensource and I own an i-phone <a href=\"http://www.reactiongifs.com/wp-content/uploads/2013/08/eminem-apathy1.gif\" target=\"_blank\">Thats right!</a>"
				// });
				// col.update(query, data, function (err, data) {
				// 	var payload;
				// 	if (err) {
				// 		throw err;
				// 	}
				// 	console.log('result',data);
				// 	if(data){
				// 		payload = JSON.stringify(data);
				// 		console.log('payload',payload);
				// 	}
				// 	//
				// 	res.end(payload);
				// });
				
			});


		

			//console.log('displaying data for ',col.collectionName);
			//Clearing the collection
			//col.drop();
			
			//Insert into about collection.
			// col.insert({
			// 	pageData: "I have a passion for Front End Engineering and I love working with HTML/Javascript/CSS . When i am not working I hang out with my wife or play console games. I have a bachelors degree in Information Technology and a Masters Degree in Computer Science from <a href=\"http://www.usc.edu/\" target=\"_blank\">USC</a>. I am a huge house music fan. Feel free to check out links to a few sets i made on <a href=\"https://soundcloud.com/nikhilv-1\" target=\"_blank\">soundcloud</a>. I like opensource and I own an i-phone <a href=\"http://www.reactiongifs.com/wp-content/uploads/2013/08/eminem-apathy1.gif\" target=\"_blank\">Thats right!</a>"
			// });
			
			
        	//Insert into resume collection.
			// col.insert(
			// 	{
			// 	pageData: {
			//         skills: [
			//             {
			//                 "title": "Web Technologies",
			//                 "skills": "HTML, CSS, JavaScript, jQuery ,Angular JS, HTML5 , CSS3, SASS, JSP, JSON , XML, XSL, AJAX"
			//             },
			//             {
			//                 "title": "Database",
			//                 "skills": "MySQL, MS Access,mongolab"
			//             },
			//             {
			//                 "title": "Servers and Tools",
			//                 "skills": "CodeIgniter, Wordpress, Sublime Text, Git , Svn , Photoshop CS4, Apache Tomcat"
			//             },
			//             {
			//                 "title": "Operating System ",
			//                 "skills": "Mac OS Windows 95 & above"
			//             },
			//             {
			//                 "title": "MISC / Bug Tracking",
			//                 "skills": "Bugzilla, JIRA, Reviewboard"
			//             }
			//         ]
   //  			}
   //  		});
			
			//insert into work table
			// col.insert(
			// 	{
			// 		pageData:{
			// 			content:{
			// 				workExperience : [
			// 						{
			// 							"company": "Jobvite",
			// 							"url": "http://recruiting.jobvite.com/",
			// 							"title": "Software UI Engineer",
			// 							"summary": "Working on Angular JS, SASS, HTML5, CSS3",
			// 							"period": "Jan 2012 -current"
			// 					},
			// 					{
			// 							"company": "Gala-Net Inc",
			// 							"url": "http://company.webzen.com/eng/",
			// 							"title": "Front End Web Developer",
			// 							"summary": "PHP, Javascript, HTML, CSS, jQuery",
			// 							"period": "Oct 2010 - Jan 2012"
			// 					},
			// 					{
			// 							"company": "Eyemagine",
			// 							"url": "http://www.eyemaginetech.com/",
			// 							"title": "Jr Software Developer",
			// 							"summary": "Worked on Magento Ecommerce framework (PHP), Elgg(open source social networking engine), Javascript, HTML, CSS, jQuery",
			// 							"period": "June 2010 - Oct 2010"
			// 					}
			// 		        ]
			// 			}
			// 		}
   //  			}	
			// 	);
			

			//dataModel.getAboutContent(col,res,req);
			//res.sendfile('./views/admin.html');
			//console.log(result);
			//res.set('Content-Type', 'applicatin/json');
			//res.end(result);
			//dataModel.getAboutContent(col,res,req);
			//dataModel.getWorkContent(col,res);
			//dataModel.getResumeContent(col,res);

        //});
		//res.sendfile('./views/admin.html');
    }
});

app.listen(process.env.VCAP_APP_PORT||3000);

console.log('Launching dragons into outerspace..');
setTimeout(function(){
	console.log('Server started successfully..');
},1000);
