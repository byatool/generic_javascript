goog.require('goog.array');
goog.require('goog.dom.forms');
goog.require('goog.style');
goog.require('src.site.validation.validateSocialSecurityNumber');
goog.require('src.site.validation.validateText');


goog.provide('src.site.view.addEmployee');


/**
 @const
 @type {string}
 @export
 */
src.site.view.addEmployee.ContributionStartDateProperty = 'ContributionStartDate';


/**
 @const
 @type {string}
 @export
 */
src.site.view.addEmployee.ContributionStartDateLabel = 'Contribution Start Date';


/**
 @const
 @type {string}
 @export
 */
src.site.view.addEmployee.DateOfBirthProperty = 'DateOfBirth';


/**
 @const
 @type {string}
 @export
 */
src.site.view.addEmployee.DateOfBirthLabel = 'Date of Birth';


/**
 @const
 @type {string}
 @export
 */
src.site.view.addEmployee.EmployerSpecificEmployeeIdLabel = 'Employer Specific Employee Id';


/**
 @const
 @type {string}
 @export
 */
src.site.view.addEmployee.EmployerSpecificEmployeeIdProperty = 'EmployerSpecificEmployeeId';


/**
 @const
 @type {string}
 @export
 */
src.site.view.addEmployee.FirstNameLabel = 'First Name';


/**
 @const
 @type {string}
 @export
 */
src.site.view.addEmployee.FirstNameProperty = 'FirstName';


/**
 @const
 @type {string}
 @export
 */
src.site.view.addEmployee.HiredDateLabel = 'Hired Date';


/**
 @const
 @type {string}
 @export
 */
src.site.view.addEmployee.HiredDateProperty = 'HiredDate';


/**
 @const
 @type {string}
 @export
 */
src.site.view.addEmployee.LastNameLabel = 'Last Name';


/**
 @const
 @type {string}
 @export
 */
src.site.view.addEmployee.LastNameProperty = 'LastName';


/**
 @const
 @type {string}
 @export
 */
src.site.view.addEmployee.SocialSecurityNumberLabel = 'Social Security Number';


/**
 @const
 @type {string}
 @export
 */
src.site.view.addEmployee.SocialSecurityNumberProperty = 'SocialSecurityNumber';


/**
 @param {Object} valuesToValidate The values needed to be validated.
 @param {function(string, string) : string} validateText The method to use when validating normal text.
 @param {function(string) : boolean} validateSocialSecurityNumber The method to use when validating a social
 security number.
 @return {Array.<string>} An array of error messages if there are any.
 @export
 */
src.site.view.addEmployee.validate = function(valuesToValidate, validateText, validateSocialSecurityNumber) {
  var Current = src.site.view.addEmployee;
  var result = [];
  
  //BAD This is duplicated in retrieveBySocialSecurityNumber.js.  Need to refactor out.
  var retrieveTheActualValue = function(toCheck, itemName) {
    return toCheck.get(itemName) ? toCheck.get(itemName)[0] : null;
  };
  
  if (!validateText) {
    validateText = src.site.validation.validateText.isEmpty;
  }
  
  if (!validateSocialSecurityNumber) {
    validateSocialSecurityNumber = src.site.validation.validateSocialSecurityNumber.isValid;
  }
  
  goog.array.insert(result, validateText(retrieveTheActualValue(valuesToValidate, Current.FirstNameProperty), Current.FirstNameLabel));
  goog.array.insert(result, validateText(retrieveTheActualValue(valuesToValidate, Current.LastNameProperty), Current.LastNameLabel));
  goog.array.insert(result, validateText(retrieveTheActualValue(valuesToValidate, Current.DateOfBirthProperty), Current.DateOfBirthLabel));
  goog.array.insert(result, validateText(retrieveTheActualValue(valuesToValidate, Current.HiredDateProperty), Current.HiredDateLabel));
  goog.array.insert(result, validateText(retrieveTheActualValue(valuesToValidate, Current.ContributionStartDateProperty), Current.ContributionStartDateLabel));
  goog.array.insert(result, validateText(retrieveTheActualValue(valuesToValidate, Current.EmployerSpecificEmployeeIdProperty), Current.EmployerSpecificEmployeeIdLabel));
  
  if (!validateSocialSecurityNumber(retrieveTheActualValue(valuesToValidate, Current.SocialSecurityNumberProperty))) {
    goog.array.insert(result, 'Social Security Number is not valid.');
  }
  
  return goog.array.filter(result, function(node) {
    return node !== null;
  });
};
