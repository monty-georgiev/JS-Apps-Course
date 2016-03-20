var app = app || {};

app.calendarViewBag = (function () {
    function showCalendarEvents(selector, data) {
        $.get('templates/calendar.html', function (templ) {
            $(selector).html(templ);
            $('#calendar').fullCalendar({
                theme: false,
                header: {
                    left: 'prev,next today addEvent',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                defaultDate: '2016-03-20',
                selectable: false,
                editable: false,
                eventLimit: true,
                events: data,
                customButtons: {
                    addEvent: {
                        text: 'Add Event',
                        click: function () {
                            $.sammy(function () {
                                this.trigger('redirectTo', {url: '#/calendar/add/'})
                            })
                        }
                    }
                },
                eventClick: function (calEvent, jsEvent, view) {
                    $.get('templates/modal.html', function (templ) {
                        var rendered = Mustache.render(templ, calEvent);
                        $('#modal-body').html(rendered);
                        var editButton = $('#editLecture');
                        var deleteButton = $('#deleteLecture');
                        if (calEvent.lecturer !== sessionStorage['username']) {
                            editButton.hide();
                            deleteButton.hide();
                        } else {
                            editButton.show();
                            deleteButton.show();

                            editButton.on('click', function () {
                                var lectureId = $('#event-meta').attr('data-id');
                                $.sammy(function () {
                                    this.trigger('redirectTo', {url: '#/calendar/edit/' + lectureId})
                                });
                            });
                            deleteButton.on('click', function () {
                                var lectureId = $('#event-meta').attr('data-id');
                                $.sammy(function () {
                                    this.trigger('redirectTo', {url: '#/calendar/delete/' + lectureId})
                                });
                            })
                        }
                    });
                    $('#events-modal').modal();
                }
            });

        })
    }

    function showEditLectureView(selector, data) {
        $.get('templates/edit-lecture.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);
            $('#editLecture').on('click', function () {
                var lectureId = $(this).attr('data-id');
                var title = $('#title').val();
                var start = $('#start').val();
                var end = $('#end').val();

                if (title.length < 2) {
                    app.notificationDispatcher.error('Title should be at least 2 symbols long.');
                    return false;
                }

                if (start.length < 16) {
                    app.notificationDispatcher.error('Invalid start date. Please use proper format');
                    return false;
                }

                if (end.length < 16) {
                    app.notificationDispatcher.error('Invalid end date. Please use proper format.');
                    return false;
                }

                var lecturer = sessionStorage['username'];
                var editedLecture = {
                    id: lectureId,
                    title: title,
                    start: start,
                    end: end,
                    lecturer: lecturer
                };

                $.sammy(function () {
                    this.trigger('edit-lecture', editedLecture)
                })
            });
        })
    }

    function showDeleteLectureView(selector, data) {
        $.get('templates/delete-lecture.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);
            $('#deleteLecture').on('click', function () {
                var lectureId = $(this).attr('data-id');
                $.sammy(function () {
                    this.trigger('delete-lecture', lectureId)
                })
            });
        })
    }

    function showAddLectureView(selector) {
        $.get('templates/add-lecture.html', function (templ) {
            $(selector).html(templ);
            $('#addLecture').on('click', function () {
                var title = $('#title').val();
                var start = $('#start').val();
                var end = $('#end').val();

                if (title.length < 2) {
                    app.notificationDispatcher.error('Title should be at least 2 symbols long.');
                    return false;
                }

                if (start.length < 16) {
                    app.notificationDispatcher.error('Invalid start date. Please use proper format');
                    return false;
                }

                if (end.length < 16) {
                    app.notificationDispatcher.error('Invalid end date. Please use proper format.');
                    return false;
                }

                var lecturer = sessionStorage['username'];
                var outputObj = {
                    title: title,
                    start: start,
                    end: end,
                    lecturer: lecturer
                };

                $.sammy(function () {
                    this.trigger('create-lecture', outputObj);
                });
            });
        })
    }

    return {
        load: function () {
            return {
                showAllCalendarEvents: showCalendarEvents,
                showAddLectureView: showAddLectureView,
                showEditLectureView: showEditLectureView,
                showDeleteLectureView: showDeleteLectureView
            }
        }
    }
}());