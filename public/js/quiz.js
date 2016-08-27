$(document).ready(function() {
    // FUNCTIONS
    // -----------------------------------------------------------------------
    /**
     * Countdown timers for questions and answer display.
     */
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
            $('.decision').html("You took to long to answer.  ");
            $('.decision').append('<img class="reaction" src="https://emojipedia-us.s3.amazonaws.com/cache/9e/18/9e18d26e9d7129752e1428f33903a7ab.png" alt="Disappointed">');
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
            $('.countdown').html("Time Remaining: " + questionTime + " seconds");
        } else {
            answerTime--;
        }
    }

    function resetQuestionTimer() {
        questionTime = 30;
    }

    function resetAnswerTimer() {
        answerTime = 10;
    }

    function stopTimer() {
        clearInterval(counter);
    }
    // Fisher-Yates shuffle
    function shuffle(array) {
        var m = array.length,
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
    /**
     * Switch to next available question based on number of questions answered.
     */
    function nextQuestion() {
        onQuestion = true;
        questionTimer();
        resetAnswerTimer();
        $('.countdown').html('Time Remaining: 30 seconds');
        $('.answer').addClass('hide');
        $('.game-display').removeClass('hide');
        if (answeredQuestions === 6) {
            displayResults();
        } else {
            $('.question-text').html(availableQuestions[index].question.text);
            answer = availableQuestions[index].question.correctAnswer;
            for (var i = 0; i < availableQuestions[index].question.answers.length; i++) {
                j = $('<button>');
                j.addClass('btn btn-md btn-default btn-block choice');
                j.text(availableQuestions[index].question.answers[i]);
                $('.answers').append(j);
            }
        }
    }
    /**
     * Display correct answer.
     */
    function displayAnswer() {
        $('.game-display').addClass('hide');
        $('.answer').removeClass('hide');
        if (answeredQuestions <= 6) {
            if (correct) {
                gif = availableQuestions[index].question.gif;
                $('.correct-answer').html("The answer is: " + availableQuestions[index].question.correctAnswer);
                $('.gif').attr('src', gif);
                if (currentQuiz === "television") {
                    $.ajax({
                        url: availableQuestions[index].question.tv,
                        method: 'GET'
                    }).done(function(response) {
                        shortOver = response.Plot.substring(0, 275);
                        $('.tv-info').html("<h4>Television Rating : " + response.Rated + "</h4><h5>IMDB Rating: " + response.imdbRating + "</h5><p>" + shortOver + "</p>");
                        $('.tv-info > p').append(' <a href="https://www.imdb.com/title/' + response.imdbID + '" target="_blank">Read more...</a>');
                    });
                } else if (currentQuiz === "movies") {
                    $.ajax({
                        url: availableQuestions[index].question.movie,
                        method: 'GET'
                    }).done(function(response) {
                        shortOver = response.Plot.substring(0, 275);
                        $('.movie-info').html("<h4>Rating: " + response.Rated + "</h4><h5>IMDB Rating: " + response.imdbRating + "</h5><p>" + response.Plot + "</p>");
                        $('.movie-info > p').append(' <a href="https://www.imdb.com/title/' + response.imdbID + '" target="_blank">Read more...</a>');
                    });
                } else if (currentQuiz === "games") {
                    $.ajax({
                        url: availableQuestions[index].question.game,
                        method: 'GET',
                        beforeSend: function(xhr) {
                            xhr.setRequestHeader('X-Mashape-Key', '7fk8Bw6PnJmsh0TjOdbPX40q0ABKp1PfPZKjsnLQXNUocj9RjW');
                        }
                    }).done(function(response) {
                        shortSum = response[0].summary.substring(0, 275);
                        $('.game-info').html("<h4>Game: " + response[0].name + "</h4><h5>Year Released: " + moment(response[0].release_dates[0].date).format('YYYY') + "</h5><p>" + shortSum + "</p>");
                        $('.game-info > p').append(' <a href="https://www.igdb.com/games/' + availableQuestions[index - 1].question.name + '" target="_blank">Read more...</a>');
                    });
                } else if (currentQuiz === "music") {
                    $.ajax({
                        url: availableQuestions[index].question.music,
                        method: 'GET'
                    }).then(function(response) {
                        shortBio = response.profile.substring(0, 250);
                        $('.music-info').html('<h4>Artist/Band Name: ' + response.name + '</h4><p>' + shortBio + '</p>');
                        $('.music-info > p').append(' <a href="' + response.uri + '" target="_blank">Read more...</a>');
                    });
                    $.ajax({
                        url: availableQuestions[index].question.spot,
                        method: 'GET'
                    }).then(function(response) {
                        $('.spotify-link').html('<a href="' + response.external_urls.spotify + '" target="_blank"><img class="img-responsive spotify" src="../img/icon-spotify.png" alt="Listen on Spotify"></a></img>');
                    });
                }
            } else {
                $.ajax({
                    url: 'https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=crying',
                    method: 'GET'
                }).done(function(response) {
                    $('.answer-info').html('<img class="img-responsive" src="' + response.data.fixed_height_downsampled_url + '" />');
                });
            }
        }
        index++;
    }
    /**
     * Calculate quiz points writes the user's data to the database.
     */
    function setScore(userId, score) {
        userRef.on("value", function(snapshot) {
            if (currentQuiz === "television") {
                firebase.database().ref('users/' + userId).update({
                    tvScore: score
                });
            } else if (currentQuiz === "movies") {
                firebase.database().ref('users/' + userId).update({
                    mvScore: score
                });
            } else if (currentQuiz === "games") {
                firebase.database().ref('users/' + userId).update({
                    gmScore: score
                });
            } else if (currentQuiz === "music") {
                firebase.database().ref('users/' + userId).update({
                    muScore: score
                });
            }
        });
    }
    /**
     * Display results.
     */
    function displayResults() {
        stopTimer();
        score = numRight * 100;
        if (signedIn) {
            setScore(currentUser.uid, score);
        } else {
            $('.re-start').prepend('<h4>Log in if you would like to save your scores</h4>');
        }
        $('.game-display').hide();
        $('.answer').addClass('hide');
        $('.results').removeClass('hide');
        $('.outro').html("All done, here's how you did!");
        $('.end-results').html("Correct Answers: " + numRight + "<br />Incorrect Answers: " + numWrong + "<br />Unanswered: " + numUnanswered + "<br /><br /> <strong>Your Score</strong>: <strong>" + score + "</strong>");
    }

    // PROCESSES
    // -----------------------------------------------------------------------
    /**
     * When Quiz button is clicked display the game and start the timer.
     */
    function startQuiz() {
        questionTime = 30;
        answerTime = 10;
        counter = '';
        onQuestion = false;
        correct = false;
        numRight = 0;
        numWrong = 0;
        numUnanswered = 0;
        answeredQuestions = 0;
        score = '';

        // Shuffle questions.
        index = 0;
        availableQuestions = shuffle(questions);
        // Shuffle question's answers.
        for (var i = 0; i < availableQuestions.length; i++) {
            shuffle(availableQuestions[i].question.answers);
        }
        $('.choice').remove();
        $('.answer').addClass('hide');
        $('.results').addClass('hide');
        // $('.results').addClass('hide');
        $('.game-display').removeClass('hide');
        nextQuestion();
    }
    /**
     * Check if selected answer is wrong/right.
     */
    $(document).on('click', '.choice', function() {
        onQuestion = false;
        $('.choice').remove();
        answeredQuestions++;
        if (this.innerHTML === answer) {
            correct = true;
            numRight++;
            $('.decision').html("That's right!  ");
            $('.decision').append('<img class="reaction" src="https://emojipedia-us.s3.amazonaws.com/cache/e3/0d/e30d81886e8f990ff4bf775a0c157155.png" alt="cool">');
        } else {
            correct = false;
            numWrong++;
            $('.decision').html("Sorry, that's incorrect.  ");
            $('.decision').append('<img class="reaction" src="https://emojipedia-us.s3.amazonaws.com/cache/53/07/530796818fd9042a5d17364ea2210ba1.png" alt="crying">');
        }
        stopTimer();
        resetQuestionTimer();
        answerTimer();
        displayAnswer();
    });

    // INITIALIZE QUIZ
    // -----------------------------------------------------------------------
    $(document).on("click", ".start-game", function() {
        startQuiz();
    });
    startQuiz();
});
