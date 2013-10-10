goog.require('goog.dom');
goog.require('src.base.control.messageBox');

goog.provide('src.test.control.messageBox.whenClearingTheMessages');

/**
 @export
 */
src.test.control.messageBox.whenClearingTheMessages.describe = function() {
  //Import
  var Current = src.base.control.messageBox;


  //Fields
  var findMessageBox_;
  var parent_;
  var removeChildren_;

  //Test Hooks
  beforeEach(function() {
    removeChildren_ = function() {};
    findMessageBox_ = function() {};
  });

  //Support Methods
  var callTheMethod_ = function() {
    Current.clearAllMessages(parent_, findMessageBox_, removeChildren_);
  };


  //Test Methods

  it('should find the message box.', function() {
    var methodWasCalled = false;

    findMessageBox_ = function(parent) {
      methodWasCalled = parent === parent_;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should remove the children.', function() {
    var child = {};
    var methodWasCalled = false;

    findMessageBox_ = function() {
      return child;
    };

    removeChildren_ = function(messageBox) {
      return methodWasCalled = messageBox === child;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });

};

describe('When clearing the messages, it', function() {
  src.test.control.messageBox.whenClearingTheMessages.describe();
});
