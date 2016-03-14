var app = app || {};

app.data = (function () {

    function Data(baseUrl, ajaxRequester) {
        this.users = new Users(baseUrl, ajaxRequester);
        this.posts = new Posts(baseUrl, ajaxRequester);
    }

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
            return localStorage.setItem('sessionToken', sessionToken);
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
        function Users(baseUrl, ajaxRequester) {
            this._serviceUrl = baseUrl;
            this._ajaxRequester = ajaxRequester;
        }

        Users.prototype.login = function (username, password) {
            var url = this._serviceUrl + '/user/kid_-ka52_cuJW/login?username=' + username + '&password=' + password;

            return this._ajaxRequester.get(url, credentials.getHeaders())
                .then(function (data) {
                    credentials.setSessionToken(data.sessionToken);
                    credentials.setUsername(data.username);
                    credentials.setUserId(data.objectId);
                    return data;
                });
        };

        Users.prototype.register = function (userRegData) {
            var url = this._serviceUrl + 'users';

            return this._ajaxRequester.post(url, userRegData, credentials.getHeaders())
                .then(function (data) {
                    return data;
                });
        };

        Users.prototype.editProfile = function (userId, userProfileData) {
            var url = this._serviceUrl + 'users/' + userId;

            return this._ajaxRequester.put(url, userProfileData, credentials.getHeaders())
                .then(function (data) {
                    return data;
                });
        };

        Users.prototype.getById = function (userId) {
            var url = this._serviceUrl + 'users/' + userId;

            return this._ajaxRequester.get(url, credentials.getHeaders());
        };

        Users.prototype.isLogged = function () {
            return credentials.getSessionToken();
        };

        Users.prototype.validateToken = function (sessionToken) {
            var url = this._serviceUrl + 'users/me';
            return this._ajaxRequester.get(url, credentials.getHeaders());
        };

        Users.prototype.getUserData = function () {
            return {
                userId: credentials.getUserId(),
                username: credentials.getUsername(),
                sessionToken: credentials.getSessionToken()
            }
        };

        Users.prototype.logout = function () {
            credentials.clearLocalStorage();
        };

        return Users;
    }());

    var Posts = (function () {
        function Posts(baseUrl, ajaxRequester) {
            this._serviceUrl = baseUrl + '/Posts';
            this._ajaxRequester = ajaxRequester;
        }

        Posts.prototype.getAll = function () {
            var url = this._serviceUrl + "?include=createdBy";
            return this._ajaxRequester.get(url, credentials.getHeaders());
        };

        Posts.prototype.getById = function (objectId) {
            return this._ajaxRequester.get(this._serviceUrl + '/' + objectId, credentials.getHeaders());
        };

        Posts.prototype.add = function (post, objectOwnerId) {
            return this._ajaxRequester.post(this._serviceUrl, post, credentials.getHeaders());
        };

        Posts.prototype.delete = function (objectId) {
            var url = this._serviceUrl + '/' + objectId;
            return this._ajaxRequester.delete(url, credentials.getHeaders());
        };

        return Posts;
    }());

    return {
        load: function (baseUrl, ajaxRequester) {
            return new Data(baseUrl, ajaxRequester);
        }
    }
}());