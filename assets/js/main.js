$(document).ready(function (){

// An array of question objects.
var questions = [
	{
		id: 1,
		question: "What is the most important thing in life?",
		answers: ["Family", "Breakfast", "Shopping", "Money"],
		correctAnswer: 1
	},
	{
		id: 2,
		question: "What psychological condition leads to constantly wearing jean cutoffs in the shower?",
		answers: ["Mesothelioma", "Never-nude", "Swag Flu", "OCD"],
		correctAnswer: 2
	},
	{
		id: 3,
		question: "Where can you always find money?",
		answers: ["The Bank", "The Couch", "The Banana Stand", "Yo Mama's House"],
		correctAnswer: 3
	},
	{
		id: 4,
		question: "The first movie of the Fast and Furious franchise was released in what year?",
		answers: ["2000", "2002", "1999", "2001"],
		correctAnswer: 4
	},
	{
		id: 5,
		question: "The term wake, kettle, or committee refers to a group of what bird?",
		answers: ["Crow", "Vulture", "Pigeon", "Buzzard"],
		correctAnswer: 2
	},
	{
		id: 6,
		question: "What battle was fought on June 18th, 1815 in present-day Belgium?",
		answers: ["The Battle of The Bulge", "The Battle of St. Croix", "The Battle of Waterloo", "The Battle of The Bands"],
		correctAnswer: 3
	},
	{
		id: 7,
		question: "What is the name for trees that never lose their leaves?",
		answers: ["Evergreen", "Oak", "Groot", "Maple"],
		correctAnswer: 1
	},
	{
		id: 8,
		question: "What fast-food franchise has the most world-wide locations?",
		answers: ["Chipotle", "McDonalds", "Roy Rogers... lol", "Subway"],
		correctAnswer: 4
	},
	{
		id: 9,
		question: "The first human-made object to land on the moon was launched by what country?",
		answers: ["The United States", "France", "The Soviet Union", "China"],
		correctAnswer: 3
	},
	{
		id: 10,
		question: "Beirut is the capital and largest city of what country?",
		answers: ["Lebanon", "Jordan", "Syria", "Iran"],
		correctAnswer: 1
	},
	{
		id: 11,
		question: "Barry Bonds currently holds the Major League Baseball home run record with how many home runs?",
		answers: ["735", "743", "652", "762"],
		correctAnswer: 4
	},
	{
		id: 12,
		question: "Who is the oldest person to be elected to the office of President of the United States?",
		answers: ["Ronald Reagan", "Donald Trump", "Harry Truman", "Andrew Jackson"],
		correctAnswer: 2
	},

]

var quiz = {
	correct: 0,
	incorrect: 0,
	questionCount: 0,
	questionInterval: null ,
	startQuiz: function (){
		$(".startButton").on("click", function (){

			$(".introScreen").remove();

			$(".timerMsg").show();

			$(".progressWrap").empty();

			//Populate the progress divs to coincide with each question.
			for (var i = 0; i < questions.length; i++) {
				$(".progressWrap").append("<div class='prog' data-qid='"+questions[i].id+"'>")
			}

			//Remove Game Start Button

			$(".startButton").hide();

			quiz.displayQuestion();
		})
	},
	displayQuestion: function(){

		// Question Countdown Value.

		var counter = 20;

		// Clear any feedback messages from previous results page.
		$(".feedbackField").empty();

		// Sets the original color back after it's done with warning phase.
		$(".timerWrap>h3").css("color", "#2e3345");


		// Load Question and Answers if we have a question left in the questions array.
		if (questions[quiz.questionCount] !== undefined){

			var correctA = questions[quiz.questionCount].correctAnswer;
			$(".quizTimer").html(counter);
			var questionTimer = setInterval(startCounter, 1000);

			function startCounter (){

				$(".quizTimer").html(counter)

				counter--;

				if (counter < 0){
					clearInterval(questionTimer);
					$("[data-qid='"+questions[quiz.questionCount].id+"']").addClass("incorrect");
					$(".feedbackField").html("Time's Up! The correct Answer is "+questions[quiz.questionCount].answers[correctA-1]);
					quiz.incorrect++;
					quiz.questionInterval = setInterval(quiz.nextQuestion, 4000);		
				}
				if (counter < 10){
					$(".timerWrap>h3").css("color", "#ff8080");
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

				// Prevent other clicks from registering and messing up our scoring.

				$(".answer").unbind("click");

				//Stop counter

				clearInterval(questionTimer);

				if (correctA === parseInt($(this).attr("id"))){

					// Add class for styling purposes.
					$(this).addClass("correct");

					// If correct, display "Congratulations Message" Field Message.
					$(".feedbackField").html("Congratulations! That is CORRECT!");

					// Increase correct count.
					quiz.correct++;

					// Change the color of the progress div to green.
					$("[data-qid='"+questions[quiz.questionCount].id+"']").addClass("correct");

					// Load next question;
					quiz.questionInterval = setInterval(quiz.nextQuestion, 4000);	 
				} else {

					// Add class for styling purposes
					$(this).addClass("incorrect");

					// If wrong give a message with the correct answer loaded in.
					$(".feedbackField").html("INCORRECT! The correct Answer is "+questions[quiz.questionCount].answers[correctA-1]);

					// Increase incorrect count.
					quiz.incorrect++;

					// Change the color of the progress div to red.
					$("[data-qid='"+questions[quiz.questionCount].id+"']").addClass("incorrect");

					//Load next question.
					quiz.questionInterval = setInterval(quiz.nextQuestion, 4000);		
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
		// Show closing message with the score and percentage written out. Show the game start button again with a new value. 
		// Reset certain variables.
		$(".content").prepend("<div class='introScreen'>");
		$(".introScreen").append(`
								  <h2>All Done! Let's see how you did.</h2>
								  <p>Looks like you answered a total of ${quiz.correct} out of 
								  ${questions.length} questions correctly. That's good enough for 
								  ${Math.floor(quiz.correct/questions.length * 100)}%.</p>
								`);
		$(".startButton").show().html("Restart Quiz");
		$(".quizTimer").html("");
		quiz.questionCount = 0; 
		quiz.correct = 0; 
		quiz.incorrect = 0; 	},
}

quiz.startQuiz();

});