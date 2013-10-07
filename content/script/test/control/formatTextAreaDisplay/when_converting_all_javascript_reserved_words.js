goog.require('goog.string');
goog.require('src.base.control.formatTextAreaDisplay.javascript');
goog.require('src.base.control.formatTextAreaDisplay.constant');
goog.require('src.base.helper.domCreation');

goog.provide('src.test.control.formatTextAreaDisplay.whenConvertingAllJavascriptReservedWords');

/**
 @export
 */
src.test.control.formatTextAreaDisplay.whenConvertingAllJavascriptReservedWords.describe = function () {
  
  //Using
  
  var Constant_ = src.base.control.formatTextAreaDisplay.constant;
  var Current_ = src.base.control.formatTextAreaDisplay.javascript;
  var DomCreation_ = src.base.helper.domCreation;
  var GoogleWrapper_ = src.base.helper.googleWrapper;

  
  //Fields
  
  var Text_ = goog.string.getRandomString();;
  
  var surroundWithColor_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    
    
    surroundWithColor_ = function(){};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.convertAllReservedWords(Text_, surroundWithColor_);
  };
  
  
  //Test Methods
  
  it('should replace any else with a color span.', function() {
    var methodWasCalled = false;
    
    surroundWithColor_ = function(text, name, color, replace) {
      methodWasCalled = methodWasCalled ||
        (Constant_.ReservedWordElse !== undefined &&
         Constant_.ColorReservedWords !== undefined &&
         text === Text_ &&
         name === Constant_.ReservedWordElse &&
         color === Constant_.ColorReservedWords,
         replace === GoogleWrapper_.replace);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should replace any equals with a color span.', function() {
    var methodWasCalled = false;
    
     
    surroundWithColor_ = function(text, name, color, replace) {
      methodWasCalled = methodWasCalled ||
        (Constant_.ReservedWordEquals !== undefined &&
         Constant_.ColorReservedWords !== undefined &&
         name === Constant_.ReservedWordEquals &&
         color === Constant_.ColorReservedWords &&
         replace === GoogleWrapper_.replace);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should replace any for with a color span.', function() {
    var methodWasCalled = false;
    
    surroundWithColor_ = function(text, name, color, replace) {
      methodWasCalled = methodWasCalled ||
        (Constant_.ReservedWordFor !== undefined &&
         Constant_.ColorReservedWords !== undefined &&
         name === Constant_.ReservedWordFor &&
         color === Constant_.ColorReservedWords &&
         replace === GoogleWrapper_.replace);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should replace any function with a color span.', function() {
    var methodWasCalled = false;
    
    surroundWithColor_ = function(text, name, color, replace) {
      methodWasCalled = methodWasCalled ||
        (Constant_.ReservedWordFunction !== undefined &&
         Constant_.ColorReservedWords !== undefined &&
         name === Constant_.ReservedWordFunction &&
         color === Constant_.ColorReservedWords &&
         replace === GoogleWrapper_.replace);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should replace any if with a color span.', function() {
    var methodWasCalled = false;
  
    surroundWithColor_ = function(text, name, color, replace) {
      methodWasCalled = methodWasCalled ||
        (Constant_.ReservedWordIf !== undefined &&
         Constant_.ColorReservedWords !== undefined &&
         name === Constant_.ReservedWordIf &&
         color === Constant_.ColorReservedWords &&
         replace === GoogleWrapper_.replace);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should replace any return with a color span.', function() {
    var methodWasCalled = false;
    
    surroundWithColor_ = function(text, name, color, replace) {
      methodWasCalled = methodWasCalled ||
        (Constant_.ReservedWordReturn !== undefined &&
         Constant_.ColorReservedWords !== undefined &&
         name === Constant_.ReservedWordReturn &&
         color === Constant_.ColorReservedWords &&
         replace === GoogleWrapper_.replace);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should replace any var with a color span.', function() {
    var methodWasCalled = false;
    
    surroundWithColor_ = function(text, name, color, replace) {
      methodWasCalled = methodWasCalled ||
        (Constant_.ReservedWordVar !== undefined &&
         Constant_.ColorReservedWords !== undefined &&
         name === Constant_.ReservedWordVar &&
         color === Constant_.ColorReservedWords &&
         replace === GoogleWrapper_.replace);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should return the finished text.', function() {
    var endText = 'dsadsaf';
    surroundWithColor_ = function() { return endText; };
    
    
    expect(callTheMethod_()).toBe(endText);
  });
  
};
describe('When converting all javascript reserved words, it', function() {
  src.test.control.formatTextAreaDisplay.whenConvertingAllJavascriptReservedWords.describe();
});



