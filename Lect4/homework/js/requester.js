var app = app || {};

(function (scope) {
    var _baseUrl = "https://baas.kinvey.com/appdata/kid_bkzXL8uE1b/",
        _contentType = 'application/json';

    var makeRequest = function (type, url, contentType, data, success, error) {
        $.ajax({
            type: type,
            url: url,
            headers: {
                'Authorization': 'Kinvey ' + sessionStorage.authToken
            },
            data: data || undefined,
            success: success,
            error: error
        })
    };

    var getCollection = function (collectionName, success, error) {
        return makeRequest('GET', _baseUrl + collectionName, undefined, undefined, success, error);
    };

    var addItemToCollection = function (collectionName, data, success, error) {
        return makeRequest('POST', _baseUrl + collectionName, undefined, data, success, error);
    };

    var deleteItemById = function (collectionName, id, success, error) {
        var requestUrl = _baseUrl + collectionName + '/' + id;
        return makeRequest('DELETE', requestUrl, undefined, undefined, success, error);
    };

    var getItemById = function (collectionName, id, success, error) {
        var requestUrl = _baseUrl + collectionName + '/' + id;
        return makeRequest('GET', requestUrl, undefined, undefined, success, error)
    };

    var editItem = function (collectionName, id, data, success, error) {
        var requestUrl = _baseUrl + collectionName + '/' + id;
        return makeRequest('PUT', requestUrl, undefined, data, success, error);
    };

    var getItemsByQuery = function (collectionName, queryObj, success, error) {
        var requestUrl = _baseUrl + collectionName + '/?query=' + JSON.stringify(queryObj);
        return makeRequest('Get', requestUrl, undefined, undefined, success, error);
    };

    scope.requester = {
        getItemById: getItemById,
        getCollection: getCollection,
        deleteItemById: deleteItemById,
        editItem: editItem,
        addItemToCollection: addItemToCollection,
        getItemsByQuery: getItemsByQuery
    };


})(app);