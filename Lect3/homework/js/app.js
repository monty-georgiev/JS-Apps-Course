;
(function ($, window, undefined) {

    var defaults = {
        baseURL: 'https://baas.kinvey.com',
        appID: 'kid_ZkWqjeGpAl',
        username: 'geography',
        pass: 'geography123',
        showCountriesButton: '#show-countries',
        addCountryButton: '#add-country',
        editCountries: '#edit-countries',
        dataContainer: '#dataContainer'
    };

    function GeographyApp(options) {
        this.settings = $.extend({}, defaults, options);

        this.$showCountriesButton = $(this.settings.showCountriesButton);
        this.$addCountryButton = $(this.settings.addCountryButton);
        this.$editCountries = $(this.settings.editCountries);
        this.$dataContainer = $(this.settings.dataContainer);
    }

    GeographyApp.prototype.init = function () {
        this.$showCountriesButton.on('click', $.proxy(this.getCountries, this));
        this.$editCountries.on('click', $.proxy(this.renderEditCountries, this));
        this.$addCountryButton.on('click', $.proxy(this.addCountry, this));
    };

    GeographyApp.prototype.getCountries = function () {
        var _this = this;
        $.ajax({
            method: 'GET',
            url: _this.settings.baseURL + '/appdata/' + _this.settings.appID + '/Countries',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Basic ' + btoa(_this.settings.username + ':' + _this.settings.pass));
            }
        }).done(_this.renderCountries)
            .error(function (data) {
                console.log(data);
            });
    };

    GeographyApp.prototype.addCountry = function () {

    };

    GeographyApp.prototype.renderCountries = function (data) {
        var countries = '';
        for (var country in data) {
            countries += data[country].Name + ' ';
        }

        $('#dataContainer').text(countries);
    };

    GeographyApp.prototype.renderEditCountries = function () {
        console.log('edit');
    };

    window.GeographyApp = GeographyApp;

})(jQuery, window);