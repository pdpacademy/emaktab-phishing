define('blocks/footer/footer', function () {
    return function () {
        var delay = 1000,
            doc = document,
            terms = doc.getElementsByClassName('footer__copyright__terms__six-plus')[0],
            block = doc.getElementsByClassName('footer__copyright__terms__speech-bubble')[0],
            mouseout = true;

        if (terms) {
            terms.addEventListener('mouseover', function () {
                mouseout = false;
                var mouseoverEvent = createEvent('mouseover');
                block.dispatchEvent(mouseoverEvent);
            });

            terms.addEventListener('mouseout', function () {
                mouseout = true;
                var mouseoutEvent = createEvent('mouseout');
                block.dispatchEvent(mouseoutEvent);
            });
        }

        if (block) {
            block.addEventListener('mouseover', function () {
                mouseout = false;
                block.classList.remove('footer__copyright__terms__speech-bubble_hidden');
                block.classList.add('footer__copyright__terms__speech-bubble_active');
            });

            block.addEventListener('mouseout', function () {
                mouseout = true;
                setTimeout(hide, delay);
            });
        }

        function hide() {
            if (mouseout) {
                block.classList.remove('footer__copyright__terms__speech-bubble_active');
                block.classList.add('footer__copyright__terms__speech-bubble_hidden');
            } else {
                setTimeout(hide, delay);
            }
        }

        function createEvent(type) {
            var e = document.createEvent('Event');
            e.initEvent(type, false, true);
            return e;
        }
    };
});
