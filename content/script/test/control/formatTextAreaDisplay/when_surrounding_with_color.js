
goog.require('goog.string');
goog.require('src.base.control.formatTextAreaDisplay.javascript');
goog.require('src.base.control.formatTextAreaDisplay.constant');

goog.provide('src.test.control.formatTextAreaDisplay.whenSurroundingWithColor');

/**
 @export
 */
src.test.control.formatTextAreaDisplay.whenSurroundingWithColor.describe = function () {
  
  //Using
  
  var Constant_ = src.base.control.formatTextAreaDisplay.constant;
  var Current_ = src.base.control.formatTextAreaDisplay.javascript;
  
  
  //Fields
  
  var Color_ = goog.string.getRandomString();
  var Word_ = goog.string.getRandomString();

  var text_;
  var toRegex_;
  var replace_;  
  
  //Test Hooks
  
  beforeEach(function() {
    text_ = 'asd';
    replace_ = function() {};
    toRegex_ = function() {};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.surroundWithColor(text_, Word_, Color_, toRegex_, replace_);
  };
  
  
  //Test Methods
  
  it('should create the regex.', function() {
    var methodWasCalled = false;
    
    toRegex_ = function(text) {
      methodWasCalled = text === Word_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should replace the text.', function() {
    var methodWasCalled = false;
    var regex = new RegExp(Word_);
    
    toRegex_ = function() {
      return regex;
    };
    
    replace_ = function(text, replaceWhat, replaceWith) {
      methodWasCalled = text_ &&
        replaceWhat === regex &&
        replaceWith === '<span style=\'color:' + Color_ +';\'>' + Word_ + '</span>';
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should have updated the text.', function() {
    var formattedText = 'acf';
    
    replace_ = function() { return formattedText; };
    
    expect(callTheMethod_()).toBe(formattedText);
  });
  
};

describe('When surround with color, it', function() {
  src.test.control.formatTextAreaDisplay.whenSurroundingWithColor.describe();
});


//--namespace="src.test.control.formatTextAreaDisplay.whenSurroundingWithColor" ^
