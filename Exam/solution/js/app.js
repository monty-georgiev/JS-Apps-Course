var app = app || {};

(function (scope) {

    scope.router = Sammy(function () {

        var baseUrl = 'https://baas.kinvey.com/';
        var requester = app.requester.config('kid_-k5E03VayZ', '5382f5182f694f73a036bc9ce9d4b62e', baseUrl);
        var dataContainer = '#container';
        var menuContainer = '#menu';


        var homeViewBag = app.homeViewBag.load();
        var userViewBag = app.userViewBag.load();
        var calendarViewBag = app.calendarViewBag.load();


        var userModel = app.userModel.load(requester);
        var calendarModel = app.calendarModel.load(requester);

        var homeController = app.homeController.load(homeViewBag);
        var userController = app.userController.load(userViewBag, userModel);
        var calendarController = app.calendarController.load(calendarViewBag, calendarModel);

        this.before({except: {path: '#\/(login\/|register\/)?'}}, function () {
            if (!sessionStorage['sessionId']) {
                this.redirect('#/');
                return false;
            }
        });

        this.before(function () {
            if (!sessionStorage['sessionId']) {
                $.get('templates/menu-login.html', function (templ) {
                    $(menuContainer).html(templ)
                });
            } else {
                $.get('templates/menu-home.html', function (templ) {
                    $(menuContainer).html(templ)
                });
            }
        });

        this.get('#/', function () {
            if (!sessionStorage['sessionId']) {
                homeController.loadWelcomePage(dataContainer);
            } else {
                homeController.loadHomePage(dataContainer);
            }

        });

        this.get('#/login/', function () {
            userController.loadLoginPage(dataContainer);
        });

        this.get('#/register/', function () {
            userController.loadRegisterPage(dataContainer);
        });

        this.get('#/logout/', function () {
            userController.logout();
        });


        this.get('#/calendar/list/', function () {
            calendarController.displayAllLectures(dataContainer);
        });

        this.get('#/calendar/add/', function () {
            calendarController.getAddLecturePage(dataContainer);
        });

        this.get('#/calendar/my/', function () {
            calendarController.displayOwnLectures(dataContainer);
        });

        this.get('#/calendar/edit/:id', function () {
            var lectureId = this.params.id;
            calendarController.getEditLectureByIdPage(dataContainer, lectureId);
        });

        this.get('#/calendar/delete/:id', function () {
            var lectureId = this.params.id;
            calendarController.getDeleteLecturePage(dataContainer, lectureId);
        });


        this.bind('redirectTo', function (e, data) {
            this.redirect(data.url);
        });

        this.bind('login-user', function (e, data) {
            userController.login(data);
        });

        this.bind('register-user', function (e, data) {
            userController.register(data);
        });


        this.bind('create-lecture', function (e, data) {
            calendarController.createLecture(data);
        });

        this.bind('edit-lecture', function (e, data) {
            calendarController.editLecture(data.id, data);
        });

        this.bind('delete-lecture', function (e, data) {
            calendarController.deleteLecture(data);
        });


    });

    scope.router.run('#/');

}(app));