import './gameEngine';
import './startButton';
import './renderer';

window.createEl = document.createElement.bind(document);
window.getEl = document.querySelector.bind(document);
window.getEls = document.querySelectorAll.bind(document);
window.getElsByClass = document.getElementsByClassName.bind(document);
window.makeEl = function(options) {
  const {elName, className, attr} = options;

  if (!elName) {
      console.error('You have to provide which element to create!');
  }

  const newEl = createEl(elName);

  if (className) {
      newEl.addClass(className);
  }
  if (attr) {
      newEl.attr(attr.name, attr.value);
  }

  return newEl;
};
Element.prototype.addClass = function(className) {
    this.classList.add(className);
    return this;
};
Element.prototype.removeClass = function(className) {
    this.classList.remove(className);
    return this;
};
Element.prototype.toggleClass = function(className) {
    this.classList.toggle(className);
    return this;
};
Element.prototype.containsClass = function(className) {
    return this.classList.contains(className);
};
Element.prototype.attr = function(which, value) {
    if (which && value) {
        this.setAttribute(which, value);
        return this;
    } else if (which && !value) {
        return this.getAttribute(which);
    } else {
        throw new Error('No arguments provided to `attr` method!');
    }
};
Element.prototype.constainsClass = function(which, value) {
    if (which && value) {
        this.setAttribute(which, value);
        return this;
    } else if (which && !value) {
        return this.getAttribute(which);
    } else {
        throw new Error('No arguments provided to `attr` method!');
    }
};
HTMLCollection.prototype.forEach = function(fn) {
    for (let i = 0; i < this.length; i++) {
        fn(this[i]);
    }
};
HTMLCollection.prototype.every = function(predictableFn) {
    const boolsArray = [];

    for (let i = 0; i < this.length; i++) {
        boolsArray.push(predictableFn(this[i]));
    }

    return !boolsArray.includes(false);
};
Date.prototype.diff = function(toCompareDate) {
    return this.getTime() - toCompareDate.getTime();
}