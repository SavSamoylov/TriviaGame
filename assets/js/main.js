// You'll create a trivia game that shows only one question until the player answers it or their time runs out.

// If the player selects the correct answer, show a screen congratulating them for choosing the right option.

// After a few seconds, display the next question -- do this without user input.

// The scenario is similar for wrong answers and time-outs.

// If the player runs out of time, tell the player that time's up and display the correct answer. 

// Wait a few seconds, then show the next question.

// If the player chooses the wrong answer, tell the player they selected the wrong option and then display 
// the correct answer. Wait a few seconds, then show the next question.

// On the final screen, show the number of correct answers, incorrect answers, and an option to 
// restart the game (without reloading the page).

var questions = [
	{
		question: "Question #1?",
		answers: ["answer1.1", "answer1.2", "answer1.3", "answer1.4"],
		correctAnswer: 1
	},
	{
		question: "Question #2?",
		answers: ["answer2.1", "answer2.2", "answer2.3", "answer2.4"],
		correctAnswer: 2
	},
	{
		question: "Question #3?",
		answers: ["answer3.1", "answer3.2", "answer3.3", "answer3.4"],
		correctAnswer: 3
	},
	{
		question: "Question #4?",
		answers: ["answer4.1", "answer4.2", "answer4.3", "answer4.4"],
		correctAnswer: 4
	}
]

var quiz = {
	correct: 0,
	incorrect: 0,
	counter: 30,
	questionCount: 0,
	questionInterval: null ,
	startQuiz: function (){
		$(".startButton").on("click", function (){
			//Remove Game Start Button
			$(".startButton").hide();
			quiz.displayQuestion();
		})
	},
	displayQuestion: function(){
		
		$(".feedbackField").empty();


		// Load Question and Answers
		if (questions[quiz.questionCount] !== undefined){

			$(".quizTimer").html("Time remaining: "+quiz.counter+" seconds");
			var questionTimer = setInterval(quiz.startCounter, 1000);

			// Display Question
			$(".question").append(questions[quiz.questionCount].question);
			// Display Answer Choices
			for (var i = 0; i < questions[quiz.questionCount].answers.length; i++){
				var $answer = $("<div class='answer' id="+(i+1)+">");
				$("#answerField").append($answer);
				$($answer).append(questions[quiz.questionCount].answers[i]);
			}
		} else {
			//Display end screen.
			quiz.endScreen();
				
		}

		// Create onclick event that checks if the selected answer is correct, increases correct and incorrect count,
		// shows result of the users choice and loads the next question. 
			$(".answer").on("click", function(){
			//Stop counter
			clearInterval(questionTimer);
			var correct = questions[quiz.questionCount].correctAnswer;
			//console.log($(this).attr("id"));
			if (correct === parseInt($(this).attr("id"))){
				console.log("That is correct Sir!");
				// If correct, display "Congratulations Message" Field Message.
				$(".feedbackField").html("Congratulations!");
				quiz.correct++;
				// Load next question;
				questionInterval = setInterval(quiz.nextQuestion, 500);	 
			} else {
				console.log("Not so fast you fiend!");
				$(".feedbackField").html("Not so fast you fiend! The correct Answer was "+questions[quiz.questionCount].answers[correct-1]);
				quiz.incorrect++;
				questionInterval = setInterval(quiz.nextQuestion, 500);		
			}
			})
	},
	nextQuestion: function(){
		quiz.counter = 30;
		clearInterval(questionInterval);
		$(".question").empty();
		$("#answerField").empty();
		$(".feedbackField").empty();
		quiz.questionCount++;
		quiz.displayQuestion();
	},
	endScreen: function(){
		quiz.counter = 30;
		$(".feedbackField").html("You got "+quiz.correct+" questions correct, and "+quiz.incorrect+" questions incorrect.");
		$(".startButton").show();
		$(".quizTimer").html("");
		quiz.questionCount = 0; 
		quiz.correct = 0; 
		quiz.incorrect = 0; 	},
	startCounter: function(){
		$(".quizTimer").html("Time remaining: "+quiz.counter+" seconds")
		quiz.counter--;
	},
}

quiz.startQuiz();