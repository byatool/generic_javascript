goog.require('goog.string');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.login');
goog.require('src.base.control.login.constant');


goog.provide('src.test.control.login.whenInitializingALogin');

/**
 @export
 */
src.test.control.login.whenInitializingALogin.describe = function () {
  
  //Using
  
  var Current_ = src.base.control.login;
  var Constant_ = src.base.control.login.constant;
  var ControlConstant_ = src.base.control.controlConstant;
  
  //Fields
  
  var ParentContainerId_ = goog.string.getRandomString();
  var ParentContainerClass_ = goog.string.getRandomString();
  var PostTo_ = goog.string.getRandomString();
  
  var appendChild_;
  var createADiv_;
  var createTheFormDetails_;
  var initializeFormBuilder_;
  var parentContainer_;
  var postSubmit_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    parentContainer_ = {};
    
    appendChild_ = function() {};
    createADiv_ = function() { return parentContainer_; };
    createTheFormDetails_ = function() {};
    initializeFormBuilder_ = function() {};
    postSubmit_ = function(){};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.initialize(ParentContainerId_, PostTo_, postSubmit_, createADiv_, 
                               createTheFormDetails_, initializeFormBuilder_, appendChild_);
  };
  
  
  //Test Methods
  
  it('should create a parent container.', function() {
    var methodWasCalled = false;
    
    createADiv_ = function(attributes) {
      methodWasCalled = methodWasCalled ||
        (attributes[ControlConstant_.Id] === ParentContainerId_ &&
         attributes[ControlConstant_.Class] === ParentContainerId_);
      
      return parentContainer_;
    };
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the form.', function() {
    var methodWasCalled = false;
    var formDetails = {};
    
    createTheFormDetails_ = function(){
      return formDetails;
    };
    
    initializeFormBuilder_ = function(id, url, rules, postSubmit){
      methodWasCalled = id === Constant_.IdForm !== undefined &&
        id === Constant_.IdForm &&
        url === PostTo_ &&
        rules === formDetails &&
        postSubmit === postSubmit_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should append the form to the parent container.', function() {
    var methodWasCalled = false;
    var theForm = {};
    
    initializeFormBuilder_ = function(){
      return theForm;
    };
    
    appendChild_ = function(parent, child){
      methodWasCalled = methodWasCalled || 
        (parent === parentContainer_ && child === theForm);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  it('should return the parent container.', function() {
    expect(callTheMethod_()).toBe(parentContainer_);
  });
};


describe('When initializing an login, it', function() {
  src.test.control.login.whenInitializingALogin.describe();
});


//--namespace="src.test.control.login.whenInitializingALogin" ^
