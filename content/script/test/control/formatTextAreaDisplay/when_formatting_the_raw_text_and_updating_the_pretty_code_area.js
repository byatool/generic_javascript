goog.require('goog.string');
goog.require('src.base.control.formatTextAreaDisplay');
goog.require('src.base.control.formatTextAreaDisplay.constant');

goog.provide('src.test.control.formatTextAreaDisplay.whenFormattingTheRawTextAndUpdatingTheFormatTextAreaDisplay');

/**
 @export
 */
src.test.control.formatTextAreaDisplay.whenFormattingTheRawTextAndUpdatingTheFormatTextAreaDisplay.describe = function () {
  
  //Using
  
  var Constant_ = src.base.control.formatTextAreaDisplay.constant;
  var ControlConstant_ = src.base.control.controlConstant;
  var Current_ = src.base.control.formatTextAreaDisplay;
  
  
  //Fields
  
  var container_;
  var getElementByClass_;
  var getValue_;
  var formatText_;
  var formattedArea_;
  var rawTextArea_;
  var setInnerHtml_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    container_ = {};
    
    formatText_ = function() {};
    getElementByClass_ = function() {};
    
    formattedArea_ = {};
    rawTextArea_ = {};
    
    getElementByClass_ = function(cssClass, element){
      switch(cssClass) {
      case Constant_.RawTextArea:
        return rawTextArea_;
        break;
      case Constant_.PrettyTextArea:
        return formattedArea_;
        break;
      default:
        return rawTextArea_;                      
      }};
    
    getValue_ = function() {};
    setInnerHtml_ = function() {};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.formatAndFocus(container_, formatText_, getElementByClass_,
                                   getValue_, setInnerHtml_)();
  };
  
  
  //Test Methods
  
  it('should find the raw text area.', function() {
    var methodWasCalled = false;
    
    getElementByClass_ = function(cssClass, element) {
      methodWasCalled = methodWasCalled ||
        (cssClass === Constant_.RawTextArea &&
         element === container_);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should get the value of the raw text area.', function() {
    var methodWasCalled = false;
    
    getValue_ = function(element) {
      methodWasCalled = rawTextArea_ === element;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should format the text.', function() {
    var methodWasCalled = false;
    var text = {};
    
    getValue_ = function() { return text; };
    
    formatText_ = function(theText){
      methodWasCalled = theText === text;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should find the pretty text area.', function() {
    var methodWasCalled = false;
    
    getElementByClass_ = function(cssClass, element) {
      methodWasCalled = methodWasCalled ||
        (cssClass === Constant_.PrettyTextArea &&
         element === container_);
      
      return formattedArea_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should set the inner html of the pretty text area.', function() {
    var methodWasCalled = false;
    var result = {};
    
    formatText_ = function(){
      return result;
    };
    
    setInnerHtml_ = function(element, text) {
      methodWasCalled = element === formattedArea_ &&
        text === result;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
};


describe('When formatting the raw text and updating the pretty text area, it', function() {
  src.test.control.formatTextAreaDisplay.whenFormattingTheRawTextAndUpdatingTheFormatTextAreaDisplay.describe();
});
