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
  
  var CleanedUpText_ = goog.string.getRandomString();
  var ReservedMethodsText_ = goog.string.getRandomString();
  var ReservedWordsText_ = goog.string.getRandomString();
  var EqualityOperatorsText_ = goog.string.getRandomString();
  var QuotedText_ = goog.string.getRandomString();
  var Text_ = goog.string.getRandomString();

  var cleanUpText_;
  var convertAllEqualityOperators_;
  var convertAllNonReservedMethods_;
  var convertAllReservedMethods_;
  var convertAllReservedWords_;
  var convertAllQuotedText_ ;
  
  //Test Hooks
  
  beforeEach(function() {
    cleanUpText_ = function(){ return CleanedUpText_; };
    convertAllQuotedText_ = function(){ return QuotedText_; };
    convertAllEqualityOperators_ = function(){ return EqualityOperatorsText_; };
    convertAllNonReservedMethods_ = function(){};
    convertAllReservedMethods_ = function(){ return ReservedMethodsText_; };
    convertAllReservedWords_ = function(){ return ReservedWordsText_; };
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.format(Text_, cleanUpText_, convertAllReservedWords_,
                           convertAllEqualityOperators_, convertAllReservedMethods_,
                           convertAllNonReservedMethods_, convertAllQuotedText_ );
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
  
  it('should convert all reserved words.', function() {
    var methodWasCalled = false;
    
    convertAllReservedWords_ = function(text, convertReservedWords) {
      methodWasCalled = text === QuotedText_ &&
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
  
  
  // it('should convert all non reserved methods.', function() {
  //   var methodWasCalled = false;
  
  //   convertAllNonReservedMethods_ = function(text) {
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

