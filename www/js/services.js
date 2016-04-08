angular.module('app.services', [])

    .factory('BlankFactory', [function () {

    }])

    .factory('Auth', function () {
        var auth = {
            loggedIn: false,
            user: {}
        };
        return auth;
    })

    .factory('Successes', function () {
        return {};
    })

    .factory('Errors', function () {
        return {};
    })

    .factory('validationDomModifier',
    function () {
        var
            hasErrorClass = 'has-error',
            fieldErrorClass = 'field-error',

            reset = function (el) {
                el.removeClass(hasErrorClass);
                var nextElement = el.next();
                if (nextElement !== undefined && nextElement.hasClass(fieldErrorClass)) {
                    nextElement.remove();
                }
            },

            findParentLabel = function (el) {
                var parent = el;
                for (var i = 0; i <= 3; i += 1) {
                    if (parent !== undefined && parent[0].tagName === 'LABEL') {
                        break;
                    } else if (parent !== undefined) {
                        parent = parent.parent();
                    }
                }

                return parent;
            },

            makeValid = function (el) {
                reset(findParentLabel(el));
            },

            makeInvalid = function (el, errorMsg) {
                var parent = findParentLabel(el);
                reset(parent);
                parent.addClass(hasErrorClass);

                var errorTextEl = angular.element('<div class="' + fieldErrorClass + '">' + errorMsg + '</div>');
                parent.after(errorTextEl);
            },

            makeDefault = function (el) {
                reset(findParentLabel(el));
            };

        return {
            makeValid: makeValid,
            makeInvalid: makeInvalid,
            makeDefault: makeDefault,
            key: 'validationDomModifier'
        };
    })

    .service('BlankService', [function () {

    }]);

