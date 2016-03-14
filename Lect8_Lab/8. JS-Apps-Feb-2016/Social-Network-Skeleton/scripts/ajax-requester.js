var app = app || {};

app.ajaxRequester = (function () {


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

    function makeGetRequest(url, headers) {
        return makeRequest('GET', url, headers)
    }

    function makePostRequest(url, data, headers) {
        return makeRequest('POST', url, data, headers)
    }

    function makePutRequest(url, data, headers) {
        return makeRequest('PUT', url, data, headers)
    }

    function makeDeleteRequest(url, data, headers) {
        return makeRequest('DELETE', url, data, headers)
    }

    return {
        makeGetRequest: makeGetRequest,
        makePostRequest: makePostRequest,
        makePutRequest: makePutRequest,
        makeDeleteRequest: makeDeleteRequest
    };

}());