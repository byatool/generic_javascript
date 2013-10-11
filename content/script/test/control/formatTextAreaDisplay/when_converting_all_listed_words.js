
goog.require('goog.string');
goog.require('src.base.control.formatTextAreaDisplay.utility');
goog.require('src.base.control.formatTextAreaDisplay.constant');
goog.require('src.base.helper.googleWrapper');

goog.provide('src.test.control.formatTextAreaDisplay.whenConvertingAllListedWords');

/**
 @export
 */
src.test.control.formatTextAreaDisplay.whenConvertingAllListedWords.describe = function () {
  
  //Using
  
  var Constant_ = src.base.control.formatTextAreaDisplay.constant;
  var Current_ = src.base.control.formatTextAreaDisplay.utility;
  var GoogleWrapper_ = src.base.helper.googleWrapper;
  
  //Fields
  
  var Color_ = goog.string.getRandomString();
  var Text_ = goog.string.getRandomString();;
  
  var forEach_;
  var surroundWithColor_;
  var wordList_;
  
  //Test Hooks
  
  beforeEach(function() {
    
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.convertAllListedWords(Text_, wordList_, Color_, forEach_, surroundWithColor_);
  };
  
  //Test Methods
  
  
  
  it('should convert all operators.', function() {
    var functionCalls = 0;
    var item = {};
    
    surroundWithColor_ = function(text, word, color, toRegex, replace) {
      functionCalls += text === Text_ &&
        word === item &&
        color === Color_ &&
        toRegex === GoogleWrapper_.toRegex &&
        replace === GoogleWrapper_.replace;
    };
    
    forEach_ = function(items, toDo){
      functionCalls += items === wordList_;
      
      toDo(item);
    };
    
    
    callTheMethod_();
    
    expect(functionCalls).toBe(2);
  });


  
  it('should return the finished text.', function() {
    var endText = 'dsadsaf';
    
    forEach_ = function(items, toDo){
      toDo();
    };
    surroundWithColor_ = function() { return endText; };
    
    
    expect(callTheMethod_()).toBe(endText);
  });
  
};

describe('When long, it', function() {
  src.test.control.formatTextAreaDisplay.whenConvertingAllListedWords.describe();
});


//--namespace="src.test.control.formatTextAreaDisplay.whenConvertingAllListedWords" ^
