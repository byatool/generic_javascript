goog.require('goog.string');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.formBuilder.constant');
goog.require('src.base.control.formBuilder.validation');
goog.require('src.site.validation.validationInterpreter.constant');


goog.provide('src.test.control.formBuilder.validation.whenCreatingTheValidation');

/**
 @export
 */
src.test.control.formBuilder.validation.whenCreatingTheValidation.describe = function () {

  //Using
  
  var Constant_ = src.base.control.formBuilder.constant;
  var Current_ = src.base.control.formBuilder.validation;
  
  
  //Fields
  
  
  //Test Hooks
  
  beforeEach(function() {
    
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.createValidation();
  };
  
  //Test Methods
};

describe('When creating the validation, it', function() {
  src.test.control.formBuilder.validation.whenCreatingTheValidation.describe();
});


//--namespace="src.test.control.formBuilder.validation.whenCreatingTheValidation" ^
