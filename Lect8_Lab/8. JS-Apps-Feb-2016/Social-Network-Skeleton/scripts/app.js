var app = app || {};

(function () {

    var baseUrl = 'https://baas.kinvey.com/';

    var userdata = JSON.stringify({username: 'pesho', password: 1234});

    var requester = app.ajaxRequester.load();
    var dataModel = app.data.load(requester, baseUrl);

    dataModel.users.login();
})();