
goog.require('goog.string');
goog.require('src.base.control.formBuilder');

goog.provide('src.test.control.formBuilder.whenInitializingAFormBuilder');

/**
 @export
 */
src.test.control.formBuilder.whenInitializingAFormBuilder.describe = function () {
  //Using
  var Current = src.base.control.formBuilder;
  
  
  //Fields
  var ParentContainerId_ = goog.string.getRandomString();
  
  var createADiv_;
  var options_;
  var parentContainer_;
  
  
  //Test Hooks
  beforeEach(function() {
    parentContainer_ = {};
    options_ = {};
    options_[Current.ContainerId] = ParentContainerId_;
  });
  
  
  //Support Methods
  var callTheMethod_ = function() {
    return Current.initialize(options_, createADiv_);
  };
  
  
  //Test Methods
  
  it('should create a parent container.', function() {
    var methodWasCalled = false;
    
    createADiv_ = function(attributes) {
      methodWasCalled = attributes['id'] === options_[Current.ContainerId];
      return parentContainer_;
    };
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  it('should return the parent container.', function() {
    expect(callTheMethod_()).toBe(parentContainer_);
  });
};


describe('When initializing an formBuilder, it', function() {
  src.test.control.formBuilder.whenInitializingAFormBuilder.describe();
});
