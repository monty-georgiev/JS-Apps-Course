;
(function ($, window, undefined) {

    var defaults = {
        baseURL: 'https://baas.kinvey.com',
        appID: 'kid_ZkWqjeGpAl',
        username: 'geography',
        pass: 'geography123',
        showCountriesButton: '#show-countries',
        addCountryButton: '#add-country',
        deleteCountryButton: '#delete-country',
        editCountryButton: '#edit-country',
        dataContainer: '#dataContainer',
        userInputCountryName: '#country-name'
    };

    function GeographyApp(options) {
        this.settings = $.extend({}, defaults, options);

        this.$showCountriesButton = $(this.settings.showCountriesButton);
        this.$addCountryButton = $(this.settings.addCountryButton);
        this.$deleteCountry = $(this.settings.deleteCountryButton);
        this.$editCountry = $(this.settings.editCountryButton);
        this.$dataContainer = $(this.settings.dataContainer);
    }

    GeographyApp.prototype.init = function () {
        var _this = this;
        this.$showCountriesButton.on('click', $.proxy(this.getCountries, this));
        this.$deleteCountry.on('click', function () {
            _this.renderView('delete');
        });
        this.$editCountry.on('click', function () {
            _this.renderView('edit');
        });
        this.$addCountryButton.on('click', function () {
            _this.renderView('add');
        });
        
    };

    GeographyApp.prototype.getCountries = function () {
        var _this = this;
        $.ajax({
            method: 'GET',
            url: _this.settings.baseURL + '/appdata/' + _this.settings.appID + '/Countries',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Basic ' + btoa(_this.settings.username + ':' + _this.settings.pass));
            }
        }).done(function (data) {
            _this.renderView('get', data);
        })
            .error(function (data) {
                console.log(data);
            });
    };

    GeographyApp.prototype.addCountry = function () {
        var _this = this;
        var countryName = $('#country-name').val();

        if (countryName !== '') {
            $.ajax({
                    method: 'POST',
                    url: _this.settings.baseURL + '/appdata/' + _this.settings.appID + '/Countries',
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', 'Basic ' + btoa(_this.settings.username + ':' + _this.settings.pass));
                    },
                    contentType: 'application/json',
                    data: JSON.stringify({'Name': countryName})
                }
            ).done(function () {
                    _this.getCountries();
                });
        }
    };


    GeographyApp.prototype.deleteCountry = function () {
        var _this = this;
        var countryName = $('#country-name').val();
        var query = '{"Name":"' + countryName + '"}';

        if (countryName !== '') {
            $.ajax({
                method: 'DELETE',
                url: _this.settings.baseURL + '/appdata/' + _this.settings.appID + '/Countries/?query=' + query,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(_this.settings.username + ':' + _this.settings.pass));
                }
            }).done(function () {
                _this.getCountries();
            });
        }
    };


    GeographyApp.prototype.renderView = function (type, data) {
        var section, label, input, btn;
        //looks better than switch statement
        if (type === 'get') {
            var countriesUl = $('<ul>').addClass('countries-list');
            for (var country in data) {
                var li = $('<li>');
                li.text(data[country].Name);
                countriesUl.append(li);
            }
            $('#dataContainer').html(countriesUl);
        }

        if (type === 'delete') {
            section = $('<section>')
                .addClass('add-country')
                .append('<h3>Delete country</h3>');

            label = $('<label>Name: </label>');
            input = $('<input>').attr({'type': 'text', id: 'country-name'});
            btn = $('<button>Delete country</button>').addClass('add-country-btn').attr('id', 'delete-country');
            btn.on('click', $.proxy(this.deleteCountry, this));
            label.append(input);
            section.append(label);
            section.append(btn);
            this.$dataContainer.html(section);
        }

        if (type === 'add') {
            section = $('<section>')
                .addClass('add-country')
                .append('<h3>Add country</h3>');

            label = $('<label>Name: </label>');
            input = $('<input>').attr({'type': 'text', id: 'country-name'});
            btn = $('<button>Add country</button>').addClass('add-country-btn').attr('id', 'add-country');
            btn.on('click', $.proxy(this.addCountry, this));
            label.append(input);
            section.append(label);
            section.append(btn);
            this.$dataContainer.html(section);
        }

        if (type === 'edit') {
            section = $('<section>')
                .addClass('add-country')
                .append('<h3>Edit country</h3>');

            label = $('<label>Name: </label>');
            input = $('<input>').attr({'type': 'text', id: 'country-name'});
            btn = $('<button>Edit country</button>').addClass('add-country-btn').attr('id', 'delete-country');
            btn.on('click', $.proxy(this.deleteCountry, this));
            label.append(input);
            section.append(label);
            section.append(btn);
            this.$dataContainer.html(section);
        }
    };


    window.GeographyApp = GeographyApp;

})
(jQuery, window);