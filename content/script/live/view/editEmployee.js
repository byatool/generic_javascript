goog.require('goog.array');
goog.require('src.site.validation.validateSocialSecurityNumber');
goog.require('src.site.validation.validateText');

goog.provide('src.site.view.editEmployee');

/**
 @param {Object} valuesToValidate The values needed to be validated.
 @param {function(string, string) : string} validateText The method to use when validating normal text.
 @return {Array.<string>} An array of error messages if there are any.
 @export
 */
src.site.view.editEmployee.validate = function(valuesToValidate, validateText) {
  var AddEmployee = src.site.view.addEmployee;
  var Validation = src.site.validation;

  var result = [];

  var retrieveTheActualValue = function(toCheck, itemName) {
    return toCheck.get(itemName) ? toCheck.get(itemName)[0] : null;
  };

  if (!validateText) {
    validateText = src.site.validation.validateText.isEmpty;
  }

  goog.array.insert(result, validateText(retrieveTheActualValue(valuesToValidate, AddEmployee.HiredDateProperty), AddEmployee.HiredDateLabel));
  goog.array.insert(result, validateText(retrieveTheActualValue(valuesToValidate, AddEmployee.ContributionStartDateProperty), AddEmployee.ContributionStartDateLabel));
  goog.array.insert(result, validateText(retrieveTheActualValue(valuesToValidate, AddEmployee.EmployerSpecificEmployeeIdProperty), AddEmployee.EmployerSpecificEmployeeIdLabel));


  return goog.array.filter(result, function(node) {
    return node !== null;
  });
};
