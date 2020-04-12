import logging from 'node-logging-js';
import jsb from 'node-jsb';

export default class OpeningHours {
    constructor(element, options) {
        logging.applyLogging(this, 'OpeningHours');
        this.logDebug('options:', options);
        this.element = element;

        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.checkTime();
    }

    checkTime() {
        if (this.checkTimer) {
            clearInterval(this.checkTimer);
        }

        const date = new Date();
        const day = date.getDay();
        const hours = date.getHours();
        const isClosed = (day === 1 || hours < 11 || hours > 22);

        this.toggleClosed(isClosed);

        this.checkTimer = setTimeout(this.checkTime, 10000);
    }

    toggleClosed(isClosed) {
        this.element.classList.toggle('is-closed', isClosed);
    }
}

jsb.registerHandler('OpeningHours', OpeningHours);
