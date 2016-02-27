;
(function ($, window, undefined) {

    var $prevBtn = $('#prev-image');
    var $nextBtn = $('#next-image');
    var $slides = $('.slide');

    //Autoplay the slider on init;
    var autoplay;

    function autoPlay() {
        autoplay = setInterval(function () {
            nextSlide()
        }, 5000);
    }

    autoPlay();

    //Stop the autoplay when someone focuses on the slider and start it when mouse leaves
    $('#slideshow').on('mouseover', function () {
        clearInterval(autoplay);
    }).on('mouseleave', function () {
        autoPlay();
    });

    //Event handlers
    $prevBtn.on('click', function () {
        previousSlide();
    });

    $nextBtn.on('click', function () {
        nextSlide();
    });
    
    //Goto next slide, and move to first if next slide is the last one
    function nextSlide() {
        var active = $('.active');
        var next = active.next();

        active.removeClass('active');
        if (next.length == 0) {

            $slides.first().toggleClass('active');
        } else {
            next.toggleClass('active');
        }
    }

    //Goto previous slide and move to last if the previous is the first one
    function previousSlide() {
        var active = $('.active');
        var prev = active.prev();

        active.removeClass('active');
        if (prev.length == 0) {

            $slides.last().toggleClass('active');
        } else {
            prev.toggleClass('active');
        }
    }

})(jQuery, window);

