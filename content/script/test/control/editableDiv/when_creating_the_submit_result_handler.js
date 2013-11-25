goog.require('goog.string');
goog.require('src.base.control.editableDiv');
goog.require('src.base.control.editableDiv.constant');

goog.provide('src.test.control.editableDiv.whenCreatingTheSubmitResultHandler');

/**
 @export
 */
src.test.control.editableDiv.whenCreatingTheSubmitResultHandler.describe = function () {
  
  //Using
  
  var Constant_ = src.base.control.editableDiv.constant;
  var Current_ = src.base.control.editableDiv;
  
  
  //Fields
  
  var form_;
  var textContainer_;
  var applyTheEdittedText_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    form_ = {};
    textContainer_ = {};
    applyTheEdittedText_ = function() {};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.createTheSubmitResultHandler(form_, textContainer_, applyTheEdittedText_)();
  };
  
  
  //Test Methods
  
  
  it('should apply the eddited text.', function() {
    var methodWasCalled = false;
    
    applyTheEdittedText_ = function(form, textContainer, getElementByClass, getValue, htmlEscape, setTextContent){
      methodWasCalled = form === form_ &&
        textContainer === textContainer_ &&
        getElementByClass === goog.dom.getElementByClass &&
        getValue === goog.dom.forms.getValue &&
        htmlEscape === goog.string.htmlEscape &&
        setTextContent === goog.dom.setTextContent;
    };
     
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  
};

describe('When creating the submit result handler, it', function() {
  src.test.control.editableDiv.whenCreatingTheSubmitResultHandler.describe();
});


//--namespace="src.test.control.editableDiv.whenCreatingTheSubmitResultHandler" ^
