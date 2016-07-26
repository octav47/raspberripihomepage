$(document).ready(function () {
    var $window = $(window);
    $('#wrapper').height($window.height() - $('footer').height());
});