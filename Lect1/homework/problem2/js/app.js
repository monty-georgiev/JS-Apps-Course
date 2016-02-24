;
(function ($, window, undefined) {

    var $paintButton = $('#paint-btn');
    var $classInputField = $('#class-input');
    var $colorInputField = $('#color-input');

    $paintButton.on('click', function () {
        if ($classInputField.val() !== "") {
            var classSelector = '.' + $classInputField.val();
        }

        var color = $colorInputField.val();

        $(classSelector).css('background-color', color);

    });


})(jQuery, window);