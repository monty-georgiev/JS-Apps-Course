;
(function ($, window, undefined) {

    var jsonString = [
        {
            "manufacturer": "BMW",
            "model": "E92 320i",
            "year": "2011",
            "price": "50000",
            "class": "Family"
        },
        {
            "manufacturer": "Porsche",
            "model": "Panamera",
            "year": "2012",
            "price": "100000",
            "class": "Sport"
        },
        {
            "manufacturer": "Peugeot",
            "model": "305",
            "year": "1978",
            "price": "1000",
            "class": "Family"
        }];


    function createTable(data) {
        var $tableHolder = $('#table-holder')
        var $table = $('<table>');
        var $tHead = $('<thead>');
        var $tbody = $('<tbody>');


        var $headRow = $('<tr>')
            .append('<th>Manufacturer</th>')
            .append('<th>Model</th>')
            .append('<th>Year</th>')
            .append('<th>Price</th>')
            .append('<th>Class</th>');

        $tHead.append($headRow);
        $table.append($tHead);

        data.forEach(function (entry) {
            var carRow = $('<tr>');
            var manufacturer = $('<td>').text(entry.manufacturer);
            var model = $('<td>').text(entry.model);
            var year = $('<td>').text(entry.year);
            var price = $('<td>').text(entry.price);
            var carClass = $('<td>').text(entry.class);

            carRow.append(manufacturer).append(model).append(year).append(price).append(carClass);
            $tbody.append(carRow);
        });
        $table.append($tbody);


        $tableHolder.append($table);

    }

    createTable(jsonString);

})(jQuery, window);

