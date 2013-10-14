
goog.require('goog.string');
goog.require('src.base.control.formatTextAreaDisplay.html');
goog.require('src.base.control.formatTextAreaDisplay.constant');

goog.provide('src.test.control.formatTextAreaDisplay.whenFormattingHtml');

/**
 @export
 */
src.test.control.formatTextAreaDisplay.whenFormattingHtml.describe = function () {
  
  //Using
  
  var Constant_ = src.base.control.formatTextAreaDisplay.constant;
  var Current_ = src.base.control.formatTextAreaDisplay.html;
  
  
  //Fields

  var ReplacedText_ = goog.string.getRandomString();
  var Text_ = goog.string.getRandomString();
  
  var convertAllListedWords_;
  var convertAllQuotedText_;
  var replace_;
  var toRegex_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    convertAllListedWords_ = function() {};
    convertAllQuotedText_ = function() {};
    replace_ = function() { return ReplacedText_; };
    toRegex_ = function(){};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.format(Text_, replace_, toRegex_,
                           convertAllListedWords_, convertAllQuotedText_);
  };
  
  //Test Methods
  
  it('should replace all & signs.', function() {
    var callCount = false;
    var regex = 'ad';
    
    toRegex_ = function(text){
      callCount += text === '&';
      return regex;
    };
    
    replace_ = function(text, what, toWhat) {
      callCount += text === Text_ &&
        what === regex &&
        toWhat === '&amp;';
    };
    
    callTheMethod_();
    
    expect(callCount).toBe(2);
  });

  
  it('should replace all = signs.', function() {
    var callCount = false;
    var newText  = 'adfsfd';
    var oldRegex = 'adf';
    var regex = 'ad';
    
    toRegex_ = function(text){
      if(text === '&')  {
        return oldRegex;
      }
      else {
        callCount += text === '=';
        return regex;
      }
    };
    
    replace_ = function(text, what, toWhat) {
      if(what === oldRegex) {
        return newText;
      }
      else
      {
        callCount += text === newText &&
          what === regex &&
          toWhat === '&#61;';
        
        return '';
      }
    };
    
    
    callTheMethod_();
    
    expect(callCount).toBe(2);
  });
  
  
  it('should replace all " signs.', function() {
    var callCount = false;
    var newText  = 'adfsfd';
    var oldRegex = 'adf';
    var regex = 'ad';
    
    toRegex_ = function(text){
      if(text === '=')  {
        return oldRegex;
      }
      else {
        callCount += text === '"';
        return regex;
      }
    };
    
    replace_ = function(text, what, toWhat) {
      if(what === oldRegex) {
        return newText;
      }
      else
      {
        callCount += text === newText &&
          what === regex &&
          toWhat === '_!';
        
        return '';
      }
    };
    
    
    callTheMethod_();
    
    expect(callCount).toBe(2);
  }); 
  
  
  it('should replace all > signs.', function() {
    var callCount = false;
    var newText  = 'adfsfd';
    var oldRegex = 'adf';
    var regex = 'ad';
    
    toRegex_ = function(text){
      if(text === '"')  {
        return oldRegex;
      }
      else {
        callCount += text === '>';
        return regex;
      }
    };
    
    replace_ = function(text, what, toWhat) {
      if(what === oldRegex) {
        return newText;
      }
      else
      {
        callCount += text === newText &&
          what === regex &&
          toWhat === '&gt;';
        
        return '';
      }
    };
    
    
    callTheMethod_();
    
    expect(callCount).toBe(2);
  }); 

  
  it('should replace all < signs.', function() {
    var callCount = false;
    var newText  = 'adfsfd';
    var oldRegex = 'adf';
    var regex = 'ad';
    
    toRegex_ = function(text){
      if(text === '>')  {
        return oldRegex;
      }
      else {
        callCount += text === '<';
        return regex;
      }
    };
    
    replace_ = function(text, what, toWhat) {
      if(what === oldRegex) {
        return newText;
      }
      else
      {
        callCount += text === newText &&
          what === regex &&
          toWhat === '&lt;';
        
        return '';
      }
    };
    
    callTheMethod_();
    
    expect(callCount).toBe(2);
  }); 

   
  it('should convert all reserved words.', function() {
    var methodWasCalled = false;
    
    convertAllListedWords_ = function(text, reservedWords, color){
      methodWasCalled = methodWasCalled ||
        (text === ReplacedText_ &&
         reservedWords === Current_.reservedWords &&
         color === Constant_.ColorUserItems);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
   
  
  it('should convert all quoted text.', function() {
    var methodWasCalled = false;
    var newText = 'adf';
    
    convertAllListedWords_ = function(){
      return newText;
    };
    
    convertAllQuotedText_ = function(text, color, regex) {
      methodWasCalled = Constant_.RegexFindBetweenReplacementQuote !== undefined &&
        text === newText &&
        color === Constant_.ColorQuotedText &&
        regex === Constant_.RegexFindBetweenReplacementQuote;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should convert all equality operators.', function() {
    var methodWasCalled = false;
    var newText = 'adf';
    
    convertAllQuotedText_ = function(){
      return newText;
    };
    
    convertAllListedWords_ = function(text, reservedWords, color){
      methodWasCalled = methodWasCalled ||
        (text === newText &&
        reservedWords === Current_.operators &&
         color === Constant_.ColorEqualityOperators);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  
  it('should replace the quote markers with the quote acsii code.', function() {
    var callCount = 0;
    var newText = 'adf';
    var regex = 'as';
    
    convertAllListedWords_ = function(){
      return newText;
    };
    
    toRegex_ = function(text){
      callCount += text === '_!';
      return regex;
    };
    
    replace_ = function(text, what, toWhat){
      callCount = text === newText &&
        what === regex &&
        toWhat === '&quot;';
    };
    
    
    callTheMethod_();
    
    expect(callCount).toBe(true);
  });
  
  
  
  it('should return the formatted text.', function() {
    var newText = 'adf';
    
    replace_ = function(){
      return newText;
    };
    
    expect(callTheMethod_()).toBe(newText);
  });
};

describe('When formatting html, it', function() {
  src.test.control.formatTextAreaDisplay.whenFormattingHtml.describe();
});


//--namespace="src.test.control.formatTextAreaDisplay.whenFormattingHtml" ^
