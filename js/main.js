function updateWeather() {
    $.ajax({
        url: 'http://api.worldweatheronline.com/free/v1/weather.ashx?q=Moscow&format=json&extra=localObsTime&num_of_days=5&includelocation=yes&lang=uk&key=13a4e16719a757403c5db6f4a8f3067e4534b4d8',
        success: function (data) {
            var tempC = +data.data.current_condition[0].temp_C;
            if (tempC > 0) {
                tempC = '+' + tempC;
            } else if (tempC < 0) {
                tempC = '-' + tempC;
            }
            $('span[rel="temp_C"]').html(tempC);

            //var regionName = data.data.nearest_area[0].region[0].value;
            //$('span[rel="regionName"]').html(regionName);

            $('img[rel="weather_pic"]').attr('src', data.data.current_condition[0].weatherIconUrl[0].value)
        }
    })
}

function bindTabChanger(tabCustomizer) {
    tabCustomizer = tabCustomizer || function () {};

    var tabButtons = $('a.tab'),
        tabsContainer = $('div.tab-container');
    tabButtons.on('click', function () {
        var self = $(this),
            rel = self.attr('rel');

        tabCustomizer(rel);

        $('a.tab.active').removeClass('active');
        self.addClass('active');
        tabsContainer.find('> div.active').removeClass('active');
        tabsContainer.find('> div[rel="' + rel + '"]').addClass('active');
    })
}

function refresh() {

}

$(document).ready(function () {
    updateWeather();
    bindTabChanger(function (tab) {
        if (tab == 'show-weather') {
            updateWeather();
        }
    });

    window.statusBarCallback = function () {
        updateWeather();
    }
});