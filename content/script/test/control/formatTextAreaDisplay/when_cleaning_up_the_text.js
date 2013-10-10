
goog.require('goog.string');
goog.require('src.base.control.formatTextAreaDisplay.javascript');
goog.require('src.base.control.formatTextAreaDisplay.constant');

goog.provide('src.test.control.formatTextAreaDisplay.whenCleaningUpTheText');

/**
 @export
 */
src.test.control.formatTextAreaDisplay.whenCleaningUpTheText.describe = function () {
  
  //Using
  
  var Constant_ = src.base.control.formatTextAreaDisplay.constant;
  var Current_ = src.base.control.formatTextAreaDisplay.javascript;
  
  
  //Fields
  
  var Text_ = goog.string.getRandomString();
  
  var replace_;
  var toRegex_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    replace_ = function(){};
    toRegex_ = function(){};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.cleanUpText(Text_, toRegex_, replace_);
  };
  
  
  //Test Methods
  
  it('should replace the pipe sybmol.', function() {
    var methodWasCalled = false;
    
    toRegex_ = function(expression){
      methodWasCalled = Constant_.RegexFindPipe !== undefined &&
        expression === Constant_.RegexFindPipe;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should replace all the pipe symbols.', function() {
    var methodWasCalled = false;
    var createdRegex = {};
    
    toRegex_ = function() {
      return createdRegex;
    };

    replace_ = function(text, regex, replacement){
      methodWasCalled = text === Text_ &&
        regex === createdRegex &&
        replacement === Constant_.EqualityOperatorOr;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });

  
  it('should return the text', function() {
    var cleanedText = 'adf';

    replace_ = function(){
      return cleanedText;
    };

    
    expect(callTheMethod_()).toBe(cleanedText);
  });
  
};

describe('When cleaning up the text, it', function() {
  src.test.control.formatTextAreaDisplay.whenCleaningUpTheText.describe();
});


//--namespace="src.test.control.formatTextAreaDisplay.whenCleaningUpTheText" ^
