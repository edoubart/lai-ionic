angular.module('app.controllers', [])

    .controller('mainCtrl', function ($scope, $state, $auth, Auth, Errors) {
        $scope.Auth = Auth;

        $scope.Errors = Errors;

        // Satellizer token-based authentication (Facebook, Google)
        $scope.authenticate = function (provider) {
            $auth.authenticate(provider).
                then(function (response) {
                    $scope.submitting = false;
                    $scope.submitted = true;
                    $scope.has_error = false;

                    $scope.Auth.loggedIn = true;
                    $scope.Auth.user = response.data.success.data.user;

                    $state.go('menu.home');
                }).catch(function (response) {
                    $scope.submitting = false;
                    $scope.submitted = false;
                    $scope.has_error = true;

                    $scope.Auth.loggedIn = false;
                    $scope.Auth.user = {};

                    $scope.Errors = response.data.error.data.errors;
                });
        };
    })

    .controller('welcomeCtrl', function ($scope) {

    })

    .controller('homeCtrl', function ($scope, $state, Auth) {
        $scope.Auth = Auth;

        if (!$scope.Auth.loggedIn) {
            $state.go('menu.login');
        }
    })

    .controller('loginCtrl', function ($scope, $state, $http, Auth, Errors) {
        $scope.Auth = Auth;
        $scope.Auth.loggedIn = false;
        $scope.Auth.user = {};

        $scope.Errors = Errors;

        $scope.formModel = {};
        $scope.submitting = false;
        $scope.submitted = false;
        $scope.has_error = false;

        $scope.onSubmit = function () {
            $scope.submitting = true;

            $http.post('http://lai-laravel:8000/api/v1/login', $scope.formModel).
                success(function (data) {
                    $scope.submitting = false;
                    $scope.submitted = true;
                    $scope.has_error = false;

                    $scope.Auth.loggedIn = true;
                    $scope.Auth.user = data.success.data.user;

                    $state.go('menu.home');
                }).error(function (data) {
                    $scope.submitting = false;
                    $scope.submitted = false;
                    $scope.has_error = true;

                    $scope.Auth.loggedIn = false;
                    $scope.Auth.user = {};

                    $scope.Errors = data.error.data.errors;
                });
        };
    })

    .controller('logoutCtrl', function ($scope, $state, $http, Auth, Errors) {
        $scope.Auth = Auth;

        $scope.Errors = Errors;

        $scope.has_error = false;

        $http.get('http://lai-laravel:8000/api/v1/logout').
            success(function (data) {
                $scope.has_error = false;

                $scope.Auth.loggedIn = false;
                $scope.Auth.user = {};

                $state.go('menu.welcome');
            }).error(function (data) {
                $scope.has_error = true;

                $scope.Errors = data.error.data.errors;
            });
    })

    .controller('registerCtrl', function ($scope, $state, $http, Auth, Errors) {
        $scope.Auth = Auth;
        $scope.Auth.loggedIn = false;
        $scope.Auth.user = {};

        $scope.Errors = Errors;

        $scope.formModel = {};
        $scope.submitting = false;
        $scope.submitted = false;
        $scope.has_error = false;

        $scope.onSubmit = function () {
            $scope.submitting = true;

            $http.post('http://lai-laravel:8000/api/v1/register', $scope.formModel).
                success(function (data) {
                    $scope.submitting = false;
                    $scope.submitted = true;
                    $scope.has_error = false;

                    $scope.Auth.loggedIn = true;
                    $scope.Auth.user = data.success.data.user;

                    $state.go('menu.home');
                }).error(function (data) {
                    $scope.submitting = false;
                    $scope.submitted = false;
                    $scope.has_error = true;

                    $scope.Auth.loggedIn = false;
                    $scope.Auth.user = {};

                    console.log(data);

                    $scope.Errors = data.error.data.errors;
                });
        };
    })

    .controller('passwordEmailCtrl', function ($scope, $state, $http, Auth, Successes, Errors) {
        $scope.Auth = Auth;

        if ($scope.Auth.loggedIn) {
            $state.go('welcome');
        }

        $scope.Successes = Successes;

        $scope.Errors = Errors;

        $scope.formModel = {};
        $scope.submitting = false;
        $scope.submitted = false;
        $scope.has_error = false;

        $scope.onSubmit = function () {
            $scope.submitting = true;

            $http.post('http://lai-laravel:8000/api/v1/password/email', $scope.formModel).
                success(function (data) {
                    $scope.submitting = false;
                    $scope.submitted = true;
                    $scope.has_error = false;

                    $scope.Successes = data.success.data.successes;
                }).error(function (data) {
                    $scope.submitting = false;
                    $scope.submitted = false;
                    $scope.has_error = true;

                    $scope.Errors = data.error.data.errors;
                });
        };
    })

    .controller('passwordResetCtrl', function ($scope, $state, $stateParams, $http, Auth, Successes, Errors) {
        $scope.Auth = Auth;

        if ($scope.Auth.loggedIn) {
            $state.go('welcome');
        }

        $scope.Successes = Successes;

        $scope.Errors = Errors;

        $scope.formModel = {};
        $scope.submitting = false;
        $scope.submitted = false;
        $scope.has_error = false;

        $scope.onSubmit = function () {
            $scope.submitting = true;

            $scope.formModel.token = $stateParams.token;

            $http.post('http://lai-laravel:8000/api/v1/password/reset', $scope.formModel).
                success(function (data) {
                    $scope.submitting = false;
                    $scope.submitted = true;
                    $scope.has_error = false;

                    //$scope.Successes = data.success.data.successes;;

                    $scope.Auth.loggedIn = true;
                    $scope.Auth.user = data.success.data.user;

                    $state.go('home');
                }).error(function (data) {
                    $scope.submitting = false;
                    $scope.submitted = false;
                    $scope.has_error = true;

                    $scope.Errors = data.error.data.errors;
                });
        };
    });