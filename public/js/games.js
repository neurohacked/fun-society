// VARIABLES
// -----------------------------------------------------------------------
currentQuiz = "games";
// FUNCTIONS
// -----------------------------------------------------------------------
/**
 * Constructor for questions.
 */
function Quiz(questions) {
    this.questions = questions;
    return this;
}
/**
 * Create the questions for the quiz.
 */
 var questions = [{
    question: {
        name: 'super-mario-world',
        text: 'Who is Mario\'s dinosaur friend?',
        gif: "https://media.giphy.com/media/zJzQ8FyIbY8Y8/giphy.gif",
        game: 'https://igdbcom-internet-game-database-v1.p.mashape.com/games/1070?fields=name%2Csummary%2Crelease_dates&order=release_dates.date%3Aasc',
        answers: ['Rex', 'Luigi', 'Toshi', 'Yoshi'],
        correctAnswer: 'Yoshi'
    },
}, {
    question: {
        name:'sonic-the-hedgehog',
        text: 'What does Sonic the Hedgehog love to collect?',
        gif: "https://media.giphy.com/media/aHEKecpQZHaaQ/giphy.gif",
        game: 'https://igdbcom-internet-game-database-v1.p.mashape.com/games/3192?fields=name%2Csummary%2Crelease_dates&order=release_dates.date%3Aasc',
        answers: ['Jewels', 'Coins', 'Diamonds', 'Rings'],
        correctAnswer: 'Rings'
    },
}, {
    question: {
        name: 'pac-man',
        text: 'Which of these is NOT a Pac-Man ghost?',
        gif: "https://media.giphy.com/media/h3wT24ejH7g4M/giphy.gif",
        game: "https://igdbcom-internet-game-database-v1.p.mashape.com/games/2750?fields=name%2Csummary%2Crelease_dates&order=release_dates.date%3Aasc",
        answers: ['Inky', 'Clyde', 'Blinky', 'Bonnie'],
        correctAnswer: 'Bonnie'
    },
}, {
    question: {
        name: 'the-legend-of-zelda-a-link-to-the-past',
        text: 'Who is Link\'s fairy companion?',
        gif: "https://media.giphy.com/media/MSCmj0qsPPTDq/giphy.gif",
        game: 'https://igdbcom-internet-game-database-v1.p.mashape.com/games/1026?fields=name%2Csummary%2Crelease_dates&order=release_dates.date%3Aasc',
        answers: ['Siri', 'Alexa', 'Cortana', 'Navi'],
        correctAnswer: 'Navi'
    },
}, {
    question: {
        name: 'mortal-kombat--2',
        text: 'Which game franchise, born in 1992, courted controversy with its ‘Fatalities’?',
        gif: "https://media.giphy.com/media/8ySWO51yu0k9y/giphy.gif",
        game: 'https://igdbcom-internet-game-database-v1.p.mashape.com/games/1618?fields=name%2Csummary%2Crelease_dates&order=release_dates.date%3Aasc',
        answers: ['Art of Fighting', 'Fatal Fury', 'King of Fighters', 'Mortal Kombat'],
        correctAnswer: 'Mortal Kombat'
    },
}, {
    question: {
        name: 'q-bert',
        text: 'Which game has a character that says "@!#?@!" every time he is hit by something?',
        gif: "https://media.giphy.com/media/IXKBoWlYXsbSM/giphy.gif",
        game: 'https://igdbcom-internet-game-database-v1.p.mashape.com/games/1980?fields=name%2Csummary%2Crelease_dates&order=release_dates.date%3Aasc',
        answers: ['Donkey Kong', 'Mega Man', 'Mario', 'Q*bert'],
        correctAnswer: 'Q*bert'
    },
}];

new Quiz(questions);
