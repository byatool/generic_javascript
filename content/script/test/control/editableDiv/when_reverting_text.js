
goog.require('goog.string');
goog.require('src.base.control.editableDiv');
goog.require('src.base.control.editableDiv.constant');

goog.provide('src.test.control.editableDiv.whenRevertingText');

/**
 @export
 */
src.test.control.editableDiv.whenRevertingText.describe = function () {
  
  //Using
  
  var Constant_ = src.base.control.editableDiv.constant;
  var Current_ = src.base.control.editableDiv;
  
  
  //Fields
  
  var editTextArea_;
  var getElementByClass_;
  var getTextContent_;
  var parentForm_;
  var setValue_;
  var textContainer_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    editTextArea_ = {};
    parentForm_ = {};
    textContainer_ = {};
    
    getElementByClass_ = function(){ return editTextArea_; };
    getTextContent_ = function(){};
    setValue_ = function(){};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.revertText(parentForm_, textContainer_, getTextContent_, getElementByClass_,
                               setValue_);
  };
  
  
  //Test Methods
  
  it('should retrieve the text from the text container.', function() {
    var methodWasCalled = false;
    
    getTextContent_ = function(container){
      methodWasCalled = container === textContainer_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should find the edit text area.', function() {
    var methodWasCalled = false;
    
    getElementByClass_ = function(cssClass, parent) {
      methodWasCalled = methodWasCalled ||
        (Constant_.EditTextArea !== undefined &&
         cssClass === Constant_.EditTextArea &&
         parent === parentForm_);
    };
    
    callTheMethod_();
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should set the edit textarea value.', function() {
    var methodWasCalled = false;
    var text = 'adf';
    
    getTextContent_ = function(){
      return text;
    };
    
    setValue_ = function(element, value){
      methodWasCalled = element === editTextArea_ &&
        value === text;
    };
     
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
};


describe('When reverting text, it', function() {
  src.test.control.editableDiv.whenRevertingText.describe();
});


//--namespace="src.test.control.editableDiv.whenRevertingText" ^
