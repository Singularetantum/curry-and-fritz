import logging from 'node-logging-js';
import jsb from 'node-jsb';

export default class Collapsible {
    constructor(element, options) {
        logging.applyLogging(this, 'Collapsible');
        this.logDebug('options:', options);
        this.element = element;
        this.toggleEl = element.querySelector('.title');
        this.elementBody = element.querySelector('.body');
        this.isOpen = false;

        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.toggleEl.addEventListener('click', this.toggle);
    }

    toggle() {
        this.isOpen = !this.isOpen;
        this.element.classList.toggle('is-open', this.isOpen);
        this.elementBody.style.height = this.isOpen ? `${this.elementBody.scrollHeight}px` : '0';
    }
}

jsb.registerHandler('Collapsible', Collapsible);
