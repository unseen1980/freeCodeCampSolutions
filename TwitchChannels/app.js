var twitchApp = angular.module('twitchApp', []);
twitchApp.controller('twitchController', function twitchController($scope, $http) {
    $scope.query = '';
    $scope.resultsList = [];
    $scope.showList = false;
    $scope.view = 'all';
    var twitchUrl = 'https://api.twitch.tv/kraken/streams/';
    var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
    channels.forEach(function(channel, i) {
        $http({
                method: 'GET',
                url: twitchUrl + channel,
                headers: {
                    'Client-ID': 'nxmjokw8fixirrch198nqmlsdw8pm8k'
                }
            })
            .then(function(data) {
                var channelName = channels[i];
                $scope.resultsList.push({
                    [channels[i]]: data.data
                });
            });
    })

});

twitchApp.filter('find', function() {
    return function(input, str) {
        var tmp = {};
        angular.forEach(input, function(val, key) {
            if (Object.keys(val)[0].indexOf(str) !== -1) {
                tmp[key] = val;
            }
        });
        return tmp;
    };
});

twitchApp.filter('online', function() {
    return function(input, str) {
        var tmp = {};
        angular.forEach(input, function(val, key) {
            if (str === 'offline' && val[Object.keys(val)[0]].stream === null) {
                tmp[key] = val;
            } else if (str === 'online' && !!val[Object.keys(val)[0]].stream) {
                tmp[key] = val;
            } else if (str === 'all') {
                tmp[key] = val;
            }
        });
        return tmp;
    };
})