var weatherApp = angular.module('weatherApp', ['ngSanitize']);
weatherApp.controller('weatherAppController', function weatherAppController($scope, $http) {
    $scope.model = {
        city: '',
        country: '',
        code: '',
        ip: '',
        tempC: '',
        tempF: '',
        weatherDesc: '',
        weatherIcon: ''
    };

    var locationUrl = 'http://freegeoip.net/json/?callback',
        weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?q=',
        weatherKey = '37f70c95ef295bd56aab3091f2d6ac3c',
        weatherIconUrl = 'http://openweathermap.org/img/w/';

    $http.get(locationUrl)
        .then(function (data) {
            $scope.model.city = data.data.city;
            $scope.model.country = data.data.country_name;
            $scope.model.ip = data.data.ip;
            $scope.model.code = data.data.country_code;
            $http.get(weatherUrl + $scope.model.city + ',' + $scope.model.code + '&appid=' + weatherKey)
                .then(function (weatherData) {
                    $scope.model.tempC = weatherData.data.main.temp - 273.15;
                    $scope.model.tempF = $scope.model.tempC * 9 / 5 + 32;
                    $scope.model.weatherDesc = weatherData.data.weather[0].description;
                    $scope.model.weatherIcon = weatherIconUrl + weatherData.data.weather[0].icon + '.png';
                })
        });
});