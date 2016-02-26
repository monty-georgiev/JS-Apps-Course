;
(function ($, window, undefined) {

    var $prevBtn = $('#prev-image');
    var $nextBtn = $('#next-image');
    var $slides = $('.slide');


    $prevBtn.on('click', function () {
        console.log('previous image');
    });

    $nextBtn.on('click', function () {
        console.log('next image');
    })


})(jQuery, window);