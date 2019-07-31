'use strict';

const DOMifyText = (() => {
  // Private Properties
  const inputText = Symbol("inputText");
  const elementOptions = Symbol("elementOptions");

  // Private Methods
  const getRandomID = Symbol("getRandomID");
  const getDOMElementGroups = Symbol("getDOMElementGroups");
  const makeGroups = Symbol("makeGroups");
  const combineClasses = Symbol("combineClasses");

  const defaultOptions = {
    elementType: "div",
    elementClasses: [],
    setIDs: false,
    delimiter: " ",
    group: {
      elementsPerGroup: 1,
      groupContainer: "div",
      groupClasses: [],
      groupElementClasses: []
    }
  };

  return class DOMifier {
    /**
     * Create a DOMifier
     * @class
     * @param {string} text Text to be DOMified.
     * @param {Object} [options] Parameters for the created elements.
     * @param {string} [options.elementType] Element type to be created.
     * @param {string|string[]} [options.elementClasses] Classes to be added to the DOM Element.
     * @param {string|RegExp} [options.delimiter] A delimiter or a regular expression to divide words into elements.
     * @param {boolean} [options.setIDs] When true, random(ish) IDs will be added to the generated elements.
     * @param {Object} [options.group] Grouping options for the elements.
     * @param {number} [options.group.elementsPerGroup] Defines a number of elements per group.
     * @param {string} [options.group.groupContainer] Element type of a group.
     * @param {string|string[]} [options.group.groupClasses] Classes to be added to the group DOM element.
     * @param {string|string[]|Array<string[]>} [options.group.groupElementClasses] Classes to be added to the elements of the group.
     */
    constructor (text = "", options = {}) {
      this[inputText] = text;
      // maybe one day will implement a deep merge...
      this[elementOptions] = Object.assign({}, defaultOptions, options);
      this[elementOptions].group = Object.assign({}, defaultOptions.group, options.group);
    }

    /**Gets an Array of DOM elements
     * @readonly
     * @returns {Array<DOMElement>} - An Array of DOMElements created from the intial text.
    */
    get DOMElements() {
      let elements = this[inputText]
        .split(this[elementOptions].delimiter)
        .map(word => {
          const wordTextNode = document.createTextNode(word);
          const options = this[elementOptions];
          const element = document.createElement(options.elementType.toUpperCase());

          if (options.elementClasses.length > 0) {
            element.className = this[combineClasses](options.elementClasses);
          }

          if (options.setIDs === true) element.id = this[getRandomID]();

          element.appendChild(wordTextNode);
          return element;
        });
      
      if (this[elementOptions].group.elementsPerGroup > 1){
       elements = this[getDOMElementGroups](elements);
      }

      return elements;
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

    [makeGroups]([...elements], elementsPerGroup) {
      const numberOfGroups = Math.ceil(elements.length / elementsPerGroup);

      const groups = elements.reduce((acc, cur, index) => {
        const groupIndex = Math.floor(index / elementsPerGroup);
        acc[groupIndex].push(cur);
        return acc;
      }, Array.from({length: numberOfGroups}, () => []));

      return groups;
    }

    [combineClasses](...classes) {
      return classes.join(' ').replace(/[,]/g," ").trim();
    }

    [getDOMElementGroups]([...elements]) {
      const grouping = this[elementOptions].group;
      let groups = this[makeGroups](elements, grouping.elementsPerGroup);
      const elementClasses = this[elementOptions].elementClasses;
      const groupClasses = grouping.groupClasses;
      const groupElementClasses = grouping.groupElementClasses;

      groups = groups.map(group => {
        const groupElement = document.createElement(grouping.groupContainer);

        // If the group container has classes
        if (groupClasses.length > 0) {
          groupElement.className = this[combineClasses](elementClasses, groupClasses);
        }

        group.forEach((element, index) => {
          // If group elements have classes
          if (groupElementClasses.length > 0) {
            if (groupElementClasses instanceof Array && groupElementClasses[index]) {
              element.className = this[combineClasses](elementClasses, groupElementClasses[index]);
            }
            else if (groupElementClasses instanceof String || typeof(groupElementClasses) === "string") {
              element.className = this[combineClasses](elementClasses, groupElementClasses);
            }
          }

          // Add elements to the group container
          groupElement.appendChild(element);
        });

        return groupElement;
      });
      
      return groups;
    }
  }
})();