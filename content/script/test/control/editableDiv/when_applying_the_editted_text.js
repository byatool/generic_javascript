
goog.require('goog.string');
goog.require('src.base.control.editableDiv');
goog.require('src.base.control.editableDiv.constant');

goog.provide('src.test.control.editableDiv.whenApplyingTheEdittedText');

/**
 @export
 */
src.test.control.editableDiv.whenApplyingTheEdittedText.describe = function () {
  
  //Using
  
  var Constant_ = src.base.control.editableDiv.constant;
  var Current_ = src.base.control.editableDiv;
  
  
  //Fields
  
  var getElementByClass_;
  var getValue_;
  var htmlEscape_;
  var parentForm_; 
  var setTextContent_; 
  var textContainer_; 
  
  
  //Test Hooks
  
  beforeEach(function() {
    textContainer_= {}; 
    parentForm_ = {};
    
    getElementByClass_ = function() {};
    getValue_ = function() {};
    htmlEscape_ = function(){};
    setTextContent_ = function() {};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.applyTheEdittedText(parentForm_, textContainer_, getElementByClass_,
                                        getValue_, htmlEscape_, setTextContent_);
  };
  
  
  //Test Methods
  
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
  
  
  it('should retrieve the value of the edit text area.', function() {
    var methodWasCalled = false;
    var editTextArea = {};
    
    getElementByClass_ = function(){
      return editTextArea;
    };
    
    getValue_ = function(element){
      methodWasCalled = element === editTextArea;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
   
  
  it('should escape the html.', function() {
    var methodWasCalled = false;
    var foundText = 'adfa';
    
    getValue_ = function(){
      return foundText;
    };
    
    htmlEscape_ = function(text){
      methodWasCalled = text === foundText;
    };
     
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should set the inner text of the text container.', function() {
    var methodWasCalled = false;
    var foundText = 'adfa';
    
    htmlEscape_ = function(){
      return foundText;
    };
    
    setTextContent_ = function(element, text){
      methodWasCalled = element === textContainer_ &&
        text === foundText;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
};

describe('When applying the editted text, it', function() {
  src.test.control.editableDiv.whenApplyingTheEdittedText.describe();
});


//--namespace="src.test.control.editableDiv.whenApplyingTheEdittedText" ^
