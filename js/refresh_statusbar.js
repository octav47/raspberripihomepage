$(document).ready(function () {
    var statusBar = $('#refresh-statusbar');

    var value = 0;

    statusBar.css('left', -statusBar.width());

    function updateStatusBar() {
        setInterval(function () {
            if (value > 100) {
                resetStatusBar();
                if (window.statusBarCallback) {
                    window.statusBarCallback();
                }
            }
            value++;
            var leftOffset = parseFloat(statusBar.css('left'));
            var newLeftOffset = leftOffset + (statusBar.width() / 100);
            statusBar.css('left', newLeftOffset);
        }, 1000)
    }

    function resetStatusBar() {
        value = 0;
        statusBar.css('left', -statusBar.width());
    }

    $(window).on('mouseenter mouseover mouseleave mousemove', function () {
        resetStatusBar();
    });

    updateStatusBar();
});