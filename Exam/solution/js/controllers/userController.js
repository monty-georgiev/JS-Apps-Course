var app = app || {};

app.userController = (function () {
    function UserController(viewBag, model) {
        this.model = model;
        this.viewBag = viewBag;
    }

    UserController.prototype.loadLoginPage = function (selector) {
        this.viewBag.showLoginPage(selector);
    };

    UserController.prototype.loadRegisterPage = function (selector) {
        this.viewBag.showRegisterPage(selector);
    };

    UserController.prototype.login = function (data) {
        return this.model.login(data)
            .then(function (success) {
                sessionStorage['sessionId'] = success._kmd.authtoken;
                sessionStorage['username'] = success.username;
                sessionStorage['userId'] = success._id;

                $.sammy(function () {
                    this.trigger('redirectTo', {url: '#/'});
                });
                app.notificationDispatcher.success('Login successful!');

            }, function (error) {
                var errorMsgObject = JSON.parse(error.responseText);
                app.notificationDispatcher.error(errorMsgObject.description)
            }).done();
    };

    UserController.prototype.register = function (data) {
        return this.model.register(data)
            .then(function (success) {
                sessionStorage['sessionId'] = success._kmd.authtoken;
                sessionStorage['username'] = success.username;
                sessionStorage['userId'] = success._id;

                $.sammy(function () {
                    this.trigger('redirectTo', {url: '#/'});
                });
                app.notificationDispatcher.success('Registration successful!');
            }, function (error) {
                var errorMsgObject = JSON.parse(error.responseText);
                app.notificationDispatcher.error(errorMsgObject.description)
            }).done();
    };

    UserController.prototype.logout = function () {
        this.model.logout()
            .then(function () {
                sessionStorage.clear();

                $.sammy(function () {
                    this.trigger('redirectTo', {url: '#/'});
                });
                app.notificationDispatcher.success('Logout successful!');
            })
    };

    return {
        load: function (viewBag, model) {
            return new UserController(viewBag, model);
        }
    }
}());