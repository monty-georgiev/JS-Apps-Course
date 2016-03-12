var app = app || {};


(function (scope) {

    currentUser = {
        "username": 'pesho',
        "password": '1234'
    };

    $.ajax({
        type: "POST",
        url: "https://baas.kinvey.com/user/kid_bkzXL8uE1b/login",
        data: currentUser,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic a2lkX2JrelhMOHVFMWI6MWJhMjE3ZDk5MTgxNDAzZTgyMzhlYTA5OWNjN2I5ZDU=");
        },
        success: function (data) {
            console.log(data._kmd.authtoken);
            sessionStorage.authToken = data._kmd.authtoken;
        },
        error: function (error) {
            console.error(error);
        }
    });


    scope.requester.getCollection('Books', scope.renderView.renderAllBooksView);
})(app);