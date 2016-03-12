var app = app || {};

(function (scope) {

    var $dataContainer = $('#dataContainer');

    function renderAllBooksView(data) {
        var ul = $('<ul>');
        for (var book in data) {

            var deleteButton = $('<button>')
                .addClass('delete-btn')
                .text('Delete').on('click', function () {
                    var questionId = $(this).closest('li').attr('data-book-id');
                    scope.requester.deleteItemById('Books', questionId);
                });

            var li = $('<li>')
                .text(data[book].title)
                .addClass('book-entry')
                .attr('data-book-id', data[book]._id);

            li.append(deleteButton);
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