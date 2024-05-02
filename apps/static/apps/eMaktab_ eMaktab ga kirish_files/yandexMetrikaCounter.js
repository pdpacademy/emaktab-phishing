define('yandexMetrika/yandexMetrikaCounter', function () {
    'use strict';

    (function (d, w, c) {

        var ids = dnevnik.settings.yandexMetrikaIds;
        var user = dnevnik.user;
        var visitParams = dnevnik.visitParams;
        var params;
        var childrenAge;
        var childrenSex;
        var useAdBlock;

        if (user) {
            if (user.children) {
                childrenAge = user.children.map(function (child) {
                    return child.age;
                });
                childrenSex = user.children.map(function (child) {
                    return child.sex;
                });
            }
            if (typeof w.useAdBlock === 'undefined') {
                useAdBlock = true;
            } else {
                useAdBlock = false;
            }

            params = {
                params: {
                    Authenticated: [
                        'true', {
                            User: [
                                user.id, {
                                    Sex: [
                                        user.sex, {
                                            Age: [
                                                user.age, {
                                                    Role: [
                                                        user.role, {
                                                            schoolId: [
                                                                user.schools, {
                                                                    childrenAge: [
                                                                        childrenAge, {
                                                                            childrenSex: [
                                                                                childrenSex, {
                                                                                    useAdBlock: useAdBlock
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    ActivityGroup: [user.group]
                }
            };

        } else {
            params = {
                params: {
                    Authenticated: 'false'
                }
            };
        }

        Object.keys(visitParams)
            .forEach(function (k) {
                if (visitParams[k]) {
                    params[k] = visitParams[k];
                }
            });

      ids.forEach(metrikaId => {
        var eventName = 'yacounter' + metrikaId + 'inited';
        document.addEventListener(eventName, function () {
          var callbackQueue = window.yandex_metrika_callbacks;
          if (callbackQueue !== null) {
            while (callbackQueue && callbackQueue.length) {
              callbackQueue.pop()();
            }
            window.yandex_metrika_callbacks = null;
          }
        });
      });

      (function (m, e, t, r, i, k, a) {
        m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
        m[i].l = 1 * new Date();
        k = e.createElement(t);
        a = e.getElementsByTagName(t)[0];
        k.async = 1;
        k.src = r;
        a.parentNode.insertBefore(k, a);
      })
        (window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');

        for (var k in ids) {
          if (ids.hasOwnProperty(k)) {
            w[c] = w[c] || [];
            window.ym(ids[k], 'init', {
              clickmap: dnevnik.settings.yandexMetrikaСlickmapEnabled,
              trackLinks: true,
              accurateTrackBounce: true,
              webvisor: dnevnik.settings.yandexMetrikaWebvisorEnabled,
              triggerEvent: true,
              params: params || {}
            });
          }
        }
    })(document, window, 'yandex_metrika_callbacks');
});
