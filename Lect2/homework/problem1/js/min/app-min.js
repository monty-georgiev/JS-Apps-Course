;
(function () {


    var usernamePlaceholder = document.getElementById('username');
    var visitsHeading = document.getElementsByClassName('visits');
    var totalvisitCountPlaceholder = document.getElementById('total-visits');
    var sessionvisitCountPlaceholder = document.getElementById('session-visits');


    if (!localStorage.getItem('name')) {
        var prompt = window.prompt('What is your name?');

        if (!prompt) {
            return;
        } else {
            localStorage.setItem('name', prompt);
            localStorage.setItem('total-visits', 0);
            sessionStorage.setItem('session-visits', 0);
            window.location = window.location;
        }

    } else {
        var totalVisitsCount = localStorage.getItem('total-visits');
        var sessionVisitsCount = sessionStorage.getItem('session-visits');
        totalVisitsCount++;
        sessionVisitsCount++;
        localStorage.setItem('total-visits', totalVisitsCount);
        sessionStorage.setItem('session-visits', sessionVisitsCount);
        usernamePlaceholder.innerText = localStorage.getItem('name');
        totalvisitCountPlaceholder.innerText = totalVisitsCount;
        sessionvisitCountPlaceholder.innerText = sessionVisitsCount;

        for (var i = 0; i < visitsHeading.length; i++) {
            visitsHeading[i].style.display = 'block';
        }

    }

})();

