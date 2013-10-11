goog.require('goog.array');
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
  
  
  //Fields
  
  //Test Hooks
  
  beforeEach(function() {
    
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
  };
  
  
  //Test Methods
  
  
  it('should search for ===', function() {
    var exists = Constant_.EqualityOperatorEqualsEquals !== undefined &&
      goog.array.contains(Current_.operators, Constant_.EqualityOperatorEqualsEquals);
    
    expect(exists).toBe(true);
  });
  
  
  it ('should search for !==', function() {
    var exists = Constant_.EqualityOperatorNotEqual !== undefined &&
          goog.array.contains(Current_.operators, Constant_.EqualityOperatorNotEqual);
    
    expect(exists).toBe(true);
  });
  
  
  it ('should search for >', function() {
    var exists = Constant_.EqualityOperatorGreaterThan !== undefined &&
          goog.array.contains(Current_.operators, Constant_.EqualityOperatorGreaterThan);
    
    expect(exists).toBe(true);
  });
  
  
  it ('should search for >=', function() {
    var exists = Constant_.EqualityOperatorGreaterOrEqualTo !== undefined &&
          goog.array.contains(Current_.operators, Constant_.EqualityOperatorGreaterOrEqualTo);
     
    expect(exists).toBe(true);
  });
  
  
  it ('should search for <', function() {
    var exists = Constant_.EqualityOperatorLessThan !== undefined &&
          goog.array.contains(Current_.operators, Constant_.EqualityOperatorLessThan);
    
    expect(exists).toBe(true);
  });
  
  
  it ('should search for <=', function() {
    var exists = Constant_.EqualityOperatorLessOrEqualTo !== undefined &&
          goog.array.contains(Current_.operators, Constant_.EqualityOperatorLessOrEqualTo);
    
    expect(exists).toBe(true);
  });
  
  
  it ('should search for false', function() {
    var exists = Constant_.EqualityOperatorFalse !== undefined &&
          goog.array.contains(Current_.operators, Constant_.EqualityOperatorFalse);
    
    expect(exists).toBe(true);
  });
  
  
  it ('should search for true', function() {
    var exists = Constant_.EqualityOperatorTrue !== undefined &&
          goog.array.contains(Current_.operators, Constant_.EqualityOperatorTrue);
    
    expect(exists).toBe(true);
  });
  
  
  it ('should search for and', function() {
    var exists = Constant_.EqualityOperatorAnd !== undefined &&
          goog.array.contains(Current_.operators, Constant_.EqualityOperatorAnd);
    
    expect(exists).toBe(true);
  });
  
  
  it ('should search for and', function() {
    var exists = Constant_.EqualityOperatorOr !== undefined &&
          goog.array.contains(Current_.operators, Constant_.EqualityOperatorOr);
    
    expect(exists).toBe(true);
  });
  
  
  
};
describe('When converting all javascript equality operators, it', function() {
  src.test.control.formatTextAreaDisplay.whenConvertingAllJavascriptEqualityOperators.describe();
});



