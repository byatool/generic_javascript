goog.require('goog.string');
goog.require('src.base.control.formatTextAreaDisplay.constant');
goog.require('src.base.control.formatTextAreaDisplay.javascript');

goog.provide('src.test.control.formatTextAreaDisplay.whenFormattingJavaScript');

/**
 @export
 */
src.test.control.formatTextAreaDisplay.whenFormattingJavaScript.describe = function () {
  
  //Using
  
  var Constant_ = src.base.control.formatTextAreaDisplay.constant;
  var Current_ = src.base.control.formatTextAreaDisplay.javascript;
  
  
  //Fields
  
  var Text_ = goog.string.getRandomString();
  
  var convertAllEqualityOperators_;
  var convertAllNonReservedMethods_;
  var convertAllReservedMethods_;
  var convertAllReservedWords_;
  var convertAllText_;
  
  //Test Hooks
  
  beforeEach(function() {
    convertAllText_ = function(){};
    convertAllEqualityOperators_ = function(){};
    convertAllNonReservedMethods_ = function(){};
    convertAllReservedMethods_ = function(){};
    convertAllReservedWords_ = function(){};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.format(Text_, convertAllReservedWords_, convertAllEqualityOperators_, convertAllReservedMethods_,
                           convertAllNonReservedMethods_, convertAllText_);
  };
  
  
  //Test Methods
  
  it('should convert all reserved words.', function() {
    var methodWasCalled = false;
    
    convertAllReservedWords_ = function(text, convertReservedWords) {
      methodWasCalled = text === Text_ &&
        convertReservedWords === Current_.surroundWithColor;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should convert all equality.', function() {
    var methodWasCalled = false;
    var previousText = 'dsfa';
    convertAllReservedWords_ = function() { return previousText; };
    
    convertAllEqualityOperators_ = function(text, convertReservedWords) {
      methodWasCalled = text === previousText &&
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
  
  
  // it('should convert all quoted text.', function() {
  //   var methodWasCalled = false;
  
  //   convertAllText_ = function(text) {
  //     methodWasCalled = text === Text_;
  //   };
  
  //   callTheMethod_();
  
  //   expect(methodWasCalled).toBe(true);
  // });
  
  
  it('should return the formatted text.', function() {
    var finishedText = 'asfd';
    convertAllEqualityOperators_ = function(){
      return finishedText;
    };
    
    
    expect(callTheMethod_()).toBe(finishedText);
  });
  
};


describe('When formatting javascript, it', function() {
  src.test.control.formatTextAreaDisplay.whenFormattingJavaScript.describe();
});
  //--namespace="src.test.control.formatTextAreaDisplay.whenFormattingJavaScript" ^

