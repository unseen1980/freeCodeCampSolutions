var wikipediaApp = angular.module('wikipediaApp', []);
wikipediaApp.controller('wikipediaController', function wikipediaController($scope, $http) {
    $scope.query = '';
    $scope.resultsList = {};
    $scope.showList = false;
    $scope.search = function() {
        var url = 'https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=' + $scope.query + '&callback=JSON_CALLBACK';
        $http.jsonp(url)
            .then(function(data) {
                $scope.resultsList = data.data.query.pages;
                $scope.showList = Object.keys($scope.resultsList).length > 0;
                console.log($scope.resultsList);
            });
    }
});