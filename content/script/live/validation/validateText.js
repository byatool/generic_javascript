goog.require('goog.string');

goog.provide('src.site.validation.validateText');


/**
 @param {string} text This is the text to check.
 @return {boolean} True if the text is empty, otherwise false.
 @export
 */
src.site.validation.validateText.isEmpty = function(text) {
    return goog.string.isEmptySafe(text);
};


/**
 @param {string} text This is the text to check.
 @param {string} defaultValue The value of a junk first item for a select.
 @return {boolean} True if the text is bad, otherwise false.
 @export
 */
src.site.validation.validateText.isEmptyOrIsDefault = function(text, defaultValue) {
    return goog.string.isEmptySafe(text) || defaultValue === text;
};

