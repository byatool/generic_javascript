
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
  var replace_;  
  
  //Test Hooks
  
  beforeEach(function() {
    text_ = 'asd';
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.surroundWithColor(text_, Word_, Color_, replace_);
  };
  
  
  //Test Methods
  
  it('should replace the text.', function() {
    var methodWasCalled = false;
    
    replace_ = function(text, replaceWhat, replaceWith) {
      methodWasCalled = text === text_ &&
        replaceWhat === Word_ &&
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
