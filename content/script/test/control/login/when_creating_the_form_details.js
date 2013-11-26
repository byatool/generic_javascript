goog.require('goog.string');
goog.require('src.base.control.login');
goog.require('src.base.control.login.constant');
goog.require('src.site.validation.validationInterpreter.constant');

goog.provide('src.test.control.login.whenCreatingTheFormDetails');

/**
 @export
 */
src.test.control.login.whenCreatingTheFormDetails.describe = function () {
  
  //Using
  
  var Constant_ = src.base.control.login.constant;
  var ControlConstant_ = src.base.control.controlConstant;
  var Current_ = src.base.control.login;
  var ValidationConstant_ = src.site.validation.validationInterpreter.constant;
  
  
  //Fields
  
  
  //Test Hooks
  
  beforeEach(function() {
    
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.createTheFormDetails();
  };
  
  
  //Test Methods
  
  it('should contain a textbox for the user name.', function() {
    var methodWasCalled = false;
    
    var foundItem = 
          goog.array.find(callTheMethod_(),
                           function (item) {
                             return  (item[ControlConstant_.Type] === ControlConstant_.Text &&
                                      item[ControlConstant_.Id] === Constant_.IdUsername &&
                                      item[ControlConstant_.Class] === Constant_.ClassTextbox &&
                                      item[ControlConstant_.Label] === Constant_.LabelUsername);
                           });
    
    methodWasCalled = Constant_.LabelUsername !== undefined &&
      Constant_.IdUsername !== undefined &&
      Constant_.ClassTextbox !== undefined &&
      foundItem !== null &&
      foundItem !== undefined;
    
    
    expect(foundItem !== null && foundItem !== undefined).toBe(true);
  });
  
  
  it('should contain the validation rules for the username.', function() {
    var methodWasCalled = false;
    
    var username = goog.array.find(callTheMethod_(), function(item) {
      return item[ControlConstant_.Id] === Constant_.IdUsername;
    });
    
    methodWasCalled = Constant_.EmptyUsername !== undefined &&
      username[ValidationConstant_.Validation][0][0] === ValidationConstant_.IsNotEmpty &&
      username[ValidationConstant_.Validation][0][1] === Constant_.EmptyUsername;
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should contain a textbox for the password.', function() {
    var methodWasCalled = false;
    
    var foundItem = 
          goog.array.find(callTheMethod_(),
                          function (item) {
                            return  (item[ControlConstant_.Type] === ControlConstant_.Text &&
                                     item[ControlConstant_.Id] === Constant_.IdPassword &&
                                     item[ControlConstant_.Class] === Constant_.ClassTextbox &&
                                     item[ControlConstant_.Label] === Constant_.LabelPassword);
                          });
    
    methodWasCalled = Constant_.LabelPassword !== undefined &&
      Constant_.IdPassword !== undefined &&
      Constant_.ClassTextbox !== undefined &&
      foundItem !== null &&
      foundItem !== undefined;
    
    
    expect(foundItem !== null && foundItem !== undefined).toBe(true);
  });

  
  it('should contain the validation rules for the password.', function() {
    var methodWasCalled = false;
    
    var username = goog.array.find(callTheMethod_(), function(item) {
      return item[ControlConstant_.Id] === Constant_.IdPassword;
    });
    
    methodWasCalled = Constant_.EmptyPassword !== undefined &&
      username[ValidationConstant_.Validation][0][0] === ValidationConstant_.IsNotEmpty &&
      username[ValidationConstant_.Validation][0][1] === Constant_.EmptyPassword;
    
    expect(methodWasCalled).toBe(true);
  });
};

describe('When creating the form details, it', function() {
  src.test.control.login.whenCreatingTheFormDetails.describe();
});


//--namespace="src.test.control.login.whenCreatingTheFormDetails" ^
