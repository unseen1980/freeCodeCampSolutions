var randomQuoteApp = angular.module('randomQuoteApp', ['ngSanitize']);
randomQuoteApp.controller('randomQuoteController', function randomQuoteController($scope, $http) {
    $scope.quote = '';
    $scope.next = function() {
        var url = 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1';
        $http.get(url + "?" + new Date().toString())
            .then(function(data) {
                $scope.quote = data.data[0].content;
                $scope.text = $scope.quote.replace(/<\/?[^>]+(>|$)/g, "");
                $scope.person = data.data[0].title;
            });
    }
    $scope.next();
});
