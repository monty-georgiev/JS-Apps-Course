var app = app || {};


app.calendarModel = (function () {
    function CalendarModel(requester) {
        this.requester = requester;
        this.serviceUrl = requester.baseUrl + 'appdata/' + requester.appId + '/lectures/';
    }

    CalendarModel.prototype.getAllCalendarEvents = function () {
        var requestUrl = this.serviceUrl;
        return this.requester.get(requestUrl, true);
    };

    CalendarModel.prototype.getCalendarEventsByAuthor = function (author) {
        var requestUrl = this.serviceUrl + '?query={"_acl.creator":"' + author + '"}';
        return this.requester.get(requestUrl, true);
    };

    CalendarModel.prototype.getLectureById = function (id) {
        var requestUrl = this.serviceUrl + id;
        return this.requester.get(requestUrl, true);
    };

    CalendarModel.prototype.createLecture = function (data) {
        var requestUrl = this.serviceUrl;
        return this.requester.post(requestUrl, data, true);
    };

    CalendarModel.prototype.editLecture = function (id, data) {
        var requestUrl = this.serviceUrl + id;
        return this.requester.put(requestUrl, data, true);
    };

    CalendarModel.prototype.deleteLecture = function (id) {
        var requestUrl = this.serviceUrl + id;
        return this.requester.delete(requestUrl, true);
    };

    return {
        load: function (requester) {
            return new CalendarModel(requester);
        }
    }
}());