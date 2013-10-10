goog.require('goog.array');
goog.require('goog.string');
goog.require('src.base.control.formatTextAreaDisplay.constant');
goog.require('src.base.control.formatTextAreaDisplay.javascript');
goog.require('src.base.helper.googleWrapper');

goog.provide('src.test.control.formatTextAreaDisplay.whenFormattingJavaScript');

/**
 @export
 */
src.test.control.formatTextAreaDisplay.whenFormattingJavaScript.describe = function () {
  
  //Using
  
  var Constant_ = src.base.control.formatTextAreaDisplay.constant;
  var Current_ = src.base.control.formatTextAreaDisplay.javascript;
  var GoogleWrapper_ = src.base.helper.googleWrapper;
  
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
  var convertAllEqualityOperators_;
  var convertAllParameters_;
  var convertAllQuotedText_ ;
  var convertAllReservedMethods_;
  var convertAllReservedWords_;
  var convertAllUserDefinedItems_;
  
   
  //Test Hooks
  
  beforeEach(function() {
    cleanUpText_ = function(){ return CleanedUpText_; };
    convertAllQuotedText_ = function(){ return QuotedText_; };
    convertAllEqualityOperators_ = function() { return EqualityOperatorsText_; };
    convertAllUserDefinedItems_ = function() { return UserDefinedItemsText_; };
    convertAllReservedMethods_ = function() { return ReservedMethodsText_; };
    convertAllReservedWords_ = function() { return ReservedWordsText_; };
    convertAllParameters_ = function() { return AllParametersText_; };
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.format(Text_, cleanUpText_, convertAllReservedWords_,
                           convertAllEqualityOperators_, convertAllReservedMethods_,
                           convertAllUserDefinedItems_, convertAllQuotedText_,
                           convertAllParameters_);
  };
  
  
  //Test Methods
  
  it('should clean the text.', function() {
    var methodWasCalled = false;
    
    cleanUpText_ = function(text, toRegex, replace){
      methodWasCalled = text === Text_ &&
        toRegex === GoogleWrapper_.toRegex &&
        replace === GoogleWrapper_.replace;
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
        color === Constant_.ColorQuotedText &&
        replace === GoogleWrapper_.replace &&
        match === GoogleWrapper_.match &&
        forEach === goog.array.forEach &&
        surroundWithColor === Current_.surroundWithColor;
      ;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should convert all user defined variables.', function() {
    var methodWasCalled = false;
    
    convertAllUserDefinedItems_ = function(text, toRegex, match, remove, trim, map,
                                           forEach, surroundWithColor) {
      
      methodWasCalled = methodWasCalled ||
        (text === QuotedText_ &&
         toRegex === GoogleWrapper_.toRegex  &&
         match === GoogleWrapper_.match &&
         remove === goog.string.remove &&
         trim === goog.string.trim &&
         map === goog.array.map &&
         forEach === goog.array.forEach &&
         surroundWithColor === Current_.surroundWithColor);
    };  
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  
  it('should convert all user defined parameters.', function() {
    var methodWasCalled = false;
    
    convertAllParameters_ = function(text, toRegex, match, buildString, split, remove, trim, map,
                                           forEach, surroundWithColor) {
      
      methodWasCalled = methodWasCalled ||
        (text === UserDefinedItemsText_ &&
         toRegex === GoogleWrapper_.toRegex  &&
         match === GoogleWrapper_.match &&
         buildString === goog.string.buildString &&
         split === GoogleWrapper_.split &&
         remove === goog.string.remove &&
         trim === goog.string.trim &&
         map === goog.array.map,
         forEach === goog.array.forEach,
         surroundWithColor === Current_.surroundWithColor);
      
      
      return UserDefinedItemsText_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should convert all reserved words.', function() {
    var methodWasCalled = false;
    
    convertAllReservedWords_ = function(text, convertReservedWords) {
      methodWasCalled = text === AllParametersText_ &&
        convertReservedWords === Current_.surroundWithColor;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should convert all equality.', function() {
    var methodWasCalled = false;
    
    convertAllEqualityOperators_ = function(text, convertReservedWords) {
      methodWasCalled = text === ReservedWordsText_ &&
        convertReservedWords === Current_.surroundWithColor;
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

