angular.module('app.routes', [])

    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            .state('menu', {
                url: '/',
                templateUrl: 'templates/menu.html',
                abstract: true
            })

            .state('menu.welcome', {
                url: '',
                views: {
                    'side-menu': {
                        templateUrl: 'templates/welcome.html',
                        controller: 'welcomeCtrl'
                    }
                }
            })

            .state('menu.home', {
                url: 'home',
                views: {
                    'side-menu': {
                        templateUrl: 'templates/home.html',
                        controller: 'homeCtrl'
                    }
                }
            })

            .state('menu.login', {
                url: 'login',
                views: {
                    'side-menu': {
                        templateUrl: 'templates/auth/login.html',
                        controller: 'loginCtrl'
                    }
                }
            })

            .state('menu.logout', {
                url: 'logout',
                views: {
                    'side-menu': {
                        controller: 'logoutCtrl'
                    }
                }
            })

            .state('menu.register', {
                url: 'register',
                views: {
                    'side-menu': {
                        templateUrl: 'templates/auth/register.html',
                        controller: 'registerCtrl'
                    }
                }
            })

            .state('menu.password-email', {
                url: 'password/email',
                views: {
                    'side-menu': {
                        templateUrl: 'templates/auth/passwords/email.html',
                        controller: 'passwordEmailCtrl'
                    }
                }
            })

            .state('menu.password-reset', {
                url: 'password/reset/:token',
                views: {
                    'side-menu': {
                        templateUrl: 'templates/auth/passwords/reset.html',
                        controller: 'passwordResetCtrl'
                    }
                }
            })

        $urlRouterProvider.otherwise('/')


    });