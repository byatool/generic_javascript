goog.require('goog.string');
goog.require('src.base.control.feedback');

goog.provide('src.test.control.feedback.whenInitializingAFeedback');

/**
 @export
 */
src.test.control.feedback.whenInitializingAFeedback.describe = function () {

  //Using

  var Current_ = src.base.control.feedback;
  var Constant_ = src.base.control.feedback.constant;
  
  //Fields
  
  var ParentContainerId_ = goog.string.getRandomString();
  var ParentContainerClass_ = goog.string.getRandomString();
  
  var createADiv_;
  var options_;
  var parentContainer_;
  
  
  //Test Hooks

  beforeEach(function() {
    parentContainer_ = {};
    
    options_ = {};
    options_[Constant_.ContainerClass] = ParentContainerClass_;
    options_[Constant_.ContainerId] = ParentContainerId_;
  });
  
  
  //Support Methods
  var callTheMethod_ = function() {
    return Current_.initialize(options_, createADiv_);
  };
  
  
  //Test Methods
  
  it('should create a parent container.', function() {
    var methodWasCalled = false;
    
    createADiv_ = function(attributes) {
      methodWasCalled = methodWasCalled ||
        (Constant_.ContainerId !== undefined &&
         attributes['id'] === options_[Constant_.ContainerId] &&
         Constant_.ContainerClass !== undefined &&
         attributes['class'] === options_[Constant_.ContainerClass]);
      
      return parentContainer_;
    };
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should return the parent container.', function() {
    expect(callTheMethod_()).toBe(parentContainer_);
  });
};


describe('When initializing a feedback, it', function() {
  src.test.control.feedback.whenInitializingAFeedback.describe();
});




//--namespace="src.test.control.feedback.whenInitializingAFeedback" ^
  
  
