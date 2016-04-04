//Requirements
var express = require('express');
var app = express();
var request = require('request');

//Middlewear
//Names public file
app.use(express.static('public'));

//THIS TAKES VERSE REQUEST FROM APP.JS, SENDS IT TO THE SITE, THEN RETURNS IT TO APP.JS

//When /bible route is hit, request data from path
app.get('/bible/:book/:chapter/:verse', function (req, res) {

	//SEND REQUEST TO ESV.ORG
	request('http://www.esvapi.org/v2/rest/passageQuery?key=cc78384c103e308c&include-footnotes=false&passage=' + (req.params.book) + '+' + (req.params.chapter) + '+' + (req.params.verse), function (error, response, body) {
		
		//IF NO ERROR
		if (!error && response.statusCode == 200) {

			//FIND INDEX OF SPAN TAG THAT INDICATES BEGINNING OF TEXT
			var begIndex = body.indexOf("</span>")

			//FIND INDEX OF PAREN THAT INDICATES END OF TEXT
			var endIndex = body.indexOf("(");

			//the verse starting seven characters after the beginning of the span tag
			var verseText = body.substring((begIndex + 7), endIndex);	

			//CLEAN UP <HTML> TAGS IN TEXT
			//SET UP AN EMPTY STRING FOR CLEAN TEXT
			var cleanText = "";
			var scrub = false

			//LOOP OVER LETTERS IN TEXT		
			for (var i=0; i<verseText.length; i++) {
				
				//beginning of tag or "&" turns scrubber on
				if (verseText[i] === "<" || verseText[i] === "&") {
					scrub = true;
					//add a space
					cleanText+=" ";
				};

				//if scrubber is off, add letter to clean text
				if (!scrub) {
					cleanText += (verseText[i]);
				};

				//ending of tag or ";" turns scrubber off
				if (verseText[i] === ">" || verseText[i] === ";") {
					scrub = false;
				};
			};

			//SEND CLEAN TEXT BACK TO CONTROLLER
			res.send(cleanText);
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