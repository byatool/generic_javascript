goog.require('goog.string');
goog.require('src.base.control.editableDiv');
goog.require('src.base.control.editableDiv.constant');

goog.provide('src.test.control.editableDiv.whenCreatingTheTextContainerClick');

/**
 @export
 */
src.test.control.editableDiv.whenCreatingTheTextContainerClick.describe = function () {
  
  //Using
  
  var Constant_ = src.base.control.editableDiv.constant;
  var Current_ = src.base.control.editableDiv;
  
  
  //Fields
  
  var editContainer_;
  var showElement_;
  var textContainer_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    editContainer_ = {};
    textContainer_ = {};

    editContainer_ = function() {};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    //Note: This is actually calling two methods.  The first is the method to create the
    //  click handler, the second is the actual click handling method.
    return Current_.createTheTextContainerClick(textContainer_, editContainer_, showElement_)();
  };
  
  //Test Methods
  
  it('should set the text container visibilty.', function() {
    var methodWasCalled = false;
    
    showElement_ = function(element, show){
      methodWasCalled = methodWasCalled ||
        (element === textContainer_ &&
         show === false);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should set the edit text area visibilty.', function() {
    var methodWasCalled = false;
    
    showElement_ = function(element, show){
      methodWasCalled = methodWasCalled ||
        (element === editContainer_ &&
         show === true);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  
  
};

describe('When long, it', function() {
  src.test.control.editableDiv.whenCreatingTheTextContainerClick.describe();
});


//--namespace="src.test.control.editableDiv.whenCreatingTheTextContainerClick" ^
