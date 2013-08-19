var express = require('express');
var app = express();

/**index page**/
app.get('/',function(request,response){
	response.sendfile('./views/index.html');
});

/**other pages**/
var page;
app.get('/views/:page',function(request,response){
	response.sendfile('./views/'+request.params.page);
});

app.use(express.bodyParser());

/*All assets like js/css/image files are loaded from the assets folder*/
app.use(express.static('assets')); 

app.listen(process.env.VCAP_APP_PORT||3000);

console.log('Launching draggons into outerspace..');
setTimeout(function(){
	console.log('Server started successfully..');
},1000);
