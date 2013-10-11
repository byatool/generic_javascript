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
  
  
  //Fields
  
  
  //Test Hooks
  //src.base.control.formatTextAreaDisplay.javascript.reservedWords
  
  beforeEach(function() {
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
  };
  
  
  //Test Methods
  it('should search for else.', function() {
    var exists = Constant_.ReservedWordElse !== undefined &&
          goog.array.contains(Current_.reservedWords, Constant_.ReservedWordElse);
    
    expect(exists).toBe(true);
  });


  it('should search for =.', function() {
    var exists = Constant_.ReservedWordEquals !== undefined &&
          goog.array.contains(Current_.reservedWords, Constant_.ReservedWordEquals);
    
    expect(exists).toBe(true);
  });
  
  
  it('should search for for.', function() {
    var exists = Constant_.ReservedWordFor !== undefined &&
          goog.array.contains(Current_.reservedWords, Constant_.ReservedWordFor);
    
    expect(exists).toBe(true);
  });
  
  
  it('should search for function.', function() {
    var exists = Constant_.ReservedWordFunction !== undefined &&
          goog.array.contains(Current_.reservedWords, Constant_.ReservedWordFunction);
    
    expect(exists).toBe(true);
  });
  
  
  it('should search for if.', function() {
    var exists = Constant_.ReservedWordIf !== undefined &&
          goog.array.contains(Current_.reservedWords, Constant_.ReservedWordIf);
    
    expect(exists).toBe(true);
  });
  
  
  it('should search for return.', function() {
    var exists = Constant_.ReservedWordReturn !== undefined &&
          goog.array.contains(Current_.reservedWords, Constant_.ReservedWordReturn);
    
    expect(exists).toBe(true);
  });
  
  
  it('should search for var.', function() {
    var exists = Constant_.ReservedWordVar !== undefined &&
          goog.array.contains(Current_.reservedWords, Constant_.ReservedWordVar);
    
    expect(exists).toBe(true);
  });


  it('should search for null.', function() {
    var exists = Constant_.ReservedWordNull !== undefined &&
          goog.array.contains(Current_.reservedWords, Constant_.ReservedWordNull);
    
    expect(exists).toBe(true);
  });
  
};
describe('When converting all javascript reserved words, it', function() {
  src.test.control.formatTextAreaDisplay.whenConvertingAllJavascriptReservedWords.describe();
});



