$(document).ready(function() {
    // FIREBASE ///////////////////////////////////////////////////////
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAumrxjoe5hs1KPyl_dPdzL4Dl9n8ctRao",
        authDomain: "fun-society.firebaseapp.com",
        databaseURL: "https://fun-society.firebaseio.com",
        storageBucket: "fun-society.appspot.com",
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    // FIREBASE AUTHENTICATION ////////////////////////////////////////
    // Sign up modal
    $('#sign-up').on("click", function() {
        $("#signupModal").modal();
    });
    // Create new user
    $("#signupBtn").on("click", function() {

        // Grabs user input
        // var userName = $("#userName").val().trim();
        var emailAddress = $("#emailAddress").val().trim();
        var userPass = $("#userPass").val().trim();

        // Creates local "temporary" object for holding train data
        // var newUser = {
        //     username: userName,
        //     email: emailAddress,
        //     password: userPass
        // };
        //
        // // Uploads train data to the database
        // database.ref().push(newUser);

        //User Authentication - Email/Password
        firebase.auth().createUserWithEmailAndPassword(emailAddress, userPass).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
        // Confirm Add Train Modal
        $("#subModal").modal();

        // Clears all of the text-boxes
        // $("#userName").val("");
        // $("#trainDestination").val("");
        // $("#firstTime").val("");
        // $("#trainFrequency").val("");

        // Prevents moving to new page
        return false;
    });
    // Get current user -------------------------------------------------
    // firebase.auth().onAuthStateChanged(function(user) {
    //     if (user) {
    //         // User is signed in.
    //         $('#sign-up').hide();
    //         $('#signed-in').show();
    //         $('#user').html(user.displayName);
    //     } else {
    //         // No user is signed in.
    //         $('#signed-in').hide();
    //         $('#sign-up').show();
    //     }
    // });
    // Sign out ---------------------------------------------------------
    $('#sign-out').on('click', function() {
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
        }, function(error) {
            // An error happened.
        });
    });

    // FUNCTIONS
    // -----------------------------------------------------------------------

    // Countdown timers for questions and asnwer ------------------------
    function questionTimer() {
        counter = setInterval(decrement, 1000);
    }

    function answerTimer() {
        counter = setInterval(decrement, 1000);
    }

    function decrement() {
        if (questionTime === 0) {
            onQuestion = false;
            $('.answer').remove();
            answeredQuestions++;
            numUnanswered++;
            $('#choice').html("You took to long to answer. :/");
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
            $('#countdown').html(`Time Remaining: ${questionTime} seconds`);
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
        $('#countdown').html('Time Remaining: 30 seconds');
        $('#answer').hide();
        $('#game-display').show();
        if (answeredQuestions === 6) {
            displayResults();
        } else if (answeredQuestions === 5) {
            $('#question-text').html(availableQuestions[5].question.text);
            answer = availableQuestions[5].question.correctAnswer;
            for (let i = 0; i < availableQuestions[5].question.answers.length; i++) {
                j = $('<button>');
                j.addClass('btn btn-md btn-default btn-block answer');
                j.text(availableQuestions[5].question.answers[i]);
                $('#answers').append(j);
            }
        } else if (answeredQuestions === 4) {
            $('#question-text').html(availableQuestions[4].question.text);
            answer = availableQuestions[4].question.correctAnswer;
            for (let i = 0; i < availableQuestions[4].question.answers.length; i++) {
                j = $('<button>');
                j.addClass('btn btn-md btn-default btn-block answer');
                j.text(availableQuestions[4].question.answers[i]);
                $('#answers').append(j);
            }
        } else if (answeredQuestions === 3) {
            $('#question-text').html(availableQuestions[3].question.text);
            answer = availableQuestions[3].question.correctAnswer;
            for (let i = 0; i < availableQuestions[3].question.answers.length; i++) {
                j = $('<button>');
                j.addClass('btn btn-md btn-default btn-block answer');
                j.text(availableQuestions[3].question.answers[i]);
                $('#answers').append(j);
            }
        } else if (answeredQuestions === 2) {
            $('#question-text').html(availableQuestions[2].question.text);
            answer = availableQuestions[2].question.correctAnswer;
            for (let i = 0; i < availableQuestions[2].question.answers.length; i++) {
                j = $('<button>');
                j.addClass('btn btn-md btn-default btn-block answer');
                j.text(availableQuestions[2].question.answers[i]);
                $('#answers').append(j);
            }
        } else if (answeredQuestions === 1) {
            $('#question-text').html(availableQuestions[1].question.text);
            answer = availableQuestions[1].question.correctAnswer;
            for (let i = 0; i < availableQuestions[1].question.answers.length; i++) {
                j = $('<button>');
                j.addClass('btn btn-md btn-default btn-block answer');
                j.text(availableQuestions[1].question.answers[i]);
                $('#answers').append(j);
            }
        } else {
            $('#question-text').html(availableQuestions[0].question.text);
            answer = availableQuestions[0].question.correctAnswer;
            for (let i = 0; i < availableQuestions[0].question.answers.length; i++) {
                j = $('<button>');
                j.addClass('btn btn-md btn-default btn-block answer');
                j.text(availableQuestions[0].question.answers[i]);
                $('#answers').append(j);
            }
        }
    }

    // Display correct answer -------------------------------------------
    function displayAnswer() {
        $('#game-display').hide();
        $('#answer').show();
        if (answeredQuestions === 6) {
            $('#correct-answer').html(`The answer is: ${availableQuestions[5].question.correctAnswer}`);
            $.ajax({
                url: availableQuestions[5].question.gif,
                method: 'GET'
            }).done(function(response) {
                $('#gif').attr('src', response.data[0].images.fixed_height.url);
            });
        } else if (answeredQuestions === 5) {
            $('#correct-answer').html(`The answer is: ${availableQuestions[4].question.correctAnswer}`);
            $.ajax({
                url: availableQuestions[4].question.gif,
                method: 'GET'
            }).done(function(response) {
                $('#gif').attr('src', response.data[0].images.fixed_height.url);
            });
        } else if (answeredQuestions === 4) {
            $('#correct-answer').html(`The answer is: ${availableQuestions[3].question.correctAnswer}`);
            $.ajax({
                url: availableQuestions[3].question.gif,
                method: 'GET'
            }).done(function(response) {
                $('#gif').attr('src', response.data[0].images.fixed_height.url);
            });
        } else if (answeredQuestions === 3) {
            $('#correct-answer').html(`The answer is: ${availableQuestions[2].question.correctAnswer}`);
            $.ajax({
                url: availableQuestions[2].question.gif,
                method: 'GET'
            }).done(function(response) {
                $('#gif').attr('src', response.data[0].images.fixed_height.url);
            });
        } else if (answeredQuestions === 2) {
            $('#correct-answer').html(`The answer is: ${availableQuestions[1].question.correctAnswer}`);
            $.ajax({
                url: availableQuestions[1].question.gif,
                method: 'GET'
            }).done(function(response) {
                $('#gif').attr('src', response.data[0].images.fixed_height.url);
            });
        } else if (answeredQuestions === 1) {
            $('#correct-answer').html(`The answer is: ${availableQuestions[0].question.correctAnswer}`);
            $.ajax({
                url: availableQuestions[0].question.gif,
                method: 'GET'
            }).done(function(response) {
                $('#gif').attr('src', response.data[0].images.fixed_height.url);
            });
        }
    }

    // Display results --------------------------------------------------
    function displayResults() {
        stopTimer();
        $('#game-display').hide();
        $('#answer').hide();
        $('#results').show();
        $('#outro').html("All done, here's how you did!");
        $('#end-results').html(`Correct Answers: ${numRight}<br />Incorrect Answers: ${numWrong}<br />Unanswered: ${numUnanswered}`);

        points = numRight * 10;
        console.log(points);
    }

    // Initialize the game with a start page ----------------------------
    function initialize() {
        $('#game-display').hide();
        $('#answer').hide();
        $('#results').hide();
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
        $('.answer').remove();

        // Shuffle questions ---------------------------------------
        availableQuestions = shuffle(questions);
        // Shuffle question's answers ------------------------------
        for (let i = 0; i < availableQuestions.length; i++) {
            shuffle(availableQuestions[i].question.answers);
        }

        $('#start').hide();
        $('#results').hide();
        nextQuestion();
    });

    // Check if selected answer is wrong/right --------------------------
    $(document).on('click', '.answer', function() {
        onQuestion = false;
        $('.answer').remove();
        answeredQuestions++;
        if (this.innerHTML === answer) {
            numRight++;
            $('#choice').html("That's right!");
        } else {
            numWrong++;
            $('#choice').html("Sorry, that's incorrect. :(");
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
