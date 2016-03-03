;
(function (window, undefined) {


    //Questions data (id,title,answers[],correctAnswer,userAnswer)
    var questions = [
        {
            questionId: 0,
            title: 'How far is the Moon?',
            answers: [
                '320,000 km',
                '120,000 km',
                '384,400 km',
                '287,380 km'
            ],
            correctAnswer: 2,
            userAnswer: false
        },
        {
            questionId: 1,
            title: 'What color is the snow?',
            answers: [
                'Red',
                'Green',
                'Blue',
                'White'
            ],
            correctAnswer: 3,
            userAnswer: false
        },
        {
            questionId: 2,
            title: 'Which floor is Code Ground hall at?',
            answers: [
                'Ground floor',
                'First floor',
                'Second floor',
                'Third floor'
            ],
            correctAnswer: 0,
            userAnswer: false
        },
        {
            questionId: 3,
            title: 'What is the legal drinking age in Bulgaria?',
            answers: [
                '16',
                '8',
                '18',
                '21'
            ],
            correctAnswer: 2,
            userAnswer: false
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
        button.id = 'btn';
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
            document.getElementById('btn').setAttribute('disabled', true);
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
        var userAnswer = question.userAnswer;
        var numberOfAnswers = question.answers.length;

        for (var i = 0; i < numberOfAnswers; i++) {
            var li = document.createElement('li');
            var label = document.createElement('label');
            var input = document.createElement('input');
            input.setAttribute('type', 'radio');
            input.setAttribute('name', question.questionId);
            input.setAttribute('answer-number', i);

            if (userAnswer !== false) {
                input.setAttribute('checked', true);
            }

            label.appendChild(input);
            var textAnswer = document.createTextNode(question.answers[i]);
            label.appendChild(textAnswer);
            li.appendChild(label);
            ul.appendChild(li);
        }

        article.appendChild(heading);
        article.appendChild(ul);
        questionsHolder.appendChild(article);
    }

    //Find all answered questions
    function getAnswers() {
        var selectedAnswers = document.querySelectorAll('input:checked');

        var answeredNumber = selectedAnswers.length;
        for (var i = 0; i < answeredNumber; i++) {
            var questionId = selectedAnswers[i].name;
            var answerNumber = selectedAnswers[i].getAttribute('answer-number');
            var questionFromStorage = JSON.parse(localStorage.getItem(questionId));
            questionFromStorage.userAnswer = answerNumber;
            localStorage.setItem(questionId, JSON.stringify(questionFromStorage));
        }

        clearInterval(timer);

    }

    window.init = initialize;

})(window);