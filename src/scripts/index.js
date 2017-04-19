import './gameEngine';
import './renderer';

window.createEl = document.createElement.bind(document);
window.getEl = document.querySelector.bind(document);
window.getEls = document.querySelectorAll.bind(document);
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