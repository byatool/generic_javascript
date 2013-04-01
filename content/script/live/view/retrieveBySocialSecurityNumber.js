goog.require('goog.array');
goog.require('goog.dom');
goog.require('src.site.validation.validateSocialSecurityNumber');


goog.provide('src.site.view.retrieveBySocialSecurityNumber');


/**
 @const
 @type {string}
 @export
 */
src.site.view.retrieveBySocialSecurityNumber.MessageBoxName = 'retrieveBySocialSecurityNumberMessageBox';


/**
 @const
 @type {string}
 @export
 */
src.site.view.retrieveBySocialSecurityNumber.SocialSecurityNumberProperty = 'SocialSecurityNumber';


/**
 @param {Object} values The values needed to be validated.
 @param {function(string) : boolean} validateSocialSecurityNumber The method to use when validating a social
 security number.
 @return {Array.<string>} An array of error messages if there are any.
 @export
 */
src.site.view.retrieveBySocialSecurityNumber.validate = function(values, validateSocialSecurityNumber) {
  var Current = src.site.view.retrieveBySocialSecurityNumber;
  var result = [];

  //BAD This is duplicated in addEmployee.js.  Need to refactor out.
  var retrieveTheActualValue = function(toCheck, itemName) {
    return toCheck.get(itemName) ? toCheck.get(itemName)[0] : null;
  };

  validateSocialSecurityNumber = validateSocialSecurityNumber ?
    validateSocialSecurityNumber :
    src.site.validation.validateSocialSecurityNumber.isValid;

  if (!validateSocialSecurityNumber(retrieveTheActualValue(values, Current.SocialSecurityNumberProperty))) {
    goog.array.insert(result, 'Social Security Number is not valid.');
  }

  return result;
};
