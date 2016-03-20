var app = app || {};

app.userViewBag = (function () {

    function showLoginPage(selector) {
        $.get('templates/login.html', function (templ) {
            $(selector).html(templ);
            $('#login-button').on('click', function () {
                var username = $('#username').val();
                var password = $('#password').val();
                var outputObj = {
                    username: username,
                    password: password
                };

                $.sammy(function () {
                    this.trigger('login-user', outputObj);
                });
            });
        });
    }

    function showRegisterPage(selector) {
        $.get('templates/register.html', function (templ) {
            $(selector).html(templ);
            $('#register-button').on('click', function () {
                var username = $('#username').val();
                var password = $('#password').val();
                var confirmPass = $('#confirm-password').val();

                if (password !== confirmPass) {
                    app.notificationDispatcher.error('Passwords do not match!');
                    return false;
                }

                var outputObj = {
                    username: username,
                    password: password
                };

                $.sammy(function () {
                    this.trigger('register-user', outputObj);
                });
            })
        });
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