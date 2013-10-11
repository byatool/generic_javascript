goog.require('goog.array');
goog.require('goog.string');
goog.require('src.base.control.formatTextAreaDisplay.constant');
goog.require('src.base.control.formatTextAreaDisplay.javascript');
goog.require('src.base.helper.googleWrapper');

goog.provide('src.test.control.formatTextAreaDisplay.whenFormattingJavaScript');

/**
 @export
 */
src.test.control.formatTextAreaDisplay.whenFormattingJavaScript.describe = function() {
  
  //Using
  
  var Constant_ = src.base.control.formatTextAreaDisplay.constant;
  var Current_ = src.base.control.formatTextAreaDisplay.javascript;
  var GoogleWrapper_ = src.base.helper.googleWrapper;
  var Utility_ = src.base.control.formatTextAreaDisplay.utility;

  //Fields

  var AllParametersText_ = goog.string.getRandomString();
  var CleanedUpText_ = goog.string.getRandomString();
  var ReservedMethodsText_ = goog.string.getRandomString();
  var ReservedWordsText_ = goog.string.getRandomString();
  var EqualityOperatorsText_ = goog.string.getRandomString();
  var QuotedText_ = goog.string.getRandomString();
  var Text_ = goog.string.getRandomString();
  var UserDefinedItemsText_ = goog.string.getRandomString();
  var UserDefinedParametersText_ = goog.string.getRandomString();
  
  var cleanUpText_;
  var convertAllListedWords__;
  var convertAllParameters_;
  var convertAllQuotedText_;
  var convertAllReservedMethods_;
  var convertAllUserDefinedItems_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    cleanUpText_ = function() { return CleanedUpText_; };
    convertAllQuotedText_ = function() { return QuotedText_; };
    convertAllUserDefinedItems_ = function() { return UserDefinedItemsText_; };
    convertAllReservedMethods_ = function() { return ReservedMethodsText_; };
    //ReservedWordsText_
    var firstTime = true;
    convertAllListedWords__ = function() { return EqualityOperatorsText_; };
    convertAllParameters_ = function() { return AllParametersText_; };
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.format(Text_, cleanUpText_, convertAllListedWords__,
                           convertAllReservedMethods_, convertAllUserDefinedItems_,
                           convertAllQuotedText_, convertAllParameters_);
  };
  
  
  //Test Methods
  
  it('should clean the text.', function() {
    var methodWasCalled = false;
    
    cleanUpText_ = function(text, toRegex, replace) {
      methodWasCalled = text === Text_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should convert all quoted text.', function() {
    var methodWasCalled = false;
    var replacedText = {};
    
    convertAllQuotedText_ = function(text, color, toRegex, replace,
                                     match, forEach, surroundWithColor) {
      methodWasCalled = Constant_.ColorQuotedText !== undefined &&
        text === CleanedUpText_ &&
        color === Constant_.ColorQuotedText;
      
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should convert all user defined variables.', function() {
    var methodWasCalled = false;
    
    convertAllUserDefinedItems_ = function(text, regexFindUserDefinedItems, declarationText,
                                           color, toRegex, match, remove, trim, map,
                                           forEach, surroundWithColor) {
      
      methodWasCalled = methodWasCalled ||
        ( Constant_.RegexFindUserDefinedItems !== undefined &&
          Constant_.RegexVarText !== undefined &&
          Constant_.ColorUserItems !== undefined &&
          text === QuotedText_ &&
          regexFindUserDefinedItems === Constant_.RegexFindUserDefinedItems &&
          declarationText === Constant_.RegexVarText &&
          color === Constant_.ColorUserItems);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  
  it('should convert all user defined parameters.', function() {
    var methodWasCalled = false;
    
    convertAllParameters_ = function(text, parameterSearch, functionSearch, color,
                                     toRegex, match, buildString, split, remove, trim, map,
                                     forEach, surroundWithColor) {
      
      methodWasCalled = methodWasCalled ||
        (Constant_.RegexFindParameters !== undefined &&
         Constant_.RegexFunctionText !== undefined &&
         Constant_.ColorUserParameters !== undefined &&
         text === UserDefinedItemsText_);
      
      
      return UserDefinedItemsText_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should convert all reserved words.', function() {
    var methodWasCalled = false;
    
    convertAllListedWords__ = function(text, wordList, color, forEach, surroundWithColor) {
      methodWasCalled = methodWasCalled ||
        (Constant_.ColorReservedWords !== undefined &&
         text === AllParametersText_ &&
         wordList === Current_.reservedWords &&
         color === Constant_.ColorReservedWords);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });

  
  it('should convert all equality.', function() {
    var methodWasCalled = false;
    
    convertAllListedWords__ = function(text, wordList, color, forEach, surroundWithColor) {
      methodWasCalled =  methodWasCalled ||
        (Constant_.ColorEqualityOperators !== undefined &&
         text === ReservedWordsText_ &&
         wordList === Current_.operators &&
         color === Constant_.ColorEqualityOperators);
      
      return ReservedWordsText_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  // it('should convert all reserved methods.', function() {
  //   var methodWasCalled = false;
  
  //   convertAllReservedMethods_ = function(text) {
  //     methodWasCalled = text === Text_;
  //   };
  
  //   callTheMethod_();
  
  //   expect(methodWasCalled).toBe(true);
  // });
  
  
  it('should return the formatted text.', function() {
    
    
    expect(callTheMethod_()).toBe(EqualityOperatorsText_);
  });
  
};


describe('When formatting javascript, it', function() {
  src.test.control.formatTextAreaDisplay.whenFormattingJavaScript.describe();
});
  //--namespace="src.test.control.formatTextAreaDisplay.whenFormattingJavaScript" ^

