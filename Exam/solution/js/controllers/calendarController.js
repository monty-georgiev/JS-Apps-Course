var app = app || {};

app.calendarController = (function () {
    function CalendarController(viewBag, model) {
        this.model = model;
        this.viewBag = viewBag;
    }


    CalendarController.prototype.displayAllLectures = function (selector) {
        var _this = this;
        this.model.getAllCalendarEvents()
            .then(function (data) {
                _this.viewBag.showAllCalendarEvents(selector, data);
            });
    };

    CalendarController.prototype.displayOwnLectures = function (selector) {
        var _this = this;
        var author = sessionStorage['userId'];
        return this.model.getCalendarEventsByAuthor(author)
            .then(function (data) {
                _this.viewBag.showAllCalendarEvents(selector, data);
            });
    };

    CalendarController.prototype.getAddLecturePage = function (selector) {
        this.viewBag.showAddLectureView(selector);
    };

    CalendarController.prototype.getEditLectureByIdPage = function (selector, id) {
        var _this = this;
        return this.model.getLectureById(id)
            .then(function (lecture) {
                _this.viewBag.showEditLectureView(selector, lecture);
            }, function (err) {
                app.notificationDispatcher.error(err.statusText);
            });
    };

    CalendarController.prototype.getDeleteLecturePage = function (selector, id) {
        var _this = this;
        return this.model.getLectureById(id)
            .then(function (lecture) {
                _this.viewBag.showDeleteLectureView(selector, lecture);
            }, function (err) {
                app.notificationDispatcher.error(err.statusText);
            });
    };


    CalendarController.prototype.createLecture = function (data) {
        return this.model.createLecture(data)
            .then(function () {
                $.sammy(function () {
                    this.trigger('redirectTo', {url: '#/calendar/my/'});
                });
                app.notificationDispatcher.success('Lecture created successfully!');
            }, function (err) {
                app.notificationDispatcher.error(err.statusText);
            });
    };

    CalendarController.prototype.editLecture = function (id, data) {
        var editedLecture = {
            title: data.title,
            start: data.start,
            end: data.end,
            lecturer: sessionStorage['username']
        };

        return this.model.editLecture(id, editedLecture)
            .then(function () {
                $.sammy(function () {
                    this.trigger('redirectTo', {url: '#/calendar/list/'});
                });
                app.notificationDispatcher.success('Lecture edited successfully!');
            }, function (err) {
                app.notificationDispatcher.error(err.statusText);
            });
    };

    CalendarController.prototype.deleteLecture = function (id) {
        return this.model.deleteLecture(id)
            .then(function () {
                $.sammy(function () {
                    this.trigger('redirectTo', {url: '#/calendar/list/'});
                });
            })
    };

    return {
        load: function (viewBag, model) {
            return new CalendarController(viewBag, model);
        }
    }
}());