var app = app || {};

(function (scope) {

    var $dataContainer = $('#dataContainer');

    function renderAllBooksView(data) {
        var ul = $('<ul>');
        for (var book in data) {

            var deleteButton = $('<button>')
                .addClass('btn delete-btn')
                .text('Delete').on('click', function () {
                    var questionId = $(this).closest('li').attr('data-book-id');
                    scope.requester.deleteItemById('Books', questionId, scope.renderAllBooksView);
                });

            var editButton = $('<button>')
                .addClass('btn edit-btn')
                .text('Edit');

            var li = $('<li>')
                .addClass('book-entry')
                .attr('data-book-id', data[book]._id);

            var title = $('<span>').text("Title: " + data[book].title);
            var author = $('<span>').text("Author: " + data[book].author);
            var isbn = $('<span>').text("ISBN: " + data[book].isbn);

            li.append(title, author, isbn, editButton, deleteButton);
            ul.append(li);
        }

        $dataContainer.html(ul);
    }

    function renderAddBookView() {

    }

    scope.renderView = {
        renderAllBooksView: renderAllBooksView,
        renderAddBookView: renderAddBookView
    }

})(app);