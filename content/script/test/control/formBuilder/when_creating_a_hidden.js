goog.require('goog.string');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.formBuilder.constant');
goog.require('src.base.control.formBuilder.control');

goog.provide('src.test.control.formBuilder.control.whenCreatingAHidden');

/**
 @export
 */
src.test.control.formBuilder.control.whenCreatingAHidden.describe = function () {
  
  //Using
  
  var Constant_ = src.base.control.formBuilder.constant;
  var ControlConstant_ = src.base.control.controlConstant;
  var Current_ = src.base.control.formBuilder.control;
  
  
  //Fields
  
  var CssClass_ = goog.string.getRandomString();
  var Id_ = goog.string.getRandomString();
  var Value_ = goog.string.getRandomString();
  
  
  var controlSpec_;
  var createHidden_;
  var hidden_;
  var setValue_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    controlSpec_ = {};
    controlSpec_[ControlConstant_.Id] = Id_;
    controlSpec_[ControlConstant_.Class] = CssClass_;
    controlSpec_[ControlConstant_.Value] = Value_;
    hidden_ = {};
    
    createHidden_ = function(){ return hidden_; };
    setValue_ = function(){};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.createAHidden(controlSpec_, createHidden_, setValue_);
  };
  
  
  //Test Methods
   
  it('should create the hidden.', function() {
    var methodWasCalled = false;
    
    createHidden_ = function(attributes){
      methodWasCalled = attributes[ControlConstant_.Id] === Id_ &&
        attributes[ControlConstant_.Name] === Id_ &&
        attributes[ControlConstant_.Class] === CssClass_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should set the hidden value.', function() {
    var methodWasCalled = false;
    
    setValue_ = function(element, value){
      methodWasCalled = element === hidden_ &&
        value === Value_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });


  
  it('should return the hidden element.', function() {
    expect(callTheMethod_()).toBe(hidden_);
  });
  
};

describe('When creating a hidden, it', function() {
  src.test.control.formBuilder.control.whenCreatingAHidden.describe();
});



