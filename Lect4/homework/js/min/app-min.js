;
(function ($, window, undefined) {

    var defaults = {
        baseURL: 'https://baas.kinvey.com',
        appID: 'kid_bkzXL8uE1b',
        appKey: 'a2lkX2JrelhMOHVFMWI6YWI4Mzc0OWJiNTJlNDU2YmJlMDBhMDUzOGIyMmVjMjc=',
        showBooksButton: '#list-books',
        addBookButton: '#add-country',
        deleteBookButton: '#delete-country',
        editCountryButton: '#edit-country',
        showTownsButton: '#show-towns',
        dataContainer: '#dataContainer',
        userInputCountryName: '#country-name'
    };

    function BookApp(options) {
        this.settings = $.extend({}, defaults, options);

        this.$dataContainer = $(this.settings.dataContainer);
        this.$showCountriesButton = $(this.settings.showBooksButton);
        this.$addCountryButton = $(this.settings.addBookButton);
        this.$deleteCountry = $(this.settings.deleteBookButton);
        this.$editCountry = $(this.settings.editCountryButton);
        this.$showTowns = $(this.settings.showTownsButton);
    }

    BookApp.prototype.init = function () {
        var _this = this;
        this.$showCountriesButton.on('click', $.proxy(this.getCountries, this));
        this.$deleteCountry.on('click', function () {
            _this.renderView('deleteCountry');
        });
        this.$editCountry.on('click', function () {
            _this.renderView('editCountry');
        });
        this.$addCountryButton.on('click', function () {
            _this.renderView('addCountry');
        });

        this.$showTowns.on('click', function () {
            _this.renderView('showTowns');
        });

        this.getCountries();

    };

    BookApp.prototype.getCountries = function () {
        var _this = this;
        $.ajax({
            method: 'GET',
            url: _this.settings.baseURL + '/appdata/' + _this.settings.appID + '/Books',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Basic ' + _this.settings.appKey);
            }
        }).done(function (data) {
            _this.renderView('getCountries', data);
        })
            .error(function (data) {
                console.log(data);
            });
    };

    BookApp.prototype.addCountry = function () {
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


    BookApp.prototype.deleteCountry = function () {
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

    //TODO: fix to show only selected country towns
    BookApp.prototype.showTowns = function () {
        var _this = this;
        var countryName = $('#country-name').val();
        var query = '{"Name":"' + countryName + '"}';

        if (countryName !== '') {
            $.ajax({
                method: 'GET',
                url: _this.settings.baseURL + '/appdata/' + _this.settings.appID + '/Towns/?resolve=Country',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(_this.settings.username + ':' + _this.settings.pass));
                }
            }).done(function (data) {
                _this.renderView('getTowns', data);
            });
        }
    };


    BookApp.prototype.renderView = function (type, data) {
        var section, label, input, btn;
        //looks better than switch statement
        if (type === 'getCountries') {
            console.log(data);
            $('#dataContainer').html('');
            var countriesUl = $('<ul>').addClass('countries-list');
            for (var country in data) {
                var li = $('<li>');
                li.text(data[country].Name);
                countriesUl.append(li);
            }

            $('#dataContainer')
                .append('<h2>Countries</h2>')
                .append(countriesUl);
        }

        if (type === 'deleteCountry') {
            section = $('<section>')
                .addClass('add-country')
                .append('<h3>Delete country</h3>');

            label = $('<label>Name: </label>');
            input = $('<input>').attr({'type': 'text', id: 'country-name'});
            btn = $('<button>Delete country</button>').addClass('change-btn').attr('id', 'delete-country');
            btn.on('click', $.proxy(this.deleteCountry, this));
            label.append(input);
            section.append(label);
            section.append(btn);
            this.$dataContainer.html(section);
        }

        if (type === 'addCountry') {
            section = $('<section>')
                .addClass('add-country')
                .append('<h3>Add country</h3>');

            label = $('<label>Name: </label>');
            input = $('<input>').attr({'type': 'text', id: 'country-name'});
            btn = $('<button>Add country</button>').addClass('change-btn').attr('id', 'add-country');
            btn.on('click', $.proxy(this.addCountry, this));
            label.append(input);
            section.append(label);
            section.append(btn);
            this.$dataContainer.html(section);
        }

        if (type === 'editCountry') {
            section = $('<section>')
                .addClass('add-country')
                .append('<h3>Edit country</h3>');

            label = $('<label>Name: </label>');
            input = $('<input>').attr({'type': 'text', id: 'country-name'});
            btn = $('<button>Edit country</button>').addClass('change-btn').attr('id', 'delete-country');
            btn.on('click', $.proxy(this.deleteCountry, this));
            label.append(input);
            section.append(label);
            section.append(btn);
            this.$dataContainer.html(section);
        }

        if (type === 'showTowns') {
            section = $('<section>')
                .addClass('add-country')
                .append('<h3>Show Towns</h3>');

            label = $('<label>Country: </label>');
            input = $('<input>').attr({'type': 'text', id: 'country-name'});
            btn = $('<button>Show towns</button>').addClass('change-btn').attr('id', 'show-towns');
            btn.on('click', $.proxy(this.showTowns, this));
            label.append(input);
            section.append(label);
            section.append(btn);
            this.$dataContainer.html(section);
        }

        if (type === 'getTowns') {
            var townsUl = $('<ul>').addClass('countries-list');
            for (var town in data) {
                var li = $('<li>');
                li.text(data[town].Name);
                townsUl.append(li);
            }

            $('#dataContainer')
                .append('<h2>Towns</h2>')
                .append(townsUl);
        }
    };


    window.BookApp = BookApp;

})
(jQuery, window);

