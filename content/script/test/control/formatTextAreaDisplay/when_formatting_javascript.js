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

  var setAllEquality_;
  var setAllNonReservedMethods_;
  var setAllReservedMethods_;
  var setAllReservedWords_;
  var setAllText_;
  var surroundWithPre_;
  
  //Test Hooks
  
  beforeEach(function() {
    setAllText_ = function(){};
    setAllEquality_ = function(){};
    setAllNonReservedMethods_ = function(){};
    setAllReservedMethods_ = function(){};
    setAllReservedWords_ = function(){};
    surroundWithPre_ = function(){};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.format(Text_, setAllReservedWords_, setAllEquality_, setAllReservedMethods_,
                           setAllNonReservedMethods_, setAllText_, surroundWithPre_);
    
    
    //Test Methods
    
    
    it('should set all reserved words.', function() {
      var methodWasCalled = false;
      
      callTheMethod_();
      
      expect(methodWasCalled).toBe(true);
    });
    
  };
  
  
  describe('When formatting javascript, it', function() {
    src.test.control.formatTextAreaDisplay.whenFormattingJavaScript.describe();
  });
  
  
  //--namespace="src.test.control.formatTextAreaDisplay.whenFormattingJavaScript" ^
  
