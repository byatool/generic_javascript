goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.Timer');
goog.require('src.base.control.messageBox');
goog.require('src.base.helper.constants');

goog.provide('src.test.control.messageBox.whenUpdatingMesssagesInAMessageBoxByAResult');


/**
 @export
 */
src.test.control.messageBox.whenUpdatingMesssagesInAMessageBoxByAResult.describe = function() {
  //Using
  
  var Constants = src.base.helper.constants.result;
  var Current = src.base.control.messageBox;
  
  
  //Fields
  
  var appendChild_;
  var clearAllMessages_;
  var createADiv_;
  var createdDiv_;
  var findMessageBox_;
  var forceHide_;
  var messageBox_;
  var parentMessageBox_;
  var result_;
  var setTheAppearanceByResult_;
  var showTheElement_;
  
  //Test Hooks
  
  beforeEach(function() {
    createdDiv_ = {};
    messageBox_ = {};
    parentMessageBox_ = {};
    result_ = {};
    result_[Constants.MESSAGES] = [];
    
    appendChild_ = function() {};
    clearAllMessages_ = function() {};
    createADiv_ = function() { return createdDiv_; };
    forceHide_ = function(){};
    findMessageBox_ = function() { return messageBox_;};
    setTheAppearanceByResult_ = function() {};
    showTheElement_ = function() {};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    Current.updateMessagesByResult(parentMessageBox_, result_, clearAllMessages_,
                                   findMessageBox_, createADiv_, appendChild_,
                                   setTheAppearanceByResult_, showTheElement_,
                                   forceHide_);
  };
  
  
  //Test Methods

  it('should clear all the messages.', function() {
    var methodWasCalled = false;

    clearAllMessages_ = function(parentContainer, findMessageBox, removeChildren) {
      methodWasCalled = parentContainer === parentMessageBox_ &&
        findMessageBox === src.base.control.messageBox.findMessageBox_ &&
        removeChildren === goog.dom.removeChildren;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should find the message box.', function() {
    var methodWasCalled = false;

    findMessageBox_ = function(parentContainer) {
      methodWasCalled = parentContainer === parentMessageBox_;
      return messageBox_;
    };

    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });


  it('should create a div for each message.', function() {
    var callCount = 0;
    var messages = ['hi', 'there'];

    result_[Constants.MESSAGES] = messages;

    createADiv_ = function(properties, messageItem) {
      callCount += messageItem === messages[0] || messageItem === messages[1];
      return createdDiv_;
    };

    callTheMethod_();

    expect(callCount).toBe(messages.length);
  });


  it('should append each message to the message box.', function() {
    var callCount = 0;
    var wasCalled = false;
    var firstResult = {};
    var secondResult = {};

    result_[Constants.MESSAGES] = ['', ''];

    createADiv_ = function() {
      var result = wasCalled ? firstResult : secondResult;
      wasCalled = true;

      return result;
    };
    
    appendChild_ = function(parent, child) {
      return callCount += parent === messageBox_ &&
        (child === firstResult || child === secondResult);
    };
    
    callTheMethod_();
    
    expect(callCount).toBe(2);
  });
  
  
  
  it('should set the appearance of the message box.', function() {
    var methodWasCalled = false;
    
    setTheAppearanceByResult_ = function(parentContainer, result, addRemoveClass) {
      methodWasCalled = parentContainer === messageBox_ &&
        result === result_ &&
        addRemoveClass === goog.dom.classes.addRemove;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should show the message box.', function() {
    var methodWasCalled = false;
    
    showTheElement_ = function(messageBox, show) {
      methodWasCalled = messageBox === parentMessageBox_ &&
        show;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should prepare the forced hide.', function() {
    var methodWasCalled = false;
    
    forceHide_ = function(messageBox, time, callOnce, showElement){
      methodWasCalled = messageBox === parentMessageBox_ &&
        Current.HideDelay !== undefined &&
        time === Current.HideDelay &&
        callOnce === goog.Timer.callOnce &&
        showElement === showTheElement_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
};

describe('When updating messages in a message box by a result, it', function() {
  src.test.control.messageBox.whenUpdatingMesssagesInAMessageBoxByAResult.describe();
});
