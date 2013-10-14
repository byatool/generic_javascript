goog.require('goog.events.KeyCodes');
goog.require('goog.ui.KeyboardShortcutHandler');
goog.require('goog.string');
goog.require('src.base.control.formatTextAreaDisplay');

goog.provide('src.test.control.formatTextAreaDisplay.whenCreatingTheShortCutHandler');

/**
 @export
 */
src.test.control.formatTextAreaDisplay.whenCreatingTheShortCutHandler.describe = function () {
  
  //Using
  
  var Constant_ = src.base.control.formatTextAreaDisplay.constant;
  var Current_ = src.base.control.formatTextAreaDisplay;
  var KeyCodes_ = goog.events.KeyCodes;
  var Modifiers_ = goog.ui.KeyboardShortcutHandler.Modifiers;
  
  //Fields
  
  var FirstKey_ = goog.string.getRandomString();
  var Name_ = goog.string.getRandomString();
  var SecondKey_ = goog.string.getRandomString();
  
  var createTheHandler_;
  var handler_;
  var listen_;
  var registerShortcut_;
  var theDocument_;
  var toCall_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    theDocument_ = {};
    
    handler_ = {};
    registerShortcut_ = function() {};
    handler_.registerShortcut = registerShortcut_;
    
    createTheHandler_ = function(){ return handler_; };
    listen_ = function() {};
    toCall_ = function() {};
  });
  
  
  //Support Methods
  var callTheMethod_ = function() {
    return Current_.createShortCutHandler(theDocument_, Name_, FirstKey_, SecondKey_,
                                          createTheHandler_, listen_, toCall_);
  };
  
  
  //Test Methods
  
  
  it('should create the handler.', function() {
    var methodWasCalled = false;
    
    createTheHandler_ = function(document) {
      methodWasCalled = document === theDocument_;
      
      return handler_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should register the shortcut.', function() {
    var methodWasCalled = false;
    
    handler_.registerShortcut = function(prettyTheTextShortcutName, firstKey, firstAction,
                                         secondKey, secondAction) {
      
      methodWasCalled = prettyTheTextShortcutName === Name_ &&
        firstKey === FirstKey_ &&
        firstAction === Modifiers_.CTRL &&
        secondKey === SecondKey_ &&
        secondAction === Modifiers_.CTRL;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  
  it('should set up the listener', function() {
    var methodWasCalled = false;
    
    listen_ = function(handler, triggerEventName, toCall) {
      methodWasCalled = handler === handler_ &&
        triggerEventName === goog.ui.KeyboardShortcutHandler.EventType.SHORTCUT_TRIGGERED &&
        toCall === toCall_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
};


describe('When creating the short cut handler, it', function() {
  src.test.control.formatTextAreaDisplay.whenCreatingTheShortCutHandler.describe();
});


//--namespace="src.test.control.formatTextAreaDisplay.whenCreatingTheShortCutHandler" ^

