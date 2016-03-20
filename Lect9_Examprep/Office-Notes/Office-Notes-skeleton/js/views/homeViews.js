var app = app || {};


app.homeViews = (function () {
    function loadWelcomePage(selector) {
        $.get('templates/welcome.html', function (templ) {
            $(selector).html(templ);
        })
    }

    function loadHomePage(selector) {
        $.get('templates/home.html', function (templ) {
            var name = sessionStorage['fullname'];
            var username = sessionStorage['username'];
            var data = {
                username: username,
                name: name
            };
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);
            $('#welcomeMenu').text('Welcome, ' + username);
        })
    }

    return {
        load: function () {
            return {
                loadWelcomePage: loadWelcomePage,
                loadHomePage: loadHomePage
            }
        }
    }
}());