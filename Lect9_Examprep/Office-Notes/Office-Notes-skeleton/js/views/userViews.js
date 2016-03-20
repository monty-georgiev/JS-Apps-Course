var app = app || {};


app.userViews = (function () {
    function showLoginPage(selector) {
        $.get('templates/login.html', function (templ) {
            $(selector).html(templ);
            $('#loginButton').on('click', function () {
                var username = $('#username').val();
                var password = $('#password').val();
                var outputObj = {
                    username: username,
                    password: password
                };

                $.sammy(function () {
                    this.trigger('login-user', outputObj);
                })
            })
        });
    }

    function showRegisterPage(selector) {
        $.get('templates/register.html', function (templ) {
            $(selector).html(templ);
            $('#loginButton').on('click', function () {
                var username = $('#username').val();
                var password = $('#password').val();
                var fullname = $('#fullname').val();
                var outputObj = {
                    username: username,
                    password: password,
                    fullName: fullname
                };

                $.sammy(function () {
                    this.trigger('register-user', outputObj);
                })
            })
        })
    }

    return {
        load: function () {
            return {
                showLoginPage: showLoginPage,
                showRegisterPage: showRegisterPage
            }
        }
    }
}());