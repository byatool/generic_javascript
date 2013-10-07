goog.require('goog.string');
goog.require('src.base.control.formatTextAreaDisplay.javascript');
goog.require('src.base.control.formatTextAreaDisplay.constant');
goog.require('src.base.helper.domCreation');

goog.provide('src.test.control.formatTextAreaDisplay.whenConvertingAllJavascriptEqualityOperators');

/**
 @export
 */
src.test.control.formatTextAreaDisplay.whenConvertingAllJavascriptEqualityOperators.describe = function () {
  
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
    return Current_.convertAllEqualityOperators(Text_, surroundWithColor_);
  };
  
  
  //Test Methods
  
  it('should replace any === with a color span.', function() {
    var methodWasCalled = false;
    
    surroundWithColor_ = function(text, name, color, replace) {
      methodWasCalled = methodWasCalled ||
        (Constant_.EqualityOperatorEqualsEquals !== undefined &&
         Constant_.ColorEqualityOperators !== undefined &&
         text === Text_ &&
         name === Constant_.EqualityOperatorEqualsEquals &&
         color === Constant_.ColorEqualityOperators &&
         replace === GoogleWrapper_.replace);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should replace any !== with a color span.', function() {
    var methodWasCalled = false;
    
    surroundWithColor_ = function(text, name, color, replace) {
      methodWasCalled = methodWasCalled ||
        (Constant_.EqualityOperatorNotEqual !== undefined &&
         Constant_.ColorEqualityOperators !== undefined &&
         name === Constant_.EqualityOperatorNotEqual &&
         color === Constant_.ColorEqualityOperators &&
         replace === GoogleWrapper_.replace);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should replace any greater than with a color span.', function() {
    var methodWasCalled = false;
  
    surroundWithColor_ = function(text, name, color, replace) {
      methodWasCalled = methodWasCalled ||
        (Constant_.EqualityOperatorGreaterThan !== undefined &&
         Constant_.ColorEqualityOperators !== undefined &&
         name === Constant_.EqualityOperatorGreaterThan &&
         color === Constant_.ColorEqualityOperators &&
         replace === GoogleWrapper_.replace);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should replace any greater or equal to with a color span.', function() {
    var methodWasCalled = false;
    
    surroundWithColor_ = function(text, name, color, replace) {
      methodWasCalled = methodWasCalled ||
        (Constant_.EqualityOperatorGreaterOrEqualTo !== undefined &&
         Constant_.ColorEqualityOperators !== undefined &&
         name === Constant_.EqualityOperatorGreaterOrEqualTo &&
         color === Constant_.ColorEqualityOperators &&
         replace === GoogleWrapper_.replace);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should replace any less than with a color span.', function() {
    var methodWasCalled = false;
    
    surroundWithColor_ = function(text, name, color, replace) {
      methodWasCalled = methodWasCalled ||
        (Constant_.EqualityOperatorLessThan !== undefined &&
         Constant_.ColorEqualityOperators !== undefined &&
         name === Constant_.EqualityOperatorLessThan &&
         color === Constant_.ColorEqualityOperators &&
         replace === GoogleWrapper_.replace);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should replace any less than or equal to with a color span.', function() {
    var methodWasCalled = false;
    
    surroundWithColor_ = function(text, name, color, replace) {
      methodWasCalled = methodWasCalled ||
        (Constant_.EqualityOperatorLessOrEqualTo !== undefined &&
         Constant_.ColorEqualityOperators !== undefined &&
         name === Constant_.EqualityOperatorLessOrEqualTo &&
         color === Constant_.ColorEqualityOperators &&
         replace === GoogleWrapper_.replace);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should replace any false with a color span.', function() {
    var methodWasCalled = false;
    
    surroundWithColor_ = function(text, name, color, replace) {
      methodWasCalled = methodWasCalled ||
        (Constant_.EqualityOperatorFalse !== undefined &&
         Constant_.ColorEqualityOperators !== undefined &&
         name === Constant_.EqualityOperatorFalse &&
         color === Constant_.ColorEqualityOperators &&
         replace === GoogleWrapper_.replace);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should replace any true with a color span.', function() {
    var methodWasCalled = false;
    
    surroundWithColor_ = function(text, name, color, replace) {
      methodWasCalled = methodWasCalled ||
        (Constant_.EqualityOperatorTrue !== undefined &&
         Constant_.ColorEqualityOperators !== undefined &&
         name === Constant_.EqualityOperatorTrue &&
         color === Constant_.ColorEqualityOperators &&
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
describe('When converting all javascript equality operators, it', function() {
  src.test.control.formatTextAreaDisplay.whenConvertingAllJavascriptEqualityOperators.describe();
});



