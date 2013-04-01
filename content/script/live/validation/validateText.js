goog.require('goog.string');

goog.provide('src.site.validation.validateText');



/**
 @param {string} text This is the text to check.
 @param {string} conceptName This is most likely the text from a label.  For
 example: "User name", "Password"... ect.
 @return {?string} The error message if there is any.
 @export
 */
src.site.validation.validateText.isEmpty = function(text, conceptName) {
  return goog.string.isEmptySafe(text) ? conceptName + ' is required.' : null;
};

/**
 @param {string} text This is the text to check.
 @param {string} conceptName This is most likely the text from a label.  For
 example: "User name", "Password"... ect.
 @param {string} defaultValue The value of a junk first item for a select.
 @return {?string} The error message if there is any.
 @export
 */
src.site.validation.validateText.isEmptyOrIsDefault = function(text, conceptName, defaultValue) {
  return goog.string.isEmptySafe(text) || defaultValue === text ? ['Pick a ' + conceptName + '.'] : [];
};

