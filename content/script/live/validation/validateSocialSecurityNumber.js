goog.require('goog.array');

goog.provide('src.site.validation.validateSocialSecurityNumber');

/**
 @param {string} currentText This is the text to check for any non numbers.
 @return {boolean} Whether the text contains any numbers..
 @private
 */
src.site.validation.validateSocialSecurityNumber.containsOnlyNumbers_ = function(currentText) {
  return !goog.array.some(currentText, function(node) {return isNaN(node); });
};

/**
 @param {string} text This is the text to check to see if it is the right
 length for a social security number.
 @return {boolean} Whether the string is 9 in length.
 @private
 */
src.site.validation.validateSocialSecurityNumber.hasAValidLength_ = function(text) {
  return text.length == 9;
};


/**
 @param {string} text The text to remove the dashes from.
 @return {string|boolean} The needed text without dashed if it is possible.
 @private
 */
src.site.validation.validateSocialSecurityNumber.isSetToAViableString_ = function(text) {
  return text ? goog.array.filter(text, function(character) {
    return character !== '-';
  }) : false;
};


/**
 @param {string} argument The text to validate.
 @return {boolean} Whether the string is a viable social security number.
 @export
 */
src.site.validation.validateSocialSecurityNumber.isValid = function(argument) {
  var plainText;

  var it = src.site.validation.validateSocialSecurityNumber;
  return (plainText = it.isSetToAViableString_(argument)) &&
    (it.containsOnlyNumbers_(plainText)) &&
    (it.hasAValidLength_(plainText));
};
