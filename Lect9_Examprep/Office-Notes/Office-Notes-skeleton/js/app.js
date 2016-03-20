var app = app || {};

(function () {

    var router = Sammy(function () {
        var selector = '#container';
        var requester = app.requester.config('kid_ZksKFr1j1Z', '9ab81735b48a4ea4b08fa81dde0b1a75');

        var userModel = app.userModel.load(requester);
        var notesModel = app.notesModel.load(requester);

        var userViewBag = app.userViews.load();
        var homeViewBag = app.homeViews.load();

        var userController = app.userController.load(userViewBag, userModel);
        var homeController = app.homeController.load(homeViewBag);

        var testUser = {
            username: 'pesho',
            password: '1234',
            fullName: 'Peter Petersen'
        };


        this.before(function () {
            if (!sessionStorage['sessionAuth']) {
                $('#menu').hide();
            } else {
                $('#menu').show();
            }
            notesModel.getNotesForToday();
        });

        this.bind('redirectUrl', function (e, data) {
            this.redirect(data.url);
        });


        this.get('#/', function () {
            if (sessionStorage['sessionAuth']) {
                this.redirect('#/home/');
            } else {
                homeController.loadWelcomePage(selector);
            }
        });

        this.get('#/home/', function () {
            homeController.loadHomePage(selector);
        });

        this.get('#/login/', function () {
            userController.loadLoginPage(selector);
        });

        this.get('#/logout/', function () {
            userController.logout();
        });

        this.get('#/register/', function () {
            userController.loadRegisterPage(selector);
        });

        this.bind('login-user', function (e, data) {
            userController.login(data);
        });

        this.bind('regitest-user', function (e, data) {
            userController.register(data);
        });

    });

    router.run('#/');


})();