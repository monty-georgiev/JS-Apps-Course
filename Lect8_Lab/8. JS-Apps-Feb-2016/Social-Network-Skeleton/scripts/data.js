var app = app || {};

app.data = (function () {

    function Data(requester) {
        this._posts = new Posts(requester);
        this._users = new Users(requester);
    }

    var baseUrl = 'https://baas.kinvey.com/appdata/kid_-ka52_cuJW';

    var credentials = (function () {

        function getHeaders(contentType, useSession) {

            var headers = {};

            if (contentType) {
                headers['Content-type'] = 'application/json'
            }

            if (useSession) {
                headers['Authorization'] = 'Kinvey ' + btoa('a2lkXy1rYTUyX2N1Slc6Mzc1ODc2ZDQwMGQ0NDY5YWJlMmU1MWI0Yjc3ZGVkNDk=');
            }

            return headers;
        }

        function getSessionToken() {
            return localStorage.getItem('sessionToken');
        }

        function setSessionToken(sessionToken) {
            localStorage.setItem('sessionToken', sessionToken);
        }

        function getUserId() {
            return localStorage.getItem('userId');
        }

        function setUserId(userId) {
            return localStorage.setItem('userId', userId);
        }

        function getUsername() {
            return localStorage.getItem('username');
        }

        function setUsername(sessionToken) {
            localStorage.setItem('username', sessionToken);
        }

        function clearLocalStorage() {
            localStorage.clear();
        }

        return {
            getSessionToken: getSessionToken,
            setSessionToken: setSessionToken,
            getUsername: getUsername,
            setUsername: setUsername,
            getUserId: getUserId,
            setUserId: setUserId,
            getHeaders: getHeaders,
            clearLocalStorage: clearLocalStorage
        }
    });

    var Users = (function () {

        function Users(requester) {
            this._requester = requester;
        }

        Users.prototype.login = function () {
            var headers = credentials.getHeaders();

            return app.ajaxRequester.makePostRequest(baseUrl + '/login', username, headers)
                .then(function (data) {
                    console.log(data);
                });
        };


        Users.prototype.login = function (username) {

        };

        Users.prototype.register = function (username) {

        };

        Users.prototype.editProfile = function (username) {

        };


        Users.prototype.getById = function (username) {

        };


        Users.prototype.getCurrentUserData = function (username) {

        };

        Users.prototype.logout = function () {

        };

        return Users;
    });

    var Posts = (function () {

        function Posts(requester) {
            this._requester = requester;
        }


        Posts.prototype.getAll = function () {

        };

        Posts.prototype.getPostById = function () {

        };


        Posts.prototype.addNewPost = function () {

        };

        return Posts
    });

    return {
        load: function (requester) {
            return new Data(requester)
        }
    }
});