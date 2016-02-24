;
(function ($, window, undefined) {

    var $anchor = $('#anchor');

    function addElementBefore(positioningElement, elementToAdd) {
        $(positioningElement).before(elementToAdd);

        return this;
    }

    function addElementAfter(positioningElement, elementToAdd) {
        $(positioningElement).after(elementToAdd);

        return this;
    }


    addElementAfter($anchor, "<p>After</p>")
    addElementBefore($anchor, "<p>Before</p>");


})(jQuery, window);