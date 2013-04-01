goog.require('goog.array');
goog.require('goog.string');
goog.require('src.site.validation.validateSocialSecurityNumber');
goog.require('src.site.validation.validateText');
goog.require('src.site.view.addEmployee');

goog.provide('src.test.view.addEmployee.whenValidatingTheAddEmployeeValues');

/**
 @export
 */
src.test.view.addEmployee.whenValidatingTheAddEmployeeValues.describe = function() {

  //Fields
  var AddEmployee = src.site.view.addEmployee;
  var ContributionStartDate = '11/11/11';
  var DateOfBirth = '11/11/11';
  var EmployerSpecificEmployeeId = goog.string.getRandomString();
  var FirstName = goog.string.getRandomString();
  var HiredDate = '11/11/11';
  var LastName = goog.string.getRandomString();
  var SocialSecurityNumber = '111-22-3333';

  var _values;
  var _validateSocialSecurityNumber;
  var _validateText;

  //Test Hooks
  beforeEach(function() {
    _values = {};

    _values.get = function(property) {

      switch (property)
      {
      case AddEmployee.FirstNameProperty:
        return [FirstName];
        break;
      case AddEmployee.LastNameProperty:
        return [LastName];
        break;
      case AddEmployee.SocialSecurityNumberProperty:
        return [SocialSecurityNumber];
        break;
      case AddEmployee.DateOfBirthProperty:
        return [DateOfBirth];
        break;
      case AddEmployee.HiredDateProperty:
        return [HiredDate];
        break;
      case AddEmployee.ContributionStartDateProperty:
        return [ContributionStartDate];
        break;
      case AddEmployee.EmployerSpecificEmployeeIdProperty:
        return [EmployerSpecificEmployeeId];
        break;
      }
      
      return null;
    };
    
    _validateText = function() {};
    _validateSocialSecurityNumber = function() {};
  });

  //Support Methods

  var callTheMethod = function() {
    return AddEmployee.validate(_values, _validateText, _validateSocialSecurityNumber);
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
  it('should validate the first name.', function() {
    expect(wasCalled(FirstName, AddEmployee.FirstNameLabel)).toBe(true);
  });


  it('should validate the last name.', function() {
    expect(wasCalled(LastName, AddEmployee.LastNameLabel)).toBe(true);
  });


  it('should validate the social security number.', function() {
    var methodWasCalled = false;

    _validateSocialSecurityNumber = function(text) {
      methodWasCalled = text === SocialSecurityNumber;
    };

    callTheMethod();

    expect(methodWasCalled).toBe(true);
  });


  it('should validate the date of birth.', function() {
    expect(wasCalled(DateOfBirth, AddEmployee.DateOfBirthLabel)).toBe(true);
  });


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

    _validateSocialSecurityNumber = function() {
      return false;
    };

    var errors = callTheMethod();

    expect(errors.length).toBe(7);
  });


  it('should return only a list of strings.', function() {
    _validateText = function() {
      return null;
    };

    _validateSocialSecurityNumber = function() {
      return 'adadfs';
    };

    var result = goog.array.every(callTheMethod(), function(item) {
      return !goog.string.isEmptySafe(item);
    });

    expect(result).toBe(true);
  });



  //date of birth
  //hired date
  //contribution start date
  //employer specific employee id
};

describe('When validating the add employee values, it', function() {
  src.test.view.addEmployee.whenValidatingTheAddEmployeeValues.describe();
});
