
goog.require('goog.string');
goog.require('src.base.control.prettyCodeCreator');
goog.require('src.base.control.prettyCodeCreator.constant');

goog.provide('src.test.control.prettyCodeCreator.whenFormattingTheRawTextAndUpdatingThePrettyCodeArea');

/**
 @export
 */
src.test.control.prettyCodeCreator.whenFormattingTheRawTextAndUpdatingThePrettyCodeArea.describe = function () {
  
  //Using
  
  var Constant_ = src.base.control.prettyCodeCreator.constant;
  var ControlConstant_ = src.base.control.controlConstant;
  var Current_ = src.base.control.prettyCodeCreator;
  
  
  //Fields
  
  var container_;
  var getElementByClass_;
  var getValue_;
  var formatCode_;
  var prettyCodeArea_;
  var rawCodeArea_;
  var setInnerHtml_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    container_ = {};
    
    formatCode_ = function() {};
    getElementByClass_ = function() {};
    
    prettyCodeArea_ = {};
    rawCodeArea_ = {};
    
    getElementByClass_ = function(attributes){
      switch(attributes[ControlConstant_.Class) {
      case Constant_.RawCodeArea:
        return rawCodeArea_;
        break;
      case Constant_.PrettyCodeArea:
        return prettyCodeArea_;
        break;
      default:
        return rawCodeArea_;                      
      }};
    
    getValue_ = function() {};
    setInnerHtml_ = function() {};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.formatAndFocus(container_, getElementByClass_, getValue_,
                                   formatCode_, setInnerHtml_);
  };
  
  
  //Test Methods
  
  it('should find the raw code area.', function() {
    var methodWasCalled = false;
    
    getElementByClass_ = function(cssClass, element) {
      methodWasCalled = methodWasCalled ||
        (cssClass === Constant_.RawCodeArea &&
         element === container_);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should get the value of the raw code area.', function() {
    var methodWasCalled = false;
    
    getValue_ = function(element) {
      methodWasCalled = rawCodeArea_ === element;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should format the code.', function() {
    var methodWasCalled = false;
    var code = {};
    
    getValue_ = function() { return code; };
    
    formatCode_ = function(theCode){
      methodWasCalled = theCode === code;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should find the pretty text area.', function() {
    var methodWasCalled = false;
    
    getElementByClass_ = function(cssClass, element) {
      methodWasCalled = methodWasCalled ||
        (cssClass === Constant_.PrettyCodeArea &&
         element === container_);
      
      return prettyCodeArea_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should set the inner html of the pretty code area.', function() {
    var methodWasCalled = false;
    var result = {};
    
    formatCode_ = function(){
      return result;
    };
    
    setInnerHtml_ = function(element, text) {
      methodWasCalled = element === prettyCodeArea_ &&
        text === result;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
};


describe('When formatting the raw text and updating the pretty code area, it', function() {
  src.test.control.prettyCodeCreator.whenFormattingTheRawTextAndUpdatingThePrettyCodeArea.describe();
});
