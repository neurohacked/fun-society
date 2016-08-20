// Constructor for questions -----------------------------------------------
function Quiz(questions) {
    this.questions = questions;
    return this;
}
// Create the questions for the game ---------------------------------------
let questions = [{
    question: {
        text: 'Who sings Pretty Young Thing?',
        gif: "https://media.giphy.com/media/zJzQ8FyIbY8Y8/giphy.gif",
        answers: ['Elivs', 'Michael Jackson', 'Janet Jackson', 'Elton John'],
        correctAnswer: 'Michael Jackson'
    },
}, {
    question: {
        text: 'What was one of the Eagles most famous songs?',
        gif: "https://media.giphy.com/media/aHEKecpQZHaaQ/giphy.gif",
        answers: ['Rock With You', 'Crazy Little Thing Called Love', 'Funkytown', 'Hotel California'],
        correctAnswer: 'Hotel California'
    },
}, {
    question: {
        text: 'Which one of these singers were NOT part of the Beatles?',
        gif: "https://media.giphy.com/media/h3wT24ejH7g4M/giphy.gif",
        answers: ['Frankie Valli', 'Ringo Starr', 'George Harrison', 'Paul McCartney'],
        correctAnswer: 'Frankie Valli'
    },
}, {
    question: {
        text: "Which of the following was the first to be inducted into the Rock 'n' Roll Hall of Fame?",
        gif: "https://media.giphy.com/media/MSCmj0qsPPTDq/giphy.gif",
        answers: ['Metallica', 'ZZ Top', 'The Hollies', 'The Rolling Stones'],
        correctAnswer: 'ZZ Top'
    },
}, {
    question: {
        text: 'Who was the first and original singer of AC/DC?',
        gif: "https://media.giphy.com/media/8ySWO51yu0k9y/giphy.gif",
        answers: ['Bon Scott', 'Brian Johnson', 'Dave Evans', 'Malcom Young'],
        correctAnswer: 'Dave Evans'
    },
}, {
    question: {
        text: 'Which artist was labeled as the "King of Pop"?',
        gif: "https://media.giphy.com/media/IXKBoWlYXsbSM/giphy.gif",
        answers: ['Michael Jackson', 'Prince', 'Justin Bieber', 'Justin Timberlake'],
        correctAnswer: 'Michael Jackson'
    },
}]

new Quiz(questions);
