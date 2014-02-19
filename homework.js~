/**
 * Created by lenmara on 14.02.14.
 */
function AttachEvent(element, type, handler) {
    if (element.addEventListener) {
        element.addEventListener(type, handler, false);
    }
    else {
        element.attachEvent("on"+type, handler);
    }
}

function Popup(elem, message, title, link) {
    this._elem = elem;
    this._message = message;
    this._title = title;
    this._link = link;
    this._overlay;
    this.init();
}

Popup.prototype = {
    init: function() {
        var self = this;
        AttachEvent(this._elem, "click", function(e) {
            self.showPopup(e);
        });
    },


    showPopup: function(e) {
        var self = this;
        e.preventDefault();

        if (!this._overlay) {

            var popup = document.createElement('div'),
                exit = document.createElement('div'),
                noBtn = document.createElement('div'),
                yesBtn = document.createElement('div'),
                head = document.createElement('h4'),
                content = document.createElement('span');

            this._overlay = document.createElement('div');
            this._overlay.className = 'b-overlay';
            AttachEvent(this._overlay, 'click', function() { self.closePopup(); });

            popup.className = 'popup';
            popup.id = 'test';
            AttachEvent(popup, 'click', function(e) { self.clickStopPropagation(e); });

            exit.className = 'exit';
            AttachEvent(exit,'click', function(e) { self.closePopup(e); });;

            noBtn.className = 'button grey no';
            noBtn.innerHTML = 'Нет';
            AttachEvent(noBtn, 'click', function(e) { self.onCancel(e); });

            yesBtn.className = 'button grey yes';
            yesBtn.innerHTML = 'Да';
            AttachEvent(yesBtn, 'click', function(e) { self.onYes(e); });

            head.innerHTML = this._title;

            content.innerHTML = this._message;

            popup.appendChild(content);
            popup.appendChild(head);
            popup.appendChild(exit);
            popup.appendChild(noBtn);
            popup.appendChild(yesBtn);

            this._overlay.appendChild(popup)
            this._overlay.innerHTML;
        }
        document.body.appendChild(this._overlay);

    },


    closePopup: function() {
        document.body.removeChild(this._overlay);
    },
    clickStopPropagation: function(event) {
        event = event || window.event;

        if (event.stopPropagation) {

            event.stopPropagation();
        } else {

            event.cancelBubble = true;
        }

    },
    targetClick: function() {
        this.showPopup();
    },
    onYes: function() {
        location.href = this._link;

    },
    onCancel: function() {
        this.closePopup();


    }
}

window.onload = function() {
    var popupLinks = document.getElementsByClassName('popup-link');
    for(var i = 0; i < popupLinks.length; i++) {
        var data = popupLinks[i].dataset,
            url = popupLinks[i].getAttribute('href'),
            title = data.title,
            message = data.message.replace(/\%s/g, url);

        new Popup(popupLinks[i], message, title, url);
    }
}

