//Requirements
var express = require('express');
var app = express();
var request = require('request');

//Middlewear
//Names public file
app.use(express.static('public'));

//THIS TAKES VERSE REQUEST FROM APP.JS, SENDS IT TO THE SITE, THEN RETURNS IT TO APP.JS

//When /bible route is hit, request data from path
app.get('/bible', function (req, res) {
	request('http://www.esvapi.org/v2/rest/passageQuery?key=IP&passage=John+1+1', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var begIndex = body.indexOf("</span>")
			console.log("beginning index = " + begIndex);
			var endIndex = body.indexOf("(<a");
			console.log("ending index = " + endIndex);
			var substring = body.substring((begIndex + 7), endIndex);
			console.log ("substring = " + substring);
			res.send(substring);
		};
	});
});

//Controllers
var versesController = require('./controllers/verses.js')
app.use('/verses', versesController);

//listen on localhost:3000
app.listen(3000, function(){
	console.log('listening!')
})