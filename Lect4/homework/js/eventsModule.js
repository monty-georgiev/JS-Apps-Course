var app = app || {};


(function (scope) {

    var $listAllBooksButton = $('#list-books'),
        $addBookButton = $('#add-books'),
        $editBookButton = $('#edit-book'),
        $deleteBookButton = $('#delete-book');

    scope.requester.getCollection('Books', function (data) {
        console.log(data)
    });

})(app);