$.validator.messages.required = "Необходимо указать";
$.validator.messages.email = "Необходим верный Email.";
$.validator.messages.url = "Необходим верный URL-адрес.";
$.validator.messages.date = "Необходима верная дата.";
$.validator.messages.number = "Необходимо верное число.";
$.validator.messages.digits = "Допустимы только цифры.";
$.validator.messages.minlength = $.validator.format("Минимальное количество символов: {0}");

$.d = {
    common: {},
    journal: {},
    mailbox: {},
    blog: {},
    tag: {},
    file: {},
    test: {},
    schedule: {},
    lightbox: {},
    chart: {},
    calendar: {}
};

$.d.common.cancel = "Отмена";
$.d.common.close = "Закрыть";
$.d.common.del = "Удалить";
$.d.common.error = "ОШИБКА!";
$.d.common.errorTryAgain = "Ошибка! Попробуйте ещё раз.";
$.d.common.save = "Сохранить";
$.d.common.moderationOn = "Включить модерацию";
$.d.common.moderationOff = "Отключить модерацию";
$.d.common.userDeclensions = ["пользователь", "пользователя", "пользователей"];


$.d.journal.set = "Поставить оценку";
$.d.journal.setSucc = "Поставить зачет";
$.d.journal.setFail = "Поставить незачет";

$.d.journal.commentWrite = "Написать комментарий";
$.d.journal.themeWrite = "Указать тему";
$.d.journal.dismiss = "Освобожден";
$.d.journal.dismissShort = "ОСВ";
$.d.journal.groupEntryOn = "Включить групповой ввод оценок";
$.d.journal.groupEntryOff = "Отменить ввод оценок";
$.d.journal.na = "Неаттестован";
$.d.journal.naShort = "Н/А";
$.d.journal.entryAbsent = "Прогулял урок";
$.d.journal.entryAbsentShort = "Неявка";
$.d.journal.entryAttend = "Был на уроке";
$.d.journal.entryAttendShort = "Был";
$.d.journal.entryIll = "Болеет";
$.d.journal.entryIllShort = "Болеет";
$.d.journal.entryLate = "Опоздал";
$.d.journal.entryLateShort = "Опоздал";
$.d.journal.entryPass = "Пропуск по уважительной причине";
$.d.journal.entryPassShort = "Пропуск";
$.d.journal.sendMessageToParents = "Отправить сообщение родителям:";

$.d.journal.testSucc = "ЗЧ";
$.d.journal.testFail = "НЗ";
$.d.journal.markOral6 = "Велик";
$.d.journal.markOral5 = "Оч хор";
$.d.journal.markOral4 = "Хорошо";
$.d.journal.markOral3 = "Дост";
$.d.journal.markOral2 = "Недост";
$.d.journal.markOral1 = "Плохо";

$.d.journal.rubriks = "Рубрики";

$.d.mailbox.errorTryAgain = "Ошибка. Попробуйте повторить запрос позже.";
$.d.mailbox.messageDeleteConfirm = "Подтверждаете удаление писем?";

$.d.journal.behaviourBad = "Плохо";
$.d.journal.behaviourVeryBad = "Очень плохо";
$.d.journal.behaviourTerribly = "Ужасно";
$.d.journal.behaviourMisbehave = "Баловался";
$.d.journal.behaviourGoodWord = "Доброе слово";
$.d.journal.behaviourHomeworkIncomplete = "Не сделал домашнюю работу";
$.d.journal.behaviourNoSchoolTools = "Не принес школьные принадлежности";
$.d.journal.behaviourPhonePlaying = "Играл с мобильным";
$.d.journal.behaviourBadDiscipline = "Нарушение дисциплины";
$.d.journal.behaviourDisfunction = "Дисфункция";

$.d.blog.rubricAdd = "Новая рубрика добавлена";
$.d.blog.rubricDelete = "Рубрика удалена";

$.d.tag.remove = "Удалить тег";
$.d.tag.confirmRemoval = "Вы действительно хотите удалить тег?";

$.d.file.moveFiles = "Перенести файлы";
$.d.file.move = "Перенести";

$.d.mailbox.lettersDeclensions = ["письмо", "письма", "писем"];
$.d.mailbox.pleaseWait = "Подождите, пожалуйста, пока будет осуществлен переход в почту.";
$.d.mailbox.someTime = "Это может занять некоторое время.";
$.d.mailbox.activating = "Почта в процессе активации. Попробуйте зайти через несколько минут.";

$.d.schedule.lessonDeclensions = ["урок", "урока", "уроков"];

$.d.test.fromYourSchool = "Тест из вашей школы";
$.d.test.favouriteAdd = "Добавить в избранное";
$.d.test.favouriteRemove = "Убрать из избранного";

$.d.decline = function (number, titles) {
    var cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};

$.d.counters = {};
$.d.counters.billAmount = "Личный счёт";
$.d.counters.newMessages = "Новых сообщений";
$.d.counters.noMessages = "Нет новых сообщений";
$.d.counters.newFriendRequests = "Новых друзей";
$.d.counters.noFriendRequests = "Нет новых друзей";
$.d.counters.newGroups = "Новых приглашений";
$.d.counters.noGroups = "Нет новых приглашений";

$.d.lightbox.btnClose = "../../static.dnevnik.ru/images/lightbox/lightbox-btn-close.gif";
$.d.lightbox.btnNext = "../../static.dnevnik.ru/images/lightbox/lightbox-btn-next.gif";
$.d.lightbox.btnPrev = "../../static.dnevnik.ru/images/lightbox/lightbox-btn-prev.gif";

$.d.chart.localization = {
    lang: {
        loading: "Загрузка...",
        decimalPoint: ".",
        thousandsSep: ",",
        months: "Январь,Февраль,Март,Апрель,Май,Июнь,Июль,Август,Сентябрь,Октябрь,Ноябрь,Декабрь".split(","),
        shortMonths: "Янв,Фев,Мар,Апр,Май,Июн,Июл,Авг,Сен,Окт,Ноя,Дек".split(","),
        weekdays: "Воскресенье,Понедельник,Вторник,Среда,Четверг,Пятница,Суббота".split(","),
        weekdays_short: "Воскресенье,Понедельник,Вторник,Среда,Четверг,Пятница,Суббота".split(","),
        resetZoom: "Оригинальный масштаб",
        resetZoomTitle: "Масштаб 1:1",
        downloadJPEG: "Загрузить в формате JPEG",
        downloadPDF: "Загрузить в формате PDF",
        downloadPNG: "Загрузить в формате PNG",
        downloadSVG: "Загрузить в формате SVG",
        exportButtonTitle: "Экспорт",
        printButtonTitle: "Печать"
    }
};

$.d.calendar.localization = {
    lang: {
        months: "Январь,Февраль,Март,Апрель,Май,Июнь,Июль,Август,Сентябрь,Октябрь,Ноябрь,Декабрь".split(","),
        shortMonths: "Янв,Фев,Мар,Апр,Май,Июн,Июл,Авг,Сен,Окт,Ноя,Дек".split(","),
        weekdays: "Воскресенье,Понедельник,Вторник,Среда,Четверг,Пятница,Суббота".split(","),
        weekdays_short: "Вс,Пн,Вт,Ср,Чт,Пт,Сб".split(","),
        isHebrew: false,
        isArabic: false,
        todayLabel: 'Сегодня'
    }
};