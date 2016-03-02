;
(function (window, undefined) {


    //Questions data (id,title,answers[],correctAnswer,userAnswer)
    var questions = [
        {
            questionId: 1,
            title: 'How far is the Moon?',
            answers: [
                '320,000 km',
                '120,000 km',
                '384,400 km',
                '287,380 km'
            ],
            correctAnswer: 2,
            userAnswer: 5
        },
        {
            questionId: 2,
            title: 'What color is the snow?',
            answers: [
                'Red',
                'Green',
                'Blue',
                'White'
            ],
            correctAnswer: 3,
            userAnswer: 5
        },
        {
            questionId: 3,
            title: 'Which floor is Code Ground hall at?',
            answers: [
                'Ground floor',
                'First floor',
                'Second floor',
                'Third floor'
            ],
            correctAnswer: 0,
            userAnswer: 5
        },
        {
            questionId: 4,
            title: 'What is the legal drinking age in Bulgaria?',
            answers: [
                '16',
                '8',
                '18',
                '21'
            ],
            correctAnswer: 2,
            userAnswer: 5
        }
    ];

    //Set config variables and DOM elements
    var minutes = 5;
    var timerRaw = minutes * 60;
    var timer = setInterval(clockCountdown, 1000);
    var timerContainer = document.getElementById('timer');
    var questionsHolder = document.getElementById('questions-holder');

    function initialize() {
        for (var q in questions) {
            localStorage.setItem(q, JSON.stringify(questions[q]));
            renderQuestions(questions[q]);
        }

        renderButton();
    }

    function renderButton() {
        var button = document.createElement('button');
        button.classList.add('btn');
        button.innerText = "Submit";

        button.addEventListener('click', getAnswers);

        questionsHolder.appendChild(button);
    }


    //Timer countdown
    function clockCountdown() {
        timerRaw--;
        var minutesToDisplay = Math.floor(timerRaw / 60);
        var secondsToDisplay = Math.floor(timerRaw % 60);

        if (secondsToDisplay < 10) {
            secondsToDisplay = "0" + secondsToDisplay;
        }

        timerContainer.innerText = minutesToDisplay + " : " + secondsToDisplay;

        if (minutesToDisplay == 0 && secondsToDisplay == 0) {
            clearInterval(timer);
            timerContainer.innerText = "Time out";
        }
    }

    //Create li element with questions answers and radio buttons
    function renderQuestions(question) {
        var article = document.createElement('article');
        article.classList.add('question');
        var heading = document.createElement('h2');
        heading.classList.add('question-title');
        heading.innerText = question.title;
        var ul = document.createElement('ul');

        question.answers.forEach(function (answer) {
            var li = document.createElement('li');
            var label = document.createElement('label');
            var input = document.createElement('input');
            input.setAttribute('type', 'radio');
            input.setAttribute('name', question.questionId);
            label.appendChild(input);
            var textAnswer = document.createTextNode(answer);
            label.appendChild(textAnswer);
            li.appendChild(label);
            ul.appendChild(li);
        });

        article.appendChild(heading);
        article.appendChild(ul);
        questionsHolder.appendChild(article);
    }

    //Find all answered questions
    function getAnswers() {
        var selectedAnswers = document.querySelectorAll('input:checked');

        for (var ans in selectedAnswers) {
            console.log(selectedAnswers[ans]);
        }

    }

    window.onunload = function () {
        getAnswers();
    };

    window.init = initialize;

})(window);