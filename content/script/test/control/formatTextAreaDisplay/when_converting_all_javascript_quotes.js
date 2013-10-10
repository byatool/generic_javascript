
goog.require('goog.string');
goog.require('src.base.control.formatTextAreaDisplay.javascript');
goog.require('src.base.control.formatTextAreaDisplay.constant');

goog.provide('src.test.control.formatTextAreaDisplay.whenConvertingAllQuotedText');

/**
 @export
 */
src.test.control.formatTextAreaDisplay.whenConvertingAllQuotedText.describe = function () {
  
  //Using
  
  var Constant_ = src.base.control.formatTextAreaDisplay.constant;
  var Current_ = src.base.control.formatTextAreaDisplay.javascript;
  
  
  //Fields
  
  var Color_ = goog.string.getRandomString();
  var Text_ = goog.string.getRandomString();
  var ToMatchRegex_ = goog.string.getRandomString();
  var ToReplaceRegex_ = goog.string.getRandomString();
  
  var forEach_;
  var match_;
  var replace_;
  var surroundWithColor_;
  var toRegex_;
  
  
  //Test Hooks
  
  beforeEach(function() {
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
    return Current_.convertAllQuotedText(Text_, Color_, toRegex_, replace_,
                                         match_, forEach_, surroundWithColor_);
  };
  
  
  //Test Methods
  
  
  it('should create the regular expression to find quoted text.', function() {
    var methodWasCalled = false;
    
    toRegex_ = function(regex) {
      methodWasCalled = regex === Constant_.RegexFindBetweenQuotes;
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
