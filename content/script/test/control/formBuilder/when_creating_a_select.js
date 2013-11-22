goog.require('goog.string');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.formBuilder.constant');
goog.require('src.base.control.formBuilder.control');

goog.provide('src.test.control.formBuilder.control.whenCreatingAndInitializingASelect');

/**
 @export
 */
src.test.control.formBuilder.control.whenCreatingAndInitializingASelect.describe = function () {
  
  //Using
  
  var Constant_ = src.base.control.formBuilder.constant;
  var ControlConstant_ = src.base.control.controlConstant;
  var Current_ = src.base.control.formBuilder.control;
  
  
  //Fields
  
  var Class_ = goog.string.getRandomString();
  var Id_ = goog.string.getRandomString();
  
  var controlSpec_;
  var createASelect_;
  var initializeSelect_;
  var select_;
  
  //Test Hooks
  
  beforeEach(function() {
    controlSpec_ = {};
    controlSpec_[ControlConstant_.Class] = Class_;
    controlSpec_[ControlConstant_.Id] = Id_;
    select_ = {};
    
    createASelect_ = function(){ return select_; };
    initializeSelect_ = function(){ };
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.createAndInitializeASelect(controlSpec_, createASelect_, initializeSelect_);
  };
  
  //Test Methods
  
  
  it('should create the select.', function() {
    var methodWasCalled = false;
    
    createASelect_ = function(attributes, items, defaultText){
      methodWasCalled = attributes[ControlConstant_.Class] === controlSpec_[ControlConstant_.Class] &&
      attributes[ControlConstant_.Id] === controlSpec_[ControlConstant_.Id] &&
        attributes[ControlConstant_.Name] === controlSpec_[ControlConstant_.Id] &&
        items.length === 0 &&
        defaultText === '';
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should initialize the select.', function() {
    var methodWasCalled = false;
    
    controlSpec_[Constant_.DefaultValue] = {};
    controlSpec_[Constant_.Parameters] = {};
    controlSpec_[Constant_.Url] = {};
    
    initializeSelect_ = function(element, url, parameters, defaultValue){
      methodWasCalled = Constant_.Url !== undefined &&
        Constant_.Parameters !== undefined &&
        Constant_.DefaultValue !== undefined &&
        element === select_ &&
        url === controlSpec_[Constant_.Url] &&
        parameters === controlSpec_[Constant_.Parameters] &&
        defaultValue === controlSpec_[Constant_.DefaultValue];
    };
    
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });


  
  it('should return the select.', function() {
    expect(callTheMethod_()).toBe(select_);
  });
  
};

describe('When creating and initializing a select, it', function() {
  src.test.control.formBuilder.control.whenCreatingAndInitializingASelect.describe();
});


//--namespace="src.test.control.formBuilder.control.whenCreatingAndInitializingASelect" ^
