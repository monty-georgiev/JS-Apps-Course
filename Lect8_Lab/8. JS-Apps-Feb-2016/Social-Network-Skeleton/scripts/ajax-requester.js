var app = app || {};

app.ajaxRequester = (function () {

    function Requester() {

    }

    function makeRequest(method, url, data, headers) {
        var defer = Q.defer();

        $.ajax({
            url: url,
            method: method,
            data: JSON.stringify(data),
            headers: headers,
            success: function (data) {
                defer.resolve(data);
            },
            error: function (data) {
                defer.reject(data);
            }
        });

        return defer.promise;
    }

    Requester.prototype.makeGetRequest = function (url, headers) {
        return makeRequest('GET', url, headers)
    };

    Requester.prototype.makePostRequest = function (url, data, headers) {
        return makeRequest('POST', url, data, headers)
    };

    Requester.prototype.makePutRequest = function (url, data, headers) {
        return makeRequest('PUT', url, data, headers)
    };

    Requester.prototype.makeDeleteRequest = function (url, data, headers) {
        return makeRequest('DELETE', url, data, headers)
    };

    return {
        load: function () {
            return new Requester();
        }

    };

}());