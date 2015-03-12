var app = angular.module("NodeApplication", []);

app.controller("NodeController", function ($scope, $http) {
    $scope.selectedIndex = null;
    $scope.courseDetails = [];

    // get
    $http.get("/api/courses")
    .success(function (response) {
        $scope.courses = response;
    });

    // save
    $scope.savecourse = function (course) {
        $http.put("/api/courses/" + $scope.selectedIndex, course).
        success(function (response) {
            $scope.courses = response;
        });
    }

    // edit
    $scope.editcourse = function (index) {
        $scope.courseDetails = [];
        if ($scope.selectedIndex === index) {
            $scope.selectedIndex = null;
            $scope.course = null;
        }
        else {
            $scope.selectedIndex = index;
            $scope.course = $scope.courses[index];
        }
    }

    // add
    $scope.addcourse = function (course) {
        $http.post("/api/courses", course)
        .success(function (response) {
            $scope.courses = response;
        });
    }

    // delete
    $scope.deletecourse = function (index) {
        $http.delete("/api/courses/" + index)
         .success(function (response) {
             $scope.courses = response;
         });
    }

});
