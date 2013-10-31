goog.require('goog.string');
goog.require('src.base.control.editableDiv');
goog.require('src.base.control.editableDiv.constant');

goog.provide('src.test.control.editableDiv.whenCreatingTheCancelHandler');

/**
 @export
 */
src.test.control.editableDiv.whenCreatingTheCancelHandler.describe = function () {
  
  //Using
  
  var Constant_ = src.base.control.editableDiv.constant;
  var Current_ = src.base.control.editableDiv;
  
  
  //Fields
  
  var form_;
  var revertText_;
  var textContainer_;
  var showElement_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    form_ = {};
    textContainer_ = {};
    
    revertText_ = function() {};
    showElement_ = function() {};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.createTheCancelHandler(form_, textContainer_, showElement_,
                                           revertText_)();
  };
  
  //Test Methods
  
  
  
  it('should hide the form', function() {
    var methodWasCalled = false;
    
    showElement_ = function(element, showIt){
      methodWasCalled = methodWasCalled ||
        (element === form_ &&
         showIt === false);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should revert the text.', function() {
    var methodWasCalled = false;
    
    revertText_ = function(parentForm, textContainer, getTextContent,
                           getElementByClass, setValue){
      methodWasCalled = parentForm === form_ &&
        textContainer === textContainer_ &&
        getTextContent === goog.dom.getTextContent &&
        getElementByClass === goog.dom.getElementByClass &&
        setValue === goog.dom.forms.setValue;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should show the text container.', function() {
    var methodWasCalled = false;
    
    showElement_ = function(element, toShow){
      methodWasCalled = methodWasCalled ||
        (element === textContainer_ &&
         toShow === true);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
};

describe('When creating the cancel handler, it', function() {
  src.test.control.editableDiv.whenCreatingTheCancelHandler.describe();
});


//
