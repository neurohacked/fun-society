$(document).ready(function() {
    // FUNCTIONS
    // -----------------------------------------------------------------------

    // Countdown timers for questions and answer display ----------------
    function questionTimer() {
        counter = setInterval(decrement, 1000);
    }

    function answerTimer() {
        counter = setInterval(decrement, 1000);
    }

    function decrement() {
        if (questionTime === 0) {
            onQuestion = false;
            $('.choice').remove();
            answeredQuestions++;
            numUnanswered++;
            $('.decision').html("You took to long to answer. :/");
            stopTimer();
            resetQuestionTimer();
            answerTimer();
            displayAnswer();
        } else if (answerTime === 0) {
            stopTimer();
            nextQuestion();
        }
        if (onQuestion === true) {
            questionTime--;
            $('.countdown').html(`Time Remaining: ${questionTime} seconds`);
        } else {
            answerTime--;
        }
    }

    function resetQuestionTimer() {
        questionTime = 30;
    }

    function resetAnswerTimer() {
        answerTime = 5;
    }

    function stopTimer() {
        clearInterval(counter);
    }
    // Fisher-Yates shuffle
    function shuffle(array) {
        let m = array.length,
            t, i;

        // While there remain elements to shuffle…
        while (m) {

            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);

            // And swap it with the current element.
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }
        return array;
    }

    // Switch to next available question --------------------------------
    function nextQuestion() {
        onQuestion = true;
        questionTimer();
        resetAnswerTimer();
        $('.countdown').html('Time Remaining: 30 seconds');
        $('.answer').hide();
        $('.game-display').show();
        if (answeredQuestions === 6) {
            displayResults();
        } else if (answeredQuestions === 5) {
            $('.question-text').html(availableQuestions[5].question.text);
            answer = availableQuestions[5].question.correctAnswer;
            for (let i = 0; i < availableQuestions[5].question.answers.length; i++) {
                j = $('<button>');
                j.addClass('btn btn-md btn-default btn-block choice');
                j.text(availableQuestions[5].question.answers[i]);
                $('.answers').append(j);
            }
        } else if (answeredQuestions === 4) {
            $('.question-text').html(availableQuestions[4].question.text);
            answer = availableQuestions[4].question.correctAnswer;
            for (let i = 0; i < availableQuestions[4].question.answers.length; i++) {
                j = $('<button>');
                j.addClass('btn btn-md btn-default btn-block choice');
                j.text(availableQuestions[4].question.answers[i]);
                $('.answers').append(j);
            }
        } else if (answeredQuestions === 3) {
            $('.question-text').html(availableQuestions[3].question.text);
            answer = availableQuestions[3].question.correctAnswer;
            for (let i = 0; i < availableQuestions[3].question.answers.length; i++) {
                j = $('<button>');
                j.addClass('btn btn-md btn-default btn-block choice');
                j.text(availableQuestions[3].question.answers[i]);
                $('.answers').append(j);
            }
        } else if (answeredQuestions === 2) {
            $('.question-text').html(availableQuestions[2].question.text);
            answer = availableQuestions[2].question.correctAnswer;
            for (let i = 0; i < availableQuestions[2].question.answers.length; i++) {
                j = $('<button>');
                j.addClass('btn btn-md btn-default btn-block choice');
                j.text(availableQuestions[2].question.answers[i]);
                $('.answers').append(j);
            }
        } else if (answeredQuestions === 1) {
            $('.question-text').html(availableQuestions[1].question.text);
            answer = availableQuestions[1].question.correctAnswer;
            for (let i = 0; i < availableQuestions[1].question.answers.length; i++) {
                j = $('<button>');
                j.addClass('btn btn-md btn-default btn-block choice');
                j.text(availableQuestions[1].question.answers[i]);
                $('.answers').append(j);
            }
        } else {
            $('.question-text').html(availableQuestions[0].question.text);
            answer = availableQuestions[0].question.correctAnswer;
            for (let i = 0; i < availableQuestions[0].question.answers.length; i++) {
                j = $('<button>');
                j.addClass('btn btn-md btn-default btn-block choice');
                j.text(availableQuestions[0].question.answers[i]);
                $('.answers').append(j);
            }
        }
    }

    // Display correct answer -------------------------------------------
    function displayAnswer() {
        $('.game-display').hide();
        $('.answer').show();
        if (answeredQuestions === 6) {
            url = availableQuestions[5].question.gif;
            $('.correct-answer').html(`The answer is: ${availableQuestions[5].question.correctAnswer}`);
            $('.gif').attr('src', url);
        } else if (answeredQuestions === 5) {
            url = availableQuestions[4].question.gif;
            $('.correct-answer').html(`The answer is: ${availableQuestions[4].question.correctAnswer}`);
            $('.gif').attr('src', url);
        } else if (answeredQuestions === 4) {
            url = availableQuestions[3].question.gif;
            $('.correct-answer').html(`The answer is: ${availableQuestions[3].question.correctAnswer}`);
            $('.gif').attr('src', url);
        } else if (answeredQuestions === 3) {
            url = availableQuestions[2].question.gif;
            $('.correct-answer').html(`The answer is: ${availableQuestions[2].question.correctAnswer}`);
            $('.gif').attr('src', url);
        } else if (answeredQuestions === 2) {
            url = availableQuestions[1].question.gif;
            $('.correct-answer').html(`The answer is: ${availableQuestions[1].question.correctAnswer}`);
            $('.gif').attr('src', url);
        } else if (answeredQuestions === 1) {
            url = availableQuestions[0].question.gif;
            $('.correct-answer').html(`The answer is: ${availableQuestions[0].question.correctAnswer}`);
            $('.gif').attr('src', url);
        }
    }

    // Calculate Game Points and push to firebase
    function calcPoints() {
        // Multiply numRight to equal score
        points = numRight * 100;
        // Variable for firebase obj
        var userScore = {
            points: points,
        };
        // Push score to firebase
        db.ref().push(scores);
        // Log
        console.log('Points: ' + points);
    }

    // Sort points
    function sortPoints() {
        db.ref().on("value", function(snapshot) {
            globalPointsArray = [];
            var dbObj = snapshot.val();
            var objKeys = Object.keys(dbObj);
            for (let i = 0; i < objKeys.length; i++) {
                globalPoints = dbObj[objKeys[i]].points;
                globalPointsArray.push(globalPoints);
            }
            sortedPoints = globalPointsArray.sort(function(a, b) {
                return b - a;
            });
            console.log(sortedPoints);
        }, function(errorObject) {

            console.log("The read failed: " + errorObject.code);

        });
    }

    // Display results --------------------------------------------------
    function displayResults() {
        stopTimer();
        calcPoints();
        $('.game-display').hide();
        $('.answer').hide();
        $('.results').show();
        $('.outro').html("All done, here's how you did!");
        $('.end-results').html(`Correct Answers: ${numRight}<br />Incorrect Answers: ${numWrong}<br />Unanswered: ${numUnanswered}`);
    }

    // Initialize the game with a start page ----------------------------
    function initialize() {
        $('.game-display').hide();
        $('.answer').hide();
        $('.results').hide();
        sortPoints();
    }

    // PROCESSES
    // -----------------------------------------------------------------------

    // When Start is clicked display the game and start the timer -------
    $(document).on('click', '.start-game', function() {
        questionTime = 30;
        answerTime = 5;
        counter = '';
        onQuestion = false;
        numRight = 0;
        numWrong = 0;
        numUnanswered = 0;
        answeredQuestions = 0;
        points = '';
        $('.choice').remove();

        // Shuffle questions ---------------------------------------
        availableQuestions = shuffle(questions);
        // Shuffle question's answers ------------------------------
        for (let i = 0; i < availableQuestions.length; i++) {
            shuffle(availableQuestions[i].question.answers);
        }

        $('.start').hide();
        $('.results').hide();
        nextQuestion();
    });

    // Check if selected answer is wrong/right --------------------------
    $(document).on('click', '.choice', function() {
        onQuestion = false;
        $('.choice').remove();
        answeredQuestions++;
        if (this.innerHTML === answer) {
            numRight++;
            $('.decision').html("That's right!");
        } else {
            numWrong++;
            $('.decision').html("Sorry, that's incorrect. :(");
        }
        stopTimer();
        resetQuestionTimer();
        answerTimer();
        displayAnswer();
    });

    // INITIALIZE
    // -----------------------------------------------------------------------

    initialize();
});
