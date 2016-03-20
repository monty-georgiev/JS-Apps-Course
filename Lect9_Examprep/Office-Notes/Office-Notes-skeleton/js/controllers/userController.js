var app = app || {};

app.userController = (function () {

    function UserController(viewbag, model) {
        this.viewBag = viewbag;
        this.model = model;

    }

    UserController.prototype.loadLoginPage = function (selector) {
        this.viewBag.showLoginPage(selector);
    };

    UserController.prototype.loadRegisterPage = function (selector) {
        this.viewBag.showRegisterPage(selector);
    };

    UserController.prototype.login = function (data) {
        this.model.login(data)
            .then(function (success) {
                sessionStorage['sessionAuth'] = success._kmd.authtoken;
                sessionStorage['userId'] = success._id;
                sessionStorage['username'] = success.username;
                sessionStorage['fullname'] = success.fullName;
                $.sammy(function () {
                    this.trigger('redirectUrl', {url: '#/home/'});
                });
                noty({
                    text: 'Login successfull!',
                    layout: 'top',
                    closeWith: ['click', 'hover'],
                    type: 'success',
                    timeout: 1000
                });
            });
    };

    UserController.prototype.register = function (data) {
        this.model.register(data)
            .then(function (success) {
                sessionStorage['sessionAuth'] = success._kmd.authtoken;
                sessionStorage['userId'] = success._id;
                sessionStorage['username'] = success.username;
                sessionStorage['fullname'] = success.fullName;
                $.sammy(function () {
                    this.trigger('redirectUrl', {url: '#/home/'});
                });
                noty({
                    text: 'Registered successfully!',
                    layout: 'top',
                    closeWith: ['click', 'hover'],
                    type: 'success',
                    timeout: 1000
                });

            });
    };

    UserController.prototype.logout = function () {
        this.model.logout()
            .then(function () {
                sessionStorage.clear();
                $.sammy(function () {
                    this.trigger('redirectUrl', {url: '#/'});
                })
            });
    };


    return {
        load: function (viewbag, model) {
            return new UserController(viewbag, model);
        }
    }


}());