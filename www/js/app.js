// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', [
    'ionic',
    'app.controllers',
    'app.routes',
    'app.services',
    'app.directives',
    'jcs-autoValidate',
    'angular-ladda',
    'satellizer'
])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($httpProvider, laddaProvider) {
        $httpProvider.defaults.headers.common['Accept'] = 'application/json';
        laddaProvider.setOption({
            style: 'expand-right'
        });
    })

    .config(function ($authProvider) {
        // Facebook
        $authProvider.facebook({
            clientId: '198964623818788',
            name: 'facebook',
            url: 'http://lai-laravel.dev:8000/api/v1/auth/provider/callback/facebook',
            authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
            redirectUri: window.location.origin + '/',
            requiredUrlParams: ['display', 'scope'],
            scope: ['email'],
            scopeDelimiter: ',',
            display: 'popup',
            type: '2.0',
            popupOptions: {width: 580, height: 400}
        });

        // Google
        $authProvider.google({
            clientId: '301072675710-dn2djmrl8kvervr8eko0pagu076kppqd.apps.googleusercontent.com',
            url: 'http://lai-laravel.dev:8000/api/v1/auth/provider/callback/google',
            authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
            redirectUri: window.location.origin,
            requiredUrlParams: ['scope'],
            optionalUrlParams: ['display'],
            scope: ['profile', 'email'],
            scopePrefix: 'openid',
            scopeDelimiter: ' ',
            display: 'popup',
            type: '2.0',
            popupOptions: {width: 452, height: 633}
        });
    })

    .run(function (defaultErrorMessageResolver) {
        defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
            errorMessages['confirmed'] = 'The password confirmation does not match.';
        });
    })

    .run([
        'validator',
        'validationDomModifier',
        function (validator, validationDomModifier) {
            validator.registerDomModifier(validationDomModifier.key, validationDomModifier);
            validator.setDefaultElementModifier(validationDomModifier.key);
        }
    ]);