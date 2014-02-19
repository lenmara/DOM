/**
 * Created by lenmara on 18.02.14.
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

    if (target.classList.contains('popup-link')) {
        openPopupFromLink(target);
    }
}

/**
 * Получает данные из ссылки
 * на основе этих данных создаёт попап (через createPopup) и добавляет его в DOM
 * @param {HTMLElement} link Ссылка с data-аттрибутами
 */
function openPopupFromLink(link) {
    var data = link.dataset,
        url = link.getAttribute('href'),
        title = data.title,
        message = data.message.replace(/\%s/g, url),
        onOk = function() {
            location.href = url;
        };

    link.setAttribute('data-message', message);
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
    var overlay = document.querySelectorAll('.b-overlay')
    overlayWasBefore = false;

    if (overlay.length > 0) {
        overlayWasBefore = true;
        overlay = overlay[0];
    } else {
        overlay = document.createElement('div');
        overlay.className = 'b-overlay';
        overlay.onclick = function(e) {
            var target = e.target || e.srcElement;
            if (target.getAttribute('class') == "overlay") {
                overlay.parentNode.removeChild(overlay)
            }
        };
    }
    overlay.innerHTML = '<div class="popup"><span>' + title + '?</span>' +'<h4>' + message + '</h4>' +
        '<div class="exit"></div>' +'<div class="button grey no">Нет</div>' +'<div class="button grey yes">Да</div></div>';
    overlay.querySelectorAll('.yes')[0].addEventListener("click", onOk, false);

    var closePopupElems = overlay.querySelectorAll('.no, .exit');

    for (var i = 0; i < closePopupElems.length; i++) {
        closePopupElems[i].addEventListener("click", close, false);
    }

    if (overlayWasBefore) {
        overlay.style.display = '';
    } else {
        document.body.appendChild(overlay);
    }
}

function close(){
    var overlay = document.querySelectorAll('.b-overlay');

    if (overlay.length > 0) {
        overlay = overlay[0];
    }
    overlay.style.display = 'none';
};
document.body.addEventListener("click", _onMouseClick, false);
