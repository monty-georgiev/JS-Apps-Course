;
(function (window, undefined) {

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
            correct: 2
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
            correct: 3
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
            correct: 0
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
            correct: 2
        }
    ];

    var minutes = 5;
    var timerRaw = minutes * 60;
    var timer = setInterval(clockCountdown, 1000);
    var timerContainer = document.getElementById('timer');
    var questionsHolder = document.getElementById('questions-holder');

    for (var q in questions) {
        localStorage.setItem(q, JSON.stringify(questions[q]));
        renderQuestions(questions[q]);
    }

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


})(window);