//import $ from './node_modules/jquery/dist/core';
//import ko from 'knockout';

$(document).ready(() => {
    function viewModel () {
        this.dayOfWeek = ko.observable('Monday');
        this.activity = ko.observable('Work');
        console.log(this.dayOfWeek());
    }
    ko.applyBindings(new viewModel());
});
