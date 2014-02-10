/**
 * Created by lenmara on 05.02.14.
 */
/**
 * Обработчик клика по ссылке с классом 'popup-link'
 * @param {Event} e событие клика
 * @private
 */
function _onMouseClick(e) {
    e.preventDefault();

    e = e || window.event;
    var target = e.target || e.srcElement;

    openPopupFromLink(target);
}

/**
 * Получает данные из ссылки
 * на основе этих данных создаёт попап (через createPopup) и добавляет его в DOM
 * @param {HTMLElement} link Ссылка с data-аттрибутами
 */
function openPopupFromLink(link) {
    var data = link.dataset

    var url = link.getAttribute('href');
    var title = data.title;
    var message = data.message.replace(/\%s/g, url);

    link.setAttribute('data-message', message);

    var onOk = function() {
        location.href = url;
    };

    createPopup(title, message, onOk);
}

/**
 * Создаёт DOM-узел с сообщением
 * @param {String} title Заголовок сообщение
 * @param {String} message Текст сообщения сообщение
 * @param {Function} onOk Обработчик клика по кнопке 'Да'
 * @returns {HTMLElement}
 */

function createPopup(title, message, onOk) {

    var wrapper = document.createElement('div');
    wrapper.className = 'wrapper';
    wrapper.onclick =  function(e) {
        var target = e.target || e.srcElement;
        if (target.getAttribute('class') == "wrapper") {
            wrapper.parentNode.removeChild(wrapper)
        }
    };

    var popup = document.createElement('div');
    popup.className = 'popup';
    popup.id = 'test';

    var exit = document.createElement('div');
    exit.className = 'exit';
    exit.onclick = function(e) {wrapper.parentNode.removeChild(wrapper)}


    var no = document.createElement('div');
    no.className = 'action no';
    no.innerHTML = 'Нет';
    no.onclick = function (e) { wrapper.parentNode.removeChild(wrapper) };

    var yes = document.createElement('div');
    yes.className = 'action yes';
    yes.innerHTML = 'Да';
    yes.onclick = function (e) { onOk(); };

    var head = document.createElement('h4');
    head.innerHTML = title;

    var content = document.createElement('span');
    content.innerHTML = message;

    window.document.onkeydown = function (e)
    {
        if (!e) e = event;
        if (e.keyCode == 27)
            wrapper.parentNode.removeChild(wrapper)

    }

    popup.appendChild(head);
    popup.appendChild(content);
    popup.appendChild(exit);
    popup.appendChild(no);
    popup.appendChild(yes);
    wrapper.appendChild(popup);

    document.body.appendChild(wrapper);
}



window.onload = function() {
    var popupLinks = document.getElementsByClassName('popup-link');
    for(var i = 0; i < popupLinks.length; i++) {
        AttachEvent(popupLinks[i], "click", _onMouseClick);
    }
}


function AttachEvent(element, type, handler) {
    if (element.addEventListener) {
        element.addEventListener(type, handler, false);
    }
    else {
        element.attachEvent("on"+type, handler);
    }
}

