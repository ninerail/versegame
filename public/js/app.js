var app = angular.module('versinator', []);

app.controller('VerseController', ['$http', '$scope', function($http, $scope) {
	var controller = this;
	controller.newgame = true;

	// SET UP THE BOARD TO PLAY A QUESTION

	// GET A RANDOM BOOK AFTER A SHORT DELAY
		setTimeout(function(){
			console.log("DELAY OVER")			
		},1000);

	$scope.question = function() {

	//INITIAL VALUES
	var randomBook;
	var randomChapter;
	var randomVerse;
	var options = [];
	controller.newgame = false;

	//FIND A RANDOM NUMBER BETWEEN 0 AND 65 TO DETERMINE BOOK
	var booknum = Math.floor(Math.random() * 66) + 1;

	//GET THE CORRESPONDING BOOK
	randomBook = bibleIndex[booknum][0];

	//FIND A RANDOM NUMBER BETWEEN 0 AND MAX CHAPTER IN BOOK
	randomChapter = Math.floor(Math.random() * (bibleIndex[booknum][1])) + 1;
	// randomChapter = 1

	//FIND NUMBER OF VERSES IN CHAPTER
	var maxVerses = bibleIndex[booknum][randomChapter + 1];

	//FIND A RANDOM NUMBER BETWEEN 0 AND MAX VERSE IN CHAPTER
	randomVerse = Math.floor(Math.random() * maxVerses) + 1;

	// console.log(randomBook + " " + randomChapter + ":" + randomVerse);

	//GET THE TEXT FOR THE VERSE
	$http({
		url: '/bible/' + randomBook + '/' + randomChapter + '/' + randomVerse,
		method: 'GET',
	}). then(function(response) {
		controller.text = response.data
	})

	//RETURNS THE VERSE THAT WAS LOOKED UP
	controller.answerVerse = randomBook + " " + randomChapter + ":" + randomVerse;
	controller.book = randomBook;
	//SETS UP THE SIX OPTIONS
	//PUSH CORRECT ANSWER TO OPTIONS ARRAY
	options.push(randomBook);
	
	//RANDOMIZE INCORRECT BOOK, CHECK THAT IT HASN'T BEEN PICKED YET, AND PUSH IT TO THE ARRAY
	for (var i = 0; i < 6; i++){
		var match = false;
		
		//GET A NEW RANDOM BOOK
		var newBook = getRandomBook();

		//IS THE NEW BOOK CURRENTLY IN THE ARRAY?
		for (var j = 0; j < options.length; j++) {
			if (newBook === options[j]) {
				match = true
			}
		};

		// IF NOT IN ARRAY ALREADY, PUSH IT TO THE ARRAY
		if (!match) {
			options.push(newBook);
		}
	};

		//SHUFFLE THE ARRAY
		shuffle(options);

		//SEND BACK TO INDEX
		controller.options = options;
		controller.correct = randomBook;
	}

	//CHECK IF ANSWER IS RIGHT OR WRONT
	$scope.evaluate = function(answer) {
		if (answer === controller.book) {
			console.log("Right you are!");
			controller.answer = "Right you are!"
		} else {
			console.log("That is not the right answer");
			controller.answer = "That is not the right answer."
		}
		
	}

}]);




