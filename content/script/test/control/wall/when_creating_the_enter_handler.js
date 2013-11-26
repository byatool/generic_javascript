goog.require('goog.ui.KeyboardShortcutHandler.EventType');
goog.require('goog.events');
goog.require('goog.string');
goog.require('src.base.control.wall.constant');
goog.require('src.base.control.wall.form');

goog.provide('src.test.control.wall.form.whenCreatingTheEnterHandler');

/**
 @export
 */
src.test.control.wall.form.whenCreatingTheEnterHandler.describe = function () {
  
  //Using
  
  var Constant_ = src.base.control.wall.constant;
  var Current_ = src.base.control.wall.form;
  var KeyCodes_ = goog.events.KeyCodes;
  var Shortcut_ = goog.ui.KeyboardShortcutHandler.EventType;
  
  //Fields
  
  
  var createAKeyboardShortcutHandler_;
  var document_;
  var keyboardHandler_;
  var listen_;
  var submitEntry_;
  
  
  
  //Test Hooks
  
  beforeEach(function() {
    submitEntry_ = {};
    keyboardHandler_ = {};
    keyboardHandler_.registerShortcut = function() {};
    
    createAKeyboardShortcutHandler_ = function() { return keyboardHandler_; };
    listen_ = function() {};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.createTheEnterHandler(document_, submitEntry_, createAKeyboardShortcutHandler_,
                                          listen_);
  };
  
  //Test Methods
  
  
  it('should create the keyboard handler.', function() {
    var methodWasCalled = false;
    
    createAKeyboardShortcutHandler_ = function(document){
      methodWasCalled = document === document_;
      return keyboardHandler_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should register the shortcut.', function() {
    var methodWasCalled = false;
    
    keyboardHandler_.registerShortcut = function(name, code) {
      methodWasCalled = Constant_.ShortcutEnter !== undefined &&
        name === Constant_.ShortcutEnter &&
        code === KeyCodes_.ENTER;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should set up the listen.', function() {
    var methodWasCalled = 0;

    submitEntry_.click = function() {
      methodWasCalled += 1;
    };
    
    listen_ = function(handler, triggered, toCall){
      methodWasCalled += handler === keyboardHandler_ &&
        triggered === Shortcut_.SHORTCUT_TRIGGERED;
      
      toCall();
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(2);
  });
  
};

describe('When creating the enter handler, it', function() {
  src.test.control.wall.form.whenCreatingTheEnterHandler.describe();
});


//--namespace="src.test.control.wall.form.whenCreatingTheEnterHandler" ^
