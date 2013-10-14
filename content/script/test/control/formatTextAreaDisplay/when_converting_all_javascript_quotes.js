
goog.require('goog.string');
goog.require('src.base.control.formatTextAreaDisplay.utility');
goog.require('src.base.control.formatTextAreaDisplay.constant');

goog.provide('src.test.control.formatTextAreaDisplay.whenConvertingAllQuotedText');

/**
 @export
 */
src.test.control.formatTextAreaDisplay.whenConvertingAllQuotedText.describe = function () {
  
  //Using
  
  var Constant_ = src.base.control.formatTextAreaDisplay.constant;
  var Current_ = src.base.control.formatTextAreaDisplay.utility;
  
  
  //Fields
  
  var Color_ = goog.string.getRandomString();
  var Text_ = goog.string.getRandomString();
  var ToMatchRegex_ = goog.string.getRandomString();
  var ToReplaceRegex_ = goog.string.getRandomString();
  
  var forEach_;
  var isEmptySafe_;
  var match_;
  var replace_;
  var quoteRegex_;
  var surroundWithColor_;
  var toRegex_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    quoteRegex_ = Constant_.RegexFindBetweenQuotes;
    
    isEmptySafe_ = function(){ return false; };
    match_= function() {};
    replace_= function() {};
    forEach_ = function(){};
    
    surroundWithColor_ = function(){};
    
    toRegex_= function(toFind) {
      return toFind === Constant_.RegexFindBetweenQuotes ?
        ToMatchRegex_ :
        ToReplaceRegex_;    
    };
    
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.convertAllQuotedText(Text_, Color_, quoteRegex_, isEmptySafe_,
                                         toRegex_, replace_, match_, forEach_,
                                         surroundWithColor_);
  };
  
   //Test Methods
  
  
  it('should check if the quote regex is empty.', function() {
    var methodWasCalled = false;
    
    isEmptySafe_ = function(text){
      methodWasCalled = text === quoteRegex_;
    };
    
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the default find regular expression when the parameter is null.', function() {
    var methodWasCalled = false;
    
    isEmptySafe_ = function(){
      return true;
    };
    
    toRegex_ = function(regex) {
      methodWasCalled = regex === Constant_.RegexFindBetweenQuotes;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the given find regular expression when it is given.', function() {
    var methodWasCalled = false;
    quoteRegex_ = 'adf';
     
    toRegex_ = function(regex) {
      methodWasCalled = regex === quoteRegex_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should find the instances within the text.', function() {
    var methodWasCalled = false;
    
    match_ = function(text, theMatch){
      methodWasCalled = text === Text_ &&
        theMatch === ToMatchRegex_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should surround all matches with a span.', function() {
    var stepsPassed = 0;
    var item = 'ada';
    var createdRegex = 'dsaffsda';
    var matched = {};
    
    match_ = function(){
      return matched;
    };
    
    surroundWithColor_ = function(text, word, color, toRegex, replace) {
      stepsPassed += text === Text_ &&
        word === item &&
        color === Color_ &&
        toRegex === toRegex_ &&
        replace === replace_;
    };
    
    forEach_ = function(matches, replacement){
      stepsPassed += matches === matched ;
      
      replacement(item);
    };
    
    callTheMethod_();
    
    expect(stepsPassed).toBe(2);
  });
  
  
  it('should not find all matches if there are none.', function() {
    var methodWasCalled = false;
    var matched = null;
    
    match_ = function(){
      return matched;
    };
    
    forEach_ = function() {
      methodWasCalled = true;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(false);
  });
  
  
  it('should return the finished text.', function() {
    
    
    expect(callTheMethod_()).toBe(Text_);
  });
};

describe('When converting all quoted text, it', function() {
  src.test.control.formatTextAreaDisplay.whenConvertingAllQuotedText.describe();
});


//--namespace="src.test.control.formatTextAreaDisplay.whenConvertingAllQuotedText" ^
