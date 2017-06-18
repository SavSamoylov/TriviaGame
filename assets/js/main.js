$(document).ready(function (){

// An array of question objects.
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
		// Question Countdown Value.
		var counter = 30;
		// Clear any feedback messages from previous results page.
		$(".feedbackField").empty();


		// Load Question and Answers if we have a question left in the questions array.
		if (questions[quiz.questionCount] !== undefined){
			var correctA = questions[quiz.questionCount].correctAnswer;
			$(".quizTimer").html("Time remaining: "+counter+" seconds");
			var questionTimer = setInterval(startCounter, 1000);
			function startCounter (){
				$(".quizTimer").html("Time remaining: "+counter+" seconds")
				counter--;
				if (counter <= 0){
					clearInterval(questionTimer);
					console.log("Out of Time");
					$(".feedbackField").html("Time's Up! The correct Answer was "+questions[quiz.questionCount].answers[correctA-1]);
					quiz.incorrect++;
					quiz.questionInterval = setInterval(quiz.nextQuestion, 3000);		
				}
			}

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
			if (correctA === parseInt($(this).attr("id"))){
				// If correct, display "Congratulations Message" Field Message.
				$(".feedbackField").html("Congratulations!");
				quiz.correct++;
				// Load next question;
				quiz.questionInterval = setInterval(quiz.nextQuestion, 3000);	 
			} else {
				$(".feedbackField").html("Not so fast you fiend! The correct Answer was "+questions[quiz.questionCount].answers[correctA-1]);
				quiz.incorrect++;
				quiz.questionInterval = setInterval(quiz.nextQuestion, 3000);		
			}
			})


	},
	nextQuestion: function(){
		clearInterval(quiz.questionInterval);
		$(".question").empty();
		$("#answerField").empty();
		$(".feedbackField").empty();
		quiz.questionCount++;
		quiz.displayQuestion();
	},
	endScreen: function(){
		$(".feedbackField").html("You got "+quiz.correct+" questions correct, and "+quiz.incorrect+" questions incorrect.");
		$(".startButton").show();
		$(".quizTimer").html("");
		quiz.questionCount = 0; 
		quiz.correct = 0; 
		quiz.incorrect = 0; 	},
}

quiz.startQuiz();

});