goog.require('goog.array');
goog.require('goog.string');
goog.require('src.base.control.formComponent');
goog.require('src.base.helper.constants');

goog.provide('src.test.control.formComponent.whenHandlingTheResult');

/**
 @export
 */
src.test.control.formComponent.whenHandlingTheResult.describe = function() {
  //Fields
  var Current = src.base.control.formComponent;
  var Constants = src.base.helper.constants;

  var createAResult_;
  var createdResult_;
  var filter_;
  var location_;
  var messageBox_;
  var messageItem_;
  var openWindow_;
  var postResult_;
  var showElement_;
  var updateTheMessageBox_;

  //Test Hooks
  beforeEach(function() {
    messageBox_ = {};

    messageItem_ = {};
    messageItem_['Message'] = goog.string.getRandomString();
    location_ = goog.string.getRandomString();

    postResult_ = {};
    postResult_[Current.MessageItems] = [messageItem_];

    createdResult_ = {};

    createAResult_ = function() {};
    filter_ = function() { };
    openWindow_ = function() {};
    showElement_ = function() {};
    updateTheMessageBox_ = function() {};
  });

  //Support Methods

  var callTheMethod_ = function() {
    Current.handleCallback(postResult_, messageBox_, filter_, createAResult_, updateTheMessageBox_, showElement_, openWindow_);
  };

  //.MessageItems
  //  .Message
  //  .MessageType
  //.PassedInItem

  //Test Methods
  it('should create a list of messages from the items.', function() {
    var methodWasCalled = false;

    filter_ = function(messages, lambda) {
      methodWasCalled = messages === postResult_[Current.MessageItems];
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should create a result from the error messages.', function() {
    var methodWasCalled = false;
    var messageList = [messageItem_.Message];

    filter_ = function() {
      return messageList;
    };

    createAResult_ = function(messages) {
      methodWasCalled = messages === messageList;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should update the message box if there are messages.', function() {
    var methodWasCalled = false;

    createAResult_ = function() {
      return createdResult_;
    };

    updateTheMessageBox_ = function(messageBox, result) {
      methodWasCalled = messageBox === messageBox_ &&
        result === createdResult_;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should show the message box when there are errors.', function() {
    var methodWasCalled = false;

    showElement_ = function(element, show) {
      methodWasCalled = element === messageBox_ && show;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should redirect when there are no errors.', function() {
    var methodWasCalled = false;

    postResult_ = {};
    postResult_[Current.MessageItems] = [];
    postResult_[Current.RedirectUrl] = 'afd';

    openWindow_ = function(url) {
      methodWasCalled = url === postResult_[Current.RedirectUrl];
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);

  });
};

describe('When handling the result, it', function() {
  src.test.control.formComponent.whenHandlingTheResult.describe();
});
