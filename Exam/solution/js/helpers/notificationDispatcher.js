var app = app || {};

app.notificationDispatcher = (function () {
    function makeNotification(type, message) {
        noty({
            text: message,
            layout: 'top',
            closeWith: ['click'],
            type: type,
            timeout: 2000
        });
    }

    function success(msg) {
        makeNotification('success', msg)
    }

    function error(msg) {
        makeNotification('error', msg);
    }

    return {
        success: success,
        error: error
    }


}());