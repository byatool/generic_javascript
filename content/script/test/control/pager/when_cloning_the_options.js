goog.require('src.base.control.pager');
goog.provide('src.test.control.pager.whenCloningTheOptions');

/**
 @export
 */
src.test.control.pager.whenCloningTheOptions.describe = function () {
  
  //Using
  var Current_ = src.base.control.pager;
  
  
  //Fields
  
  var NewPageNumber_ = -12;
  var OldPageNumber_ = -13;
  
  var clone_;
  var clonedOptions_;
  var options_;
  var oldParameters_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    options_ = {};
    oldParameters_ = {};
    options_[Current_.Parameters] = oldParameters_;
    options_[Current_.Parameters][Current_.ParametersPage] = OldPageNumber_;
    
    clonedOptions_ = {};
    clone_ = function(){ return clonedOptions_;};
    
  });
  
  //Support Methods
  var callTheMethod_ = function() {
    return Current_.cloneOptions(options_, NewPageNumber_, clone_); 
  };
  
  
  //Test Methods
  
  it('should create the new options.', function() {
    expect(callTheMethod_()).toNotBe(options_);
  });
  
  
  it('should clone the options', function() {
    var methodWasCalled = false;
    
    clone_ = function(options){
      methodWasCalled = methodWasCalled ||
        options === options_;
      
      return clonedOptions_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should clone the parameters on the options.', function() {
    var methodWasCalled = false;
    
    clone_ = function(optionParameters){
      methodWasCalled = methodWasCalled ||
        optionParameters === oldParameters_;
      
      return {};
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  
  it('should set the page parameter.', function() {
     
    clone_ = function(toClone){
      return toClone === options_ ?
        clonedOptions_ :
        oldParameters_;
    };
    
    var newOptions = callTheMethod_();
    
    expect(newOptions[Current_.Parameters][Current_.ParametersPage]).toBe(NewPageNumber_);
  });
};


describe('When cloning the options, it', function() {
  
  src.test.control.pager.whenCloningTheOptions.describe();
  
});
