;
(function (window, undefined) {

    var questions = [
        {
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
            title: 'What color is the snow?',
            answers: [
                'Red',
                'Green',
                'Blue',
                'White'
            ],
            correct: 3
        }, {
            title: 'Which floor is Code Ground hall at?',
            answers: [
                'Ground floor',
                'First floor',
                'Second floor',
                'Third floor'
            ],
            correct: 0
        }, {
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

    for (var q in questions) {
        localStorage.setItem(q, JSON.stringify(questions[q]));
    }
    


    //
    //var timer = setInterval(function () {
    //    console.log('tick');
    //}, 1000);


})(window);