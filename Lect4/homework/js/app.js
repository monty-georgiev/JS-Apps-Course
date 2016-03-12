var app = app || {};


(function (scope) {

    scope.requester.getCollection('Books', scope.renderView.renderAllBooksView);


})(app);