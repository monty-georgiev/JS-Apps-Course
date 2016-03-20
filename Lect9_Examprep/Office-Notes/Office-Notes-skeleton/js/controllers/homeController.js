var app = app || {};

app.homeController = (function () {

    function HomeController(viewbag) {
        this.viewBag = viewbag;

    }

    HomeController.prototype.loadWelcomePage = function (selector) {
        this.viewBag.loadWelcomePage(selector);
    };

    HomeController.prototype.loadHomePage = function (selector) {
        this.viewBag.loadHomePage(selector);
    };


    return {
        load: function (viewbag, model) {
            return new HomeController(viewbag, model);
        }
    }


}());