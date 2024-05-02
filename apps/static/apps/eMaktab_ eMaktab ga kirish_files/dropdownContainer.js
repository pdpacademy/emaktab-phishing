define('blocks/dropdownContainer/dropdownContainer', function () {
    'use strict';
    return function (model) {
        var tumblerClass = '.' + model.tumblerClass;
        var activationClasses = model.activationClasses;

        if (activationClasses && activationClasses.length > 0) {
            var tumbler = document.querySelector(tumblerClass);
            if (tumbler) {
                tumbler.addEventListener('click', function (event) {
                    event.stopPropagation();
                    activationClasses.forEach(function (activationClass) {
                        var activationElement = tumbler.querySelector('.' + activationClass);
                        if (activationElement) {
                            activationElement.classList.toggle(activationClass + '_active');
                        }
                    });
                });
                document.querySelector('body').addEventListener('click', function () {
                    activationClasses.forEach(function (activationClass) {
                        var activationElement = tumbler.querySelector('.' + activationClass);
                        if (activationElement) {
                            activationElement.classList.remove(activationClass + '_active');
                        }
                    });
                });
            }
        }
    };
});
