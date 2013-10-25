goog.require('goog.string');
goog.require('src.base.control.editableDiv.constant');
goog.require('src.base.control.editableDiv.form');
goog.require('src.site.validation.validationInterpreter.constant');

goog.provide('src.test.control.editableDiv.form.whenCreatingTheValidationRules');

/**
 @export
 */
src.test.control.editableDiv.form.whenCreatingTheValidationRules.describe = function () {
  
  //Using
  
  var Constant_ = src.base.control.editableDiv.constant;
  var Current_ = src.base.control.editableDiv.form;
  var ValidationInterpreterConstant_ = src.site.validation.validationInterpreter.constant;
  
  //Fields
  
  
  //Test Hooks
  
  beforeEach(function() {
    
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.createTheValidationRules();
  };

  
  //Test Methods
  
  it('should contain a rule section for the edit text area.', function() {
    expect(callTheMethod_()[0][0]).toBe(Constant_.EditTextArea);
  });
  
  it('should contain a not empty rule for the edit text area.', function() {
    expect(callTheMethod_()[0][1][0]).toBe(ValidationInterpreterConstant_.IsNotEmpty);
  });
  
  it('should contain a not empty error for the edit text area.', function() {
    expect(callTheMethod_()[0][1][1]).toBe(Constant_.ErrorEmptyText);
  });
  
  
};

describe('When creating the validation rules, it', function() {
  src.test.control.editableDiv.form.whenCreatingTheValidationRules.describe();
});


//--namespace="src.test.control.editableDiv.form.whenCreatingTheValidationRules" ^
