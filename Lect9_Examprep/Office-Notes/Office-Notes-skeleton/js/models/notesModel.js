var app = app || {};

app.notesModel = (function () {

    function NotesModel(requester) {
        this.requester = requester;
        this.serviceUrl = this.requester.baseUrl + 'appdata/' + this.requester.appId + '/notes';

    }

    NotesModel.prototype.getNotesForToday = function (deadline) {
        var serviceUrl = this.serviceUrl + '?query={"deadline":"' + deadline + '"}';
        this.requester.get(serviceUrl, true);
    };

    NotesModel.prototype.getMyNotes = function (creatorId) {
        var serviceUrl = this.serviceUrl + '?query={"_acl.creator":"' + creatorId + '"}';
        this.requester.get(serviceUrl, true);
    };

    return {
        load: function (requester) {
            return new NotesModel(requester);
        }
    }


}());