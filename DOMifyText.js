'use strict';

const DOMifyText = (() => {
  const inputText = Symbol("inputText");
  const elementOptions = Symbol("elementOptions");

  const getRandomID = Symbol("getRandomID");

  const defaultOptions = {
    elementType: "div",
    elementClasses: [],
    setIDs: false,
    delimiter: " "
  };

  return class DOMifier {
    /**
     * Create a DOMifier
     * @class
     * @param {string} text Text to be DOMified.
     * @param {Object} [options] Parameters for the created elements.
     * @param {string} [options.elementType] Element type to be created.
     * @param {string[]} [options.classes] Classes to be added to the DOM Element.
     * @param {string|RegExp} [options.delimiter] A delimiter or a regular expression to divide words into elements.
     * @param {bool} [options.withIDs] When true, random(ish) IDs will be added to the generated elements.
     */
    constructor (text = "", options = {}) {
      this[inputText] = text;
      this[elementOptions] = Object.assign({}, defaultOptions, options);
    }

    /**Gets an Array of DOM elements
     * @readonly
     * @returns {Array<DOMElement>} - An Array of DOMElements created from the intial text.
    */
    get DOMElements() {
      return this[inputText]
        .split(this[elementOptions].delimiter)
        .map(word => {
          const wordTextNode = document.createTextNode(word);
          const options = this[elementOptions];
          const element = document.createElement(options.elementType.toUpperCase());

          if (options.elementClasses.length !== 0 && options.elementClasses instanceof Array) {
            element.className = options.elementClasses.join(' ');
          }

          if (options.setIDs === true) element.id = this[getRandomID]();

          element.appendChild(wordTextNode);
          return element;
        });
    }

    /**
     * Sets a text to be DOMified.
     * @param {string} newText - Text to be DOMified.
     */
    set text(newText = "") {
      this[inputText] = newText;
    }

    /**
     * Sets new classes
     * @param {sting[]} newClasses - new Element classes to be set.
     */
    set classes (newClasses = []) {
      this[elementOptions].elementClasses = newClasses;
    }

    /**
     * Sets a new delimiter
     * @param {string} delimiter A new delimiter
     */
    set delimiter (newDelimiter = " ") {
      this[elementOptions].delimiter = newDelimiter;
    }

    /**
     * Appends more classes to the Elements.
     * @param {string[]} classes - Array of classes to be added.
     * @returns {DOMifier} - An instance of DOMifier (for chaining purposes).
     */
    addClasses (classes = []) {
      if (classes !== [] && classes instanceof Array) {
        this[elementOptions].elementClasses = [...this[elementOptions].elementClasses, ...classes];
      }
      return this;
    }

    [getRandomID]() {
      //from https://codewithmark.com/easily-generate-random-alphanumeric-string-in-javascript
      return Math.random().toString(36).replace('0.', '');
    }
  }
})();