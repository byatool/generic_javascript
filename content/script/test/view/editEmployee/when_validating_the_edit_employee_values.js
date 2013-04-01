goog.require('goog.array');
goog.require('goog.string');
goog.require('src.site.validation.validateSocialSecurityNumber');
goog.require('src.site.validation.validateText');
goog.require('src.site.view.editEmployee');

goog.provide('src.test.view.editEmployee.whenValidatingTheEditEmployeeValues');

/**
 @export
 */
src.test.view.editEmployee.whenValidatingTheEditEmployeeValues.describe = function() {
  //Fields
  var AddEmployee = src.site.view.addEmployee;
  var EditEmployee = src.site.view.editEmployee;

  var ContributionStartDate = '11/11/11';
  var EmployerSpecificEmployeeId = goog.string.getRandomString();
  var HiredDate = '11/11/11';

  var _values;

  var _validateText;

  //Test Hooks
  beforeEach(function() {
    _values = {};

    _values.get = function(property) {

      switch (property)
      {
      case AddEmployee.ContributionStartDateProperty:
        return [ContributionStartDate];
        break;
      case AddEmployee.EmployerSpecificEmployeeIdProperty:
        return [EmployerSpecificEmployeeId];
        break;
      case AddEmployee.HiredDateProperty:
        return [HiredDate];
        break;
      }

      return null;
    };

    _validateText = function() {};
  });

  //Support Methods

  var callTheMethod = function() {
    return EditEmployee.validate(_values, _validateText);
  };


  var wasCalled = function(textToValidate, label) {
    var methodWasCalled = false;

    _validateText = function(text, givenLabel) {
      methodWasCalled = methodWasCalled || (text === textToValidate && givenLabel === label);
    };

    callTheMethod();

    return methodWasCalled;
  };


  //Test Methods
  it('should validate the hired date', function() {
    expect(wasCalled(HiredDate, AddEmployee.HiredDateLabel)).toBe(true);
  });


  it('should validate the contribution start date.', function() {
    expect(wasCalled(ContributionStartDate, AddEmployee.ContributionStartDateLabel)).toBe(true);
  });


  it('should validate the employer specific employee id.', function() {
    expect(wasCalled(EmployerSpecificEmployeeId, AddEmployee.EmployerSpecificEmployeeIdLabel)).toBe(true);
  });

  it('should have the correct amount of errors.', function() {
    _validateText = function() {
      return goog.string.getRandomString();
    };

    var errors = callTheMethod();

    expect(errors.length).toBe(3);
  });


  it('should return only a list of strings.', function() {
    _validateText = function() {
      return null;
    };

    var result = goog.array.every(callTheMethod(), function(item) {
      return !goog.string.isEmptySafe(item);
    });

    expect(result).toBe(true);
  });

  //hired date
  //contribution start date
  //employer specific employee id
};

describe('When validating the edit employee values, it', function() {
  src.test.view.editEmployee.whenValidatingTheEditEmployeeValues.describe();
});

