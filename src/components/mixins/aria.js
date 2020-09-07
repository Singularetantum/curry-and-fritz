/*
*   This content is licensed according to the W3C Software License at
*   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*
*   This software or document includes material copied from or derived from "Modal Dialog Example" (https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/dialog.html). Copyright © 2020 W3C® (MIT, ERCIM, Keio, Beihang).
*/

const aria = {
  data() {
    return {
      keyCode: {
        BACKSPACE: 8,
        TAB: 9,
        RETURN: 13,
        SHIFT: 16,
        ESC: 27,
        SPACE: 32,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        END: 35,
        HOME: 36,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        DELETE: 46,
      },
      ignoreFocusChanges: false,
    };
  },
  methods: {
    isFocusable(element) {
      if (element.tabIndex < 0 || element.disabled) {
        return false;
      }

      switch (element.nodeName) {
        case 'A':
          return !!element.href && element.rel !== 'ignore';
        case 'INPUT':
          return element.type !== 'hidden';
        case 'BUTTON':
        case 'SELECT':
        case 'TEXTAREA':
          return true;
        default:
          return false;
      }
    },
    getFirstDescendant(element) {
      for (let i = 0; i < element.childNodes.length; i += 1) {
        const child = element.childNodes[i];

        if (this.isFocusable(child) || this.getFirstDescendant(child)) {
          return child;
        }
      }
      return false;
    },
    focusFirstDescendant(element) {
      for (let i = 0; i < element.childNodes.length; i += 1) {
        const child = element.childNodes[i];

        if (this.attemptFocus(child) || this.focusFirstDescendant(child)) {
          return true;
        }
      }
      return false;
    },
    focusLastDescendant(element) {
      for (let i = element.childNodes.length - 1; i >= 0; i -= 1) {
        const child = element.childNodes[i];

        if (this.attemptFocus(child) || this.focusLastDescendant(child)) {
          return true;
        }
      }
      return false;
    },
    attemptFocus(element) {
      if (!this.isFocusable(element)) {
        return false;
      }

      this.ignoreFocusChanges = true;

      try {
        element.focus();
      } catch (e) {
        // continue regardless of error
      }

      this.ignoreFocusChanges = false;

      return (document.activeElement === element);
    },
  },
};


export default aria;
