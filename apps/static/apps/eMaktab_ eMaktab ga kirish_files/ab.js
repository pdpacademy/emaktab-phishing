define('ab/ab', function () {
    'use strict';

    var visitMetric = (function () {
        var sender;

        return {
            init: function (s) {
                sender = s;
            },
            start: function () {
                if (!dnevnik || !dnevnik.user) {
                    if (sender.isGroupA) {
                        sender.visitParams('groupA');
                    } else if (sender.isGroupB) {
                        sender.visitParams('groupB');
                    }
                }
            }
        };
    })();

    var entryMetric = (function () {

        var sender;

        var isHomePage = function () {
            return sender.subdomain === '' && window.location.pathname === '/';
        };

        var isLoginPageOnOldSite = function () {
            return sender.subdomain === 'login' && window.location.pathname === '/';
        };

        var isLoginPageOnNewSite = function () {
            return sender.subdomain === 'login' && /\/login\/{0,1}$/.test(window.location.pathname);
        };

        var sentGoal = function (a, b) {
            if (sender.isGroupA) {
                sender.reachGoal(a);
            } else if (sender.isGroupB) {
                sender.reachGoal(b);
            }
        };

        var sendGoalIfHomepage = function () {
            if (isHomePage()) {
                sentGoal('login1A', 'login1B');
            }
        };

        var sendGoalIfLoginForm = function () {
            var inputLogin, inputPassword;

            var freeze = true;

            var inputListener = function () {
                if (freeze) {
                    sentGoal('login2A', 'login2B');
                    freeze = false;
                }
            };

            if (isHomePage()) {
                inputLogin = document.querySelector('.form-login__layout_login .form-login__input');
                inputPassword = document.querySelector('.form-login__layout_password .form-login__input');
                if (!inputLogin && !inputPassword) {
                    inputLogin = document.querySelector('form#loginForm .login input');
                    inputPassword = document.querySelector('form#loginForm .password input');
                }
            } else if (isLoginPageOnOldSite()) {
                inputLogin = document.querySelectorAll('form#formLogin input#Login')[0];
                inputPassword = document.querySelectorAll('form#formLogin input#Password')[0];
            } else if (isLoginPageOnNewSite()) {
                inputLogin = document.querySelectorAll('form.login input[name="login"]')[0];
                inputPassword = document.querySelectorAll('form.login input[name="password"]')[0];
            }

            if (inputLogin && inputPassword) {
                inputLogin.addEventListener('input', inputListener);
                inputPassword.addEventListener('input', inputListener);
            }
        };

        var sendGoalIfEnter = function () {
            var buttonEnter;

            if (isLoginPageOnNewSite()) {
                buttonEnter = document.querySelectorAll('form.login input[value="Войти"]')[0];
            } else if (isLoginPageOnOldSite()) {
                buttonEnter = document.querySelectorAll('form#formLogin input#save')[0];
            } else if (isHomePage) {
                buttonEnter = document.querySelector('.form-login__layout .form-login__button');

                if (!buttonEnter) {
                    buttonEnter = document.querySelector('form#loginForm .submit input#login');
                }
            }

            var freeze = true;

            var inputListener = function () {
                if (freeze) {
                    sentGoal('login3A', 'login3B');
                    freeze = false;
                }
            };

            if (buttonEnter) {
                buttonEnter.addEventListener('click', inputListener);
            }
        };

        var defineErrorOnLoginPage = function () {
            var errorMessage = document.querySelector('form.login .login__body__hint_error-message');
            var errorLogin = document.querySelector('form.login .login__body__hint_login');
            var errorPassword = document.querySelector('form.login .login__body__hint_password');
            var errorCaptcha = document.querySelector('form.login .login__body__captcha');

            var errorInMessage = errorMessage && errorMessage.classList.contains('login__body__hint_hidden');
            var errorInLogin = errorLogin && errorLogin.classList.contains('login__body__hint_hidden');
            var errorInPassword = errorPassword && errorPassword.classList.contains('login__body__hint_hidden');
            var errorInCaptcha = errorCaptcha && errorCaptcha.classList.contains('login__body__captcha_hidden');

            return !(errorInMessage && errorInLogin && errorInPassword && errorInCaptcha);
        };

        var sendGoalIfError = function () {
            if (isLoginPageOnNewSite()) {
                if (defineErrorOnLoginPage()) {
                    sentGoal('login4A', 'login4B');
                }
            } else if (isLoginPageOnOldSite()) {
                var errorBlock = document.getElementById('errors');
                if (errorBlock) {
                    sentGoal('login4A', 'login4B');
                }
            }
        };

        return {
            init: function (s) {
                sender = s;
            },
            start: function () {
                sendGoalIfHomepage();
                sendGoalIfLoginForm();
                sendGoalIfEnter();
                sendGoalIfError();
            }
        };
    })();

    var recoveryMetric = (function () {
        var sender;
        var path = window.location.pathname;

        var sentGoal = function (a, b) {
            if (sender.isGroupA) {
                sender.reachGoal(a);
            } else if (sender.isGroupB) {
                sender.reachGoal(b);
            }
        };

        var isRecoveryPageOldSite = function () {
            return sender.subdomain === 'login' && /\/password\/{0,1}$/.test(path) && window.location.search === '';
            //проверяем search, чтобы счеткчик не срабатывал на новом сайте при смене пароля, т.к. там тоже субдомен = password
        };

        var isRecoveryPageNewSite = function () {
            return sender.subdomain === 'login' && /\/recovery\/{0,1}$/.test(path);
        };

        var userFoundWithErrors = function () {
            var placeholderForErrors = document.querySelector('.step1') || document.getElementById('placeholder-for-errors');
            if (placeholderForErrors) {
                return placeholderForErrors.getAttribute('data-user-found-with-errors') === 'true';
            }
        };

        var sendGoalIfRecoveryPage = function () {
            if (isRecoveryPageOldSite() || (isRecoveryPageNewSite() && !/https{0,1}:\/\/login.*.\/recovery\/{0,1}$/.test(document.referrer))) {
                sentGoal('passwordrecovery1A', 'passwordrecovery1B');
            }
        };

        var sendGoalIfIdentificationComplete = function () {
            var isSecretQuestionOnNewSite = path === '/recovery/question' && /https{0,1}:\/\/login.*.\/recovery\/{0,1}$/.test(document.referrer);
            var isFinishStepOnNewSite = path === '/recovery/bylogin';
            var isInputCodeOnNewSite = path === '/recovery/code' && /https{0,1}:\/\/login.*.\/recovery((\/contacts){0,1}|(\/{0,1})){0,1}$/.test(document.referrer);
            var isInformAboutMailOnNewSite = path === '/recovery/email';

            var isCheckAccountOnOldSite = path === '/password/checkaccount';
            var inputValidationCode = document.querySelector('input#ValidationCode');
            var inputAnswer = document.querySelector('input#Answer');

            var checkAfterQuestion = function () {
                var element = document.querySelector('[data-is-after-question]');

                return element && element.getAttribute('data-is-after-question') !== 'true';
            };

            var identificationCompleteOnNewSite = function () {
                return isSecretQuestionOnNewSite || ((isFinishStepOnNewSite || isInputCodeOnNewSite || isInformAboutMailOnNewSite) && checkAfterQuestion()) ||
                       (isRecoveryPageNewSite() && userFoundWithErrors());
            };

            var identificationCompleteOnOldSite = function () {
                return isCheckAccountOnOldSite && userFoundWithErrors() ||
                       (isCheckAccountOnOldSite && inputValidationCode) ||
                       (isCheckAccountOnOldSite && inputAnswer);
            };

            if (identificationCompleteOnNewSite() || identificationCompleteOnOldSite()) {
                sentGoal('passwordrecovery2A', 'passwordrecovery2B');
            }
        };

        var sendGoalIfRecoveryComplete = function () {
            var isFinishStepOnOldSite = path === '/password/setnewpassword';
            var isFinishStepOnNewSite = path === '/recovery/bylogin' || path === '/passwordchanged';

            if (isFinishStepOnNewSite || isFinishStepOnOldSite) {
                sentGoal('passwordrecovery3A', 'passwordrecovery3B');
            }
        };

        return {
            init: function (s) {
                sender = s;
            },
            start: function () {
                sendGoalIfRecoveryPage();
                sendGoalIfIdentificationComplete();
                sendGoalIfRecoveryComplete();
            }
        };
    })();

    var joinMetric = (function () {

        var sender;

        var sentGoal = function (a, b) {
            if (sender.isGroupA) {
                sender.reachGoal(a);
            } else if (sender.isGroupB) {
                sender.reachGoal(b);
            }
        };

        var sendIfStart = function () {

            if (sender.subdomain === 'company' &&
                window.location.pathname === '/join/form/' &&
                window.location.search === '?submit=%D0%9F%D0%BE%D0%B4%D0%B0%D1%82%D1%8C+%D0%B7%D0%B0%D1%8F%D0%B2%D0%BA%D1%83') {

                sentGoal('join1A', 'join1B');

            }

            else if (sender.subdomain === 'login' && /\/join\/role\/{0,1}$/.test(window.location.pathname)) {

                var button = document.querySelector('.school-join-step1 button');

                if (button) {
                    button.addEventListener('click', function () {
                        sentGoal('join1A', 'join1B');
                    });
                }

            }

        };

        var sendIfFinish = function () {

            if (sender.subdomain === 'company' &&
                window.location.pathname === '/join/form/' &&
                /\?view=sent&school=\d{1,}/.test(window.location.search)) {

                sentGoal('join2A', 'join2B');

            }

            else if (sender.subdomain === 'login' && /join\/finish\/\d{1,}\/{0,1}/.test(window.location.pathname)) {

                sentGoal('join2A', 'join2B');

            }

        };

        return {
            init: function (s) {
                sender = s;
            },
            start: function () {
                sendIfStart();
                sendIfFinish();
            }
        };

    })();

    var registerMetric = (function () {

        var sender;

        var sentGoal = function (a, b) {
            if (sender.isGroupA) {
                sender.reachGoal(a);
            } else if (sender.isGroupB) {
                sender.reachGoal(b);
            }
        };

        var sendIfFirstPage = function () {

            var isOk = sender.subdomain === 'login' && document.referrer !== '';

            var isOkSearchQuery = /\?login=\S{1,}&code=[0-9a-f]{1,}/.test(window.location.search);

            var isUserRegistrationOnOldSite = window.location.pathname === '/useractivation/register' && isOkSearchQuery;

            var isUserRegistrationOnNewSite = !/https{0,1}:\/\/login.*.\/useractivation\/security\?code=[0-9a-f]{1,}/.test(document.referrer) &&
                window.location.pathname === '/useractivation/personal' &&
                isOkSearchQuery;

            var isSchoolRegistrationOnOldSite = window.location.pathname === '/schoolactivation/register' && isOkSearchQuery;

            var isSchoolRegistrationOnNewSite = !/https{0,1}:\/\/login.*.\/schoolactivation\/personal\?code=[0-9a-f]{1,}/.test(document.referrer) &&
                window.location.pathname === '/schoolactivation/information' &&
                isOkSearchQuery;

            var result = isOk && ((isUserRegistrationOnOldSite || isUserRegistrationOnNewSite) || (isSchoolRegistrationOnOldSite || isSchoolRegistrationOnNewSite));

            if (result) {

                sentGoal('registr1A', 'registr1B');

            }

        };

        var sendIfRegistred = function () {

            var isSchoolWizard = /https{0,1}:\/\/school.*.\/v2\/admin\/wizard\?school=[0-9]{1,}&step=building&message=activated/.test(window.location.href);

            var result = isSchoolWizard && /tracked=true/.test(window.location.href);

            if (result) {

                sentGoal('registr2A', 'registr2B');

            }

        };

        return {
            init: function (s) {
                sender = s;
            },
            start: function () {
                sendIfFirstPage();
                sendIfRegistred();
            }
        };

    })();

    var metrikaIds = dnevnik.settings.yandexMetrikaIds,
        reachGoal, visitParams,
        deps = [visitMetric, entryMetric, recoveryMetric, joinMetric, registerMetric];

      reachGoal = function (target) {
        metrikaIds.forEach(metrikaId => {
          var counter = window['yaCounter' + metrikaId];

          console.debug('A/B CALL GOAL > ' + target);

          if (counter && counter.reachGoal) {
            counter.reachGoal(target);

            console.debug('A/B SEND GOAL > ' + target);
          }
        });
      };

      visitParams = function (obj) {
        metrikaIds.forEach(metrikaId => {
          var counter = window['yaCounter' + metrikaId];

          console.debug('A/B CALL PARAMS > ', obj);

          if (counter && counter.params) {
            counter.params(obj);

            console.debug('A/B SEND PARAMS > ', obj);
          }
        });
      };


    return {
        init: function (model) {
            var i, l = deps.length, sender;

            sender = {
                subdomain: model.subdomain,
                reachGoal: reachGoal,
                visitParams: visitParams,
                isGroupA: model.group === 'groupA',
                isGroupB: model.group === 'groupB'
            };

            for (i = 0; i < l; i += 1) {
                deps[i].init(sender);
            }
        },
        start: function () {
            var i, l = deps.length;

            for (i = 0; i < l; i += 1) {
                deps[i].start();
            }
        }
    };
});
