goog.require('src.base.control.messageBox');
goog.provide('src.test.control.messageBox.whenForcingAMessageBoxToHide');

/**
 @export
 */
src.test.control.messageBox.whenForcingAMessageBoxToHide.describe = function () {
  
  //Using
  
  var Current_ = src.base.control.messageBox;
  
  
  //Fields
  
  var callOnce_;
  var messageBox_;
  var showElement_;
  var time_;
  
  //Test Hooks
  
  beforeEach(function() {
    messageBox_ = {};
    time_ = 10;
    
    callOnce_ = function(toCall){ };
    showElement_ = function(){};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    Current_.forceHide(messageBox_,
                       time_,
                       callOnce_,
                       showElement_);
  };
  
  
  //Test Methods
  
  
  it('should hide the message box.', function() {
    var methodWasCalled = false;
    var toCallFunction;
    
    showElement_ = function(element, showIt){
      methodWasCalled = element === messageBox_ &&
        showIt === false;
    };
    
    callOnce_ = function(toCall, time){
      toCallFunction = toCall;
    };
    
    callTheMethod_();
    
    toCallFunction();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should use the correct time.', function() {
    var methodWasCalled = false;
    
    callOnce_ = function(toCall, time){
      methodWasCalled = time ===  time_ * 1000;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
};


describe('When forcing a message box to hide, it', function() {
  
  src.test.control.messageBox.whenForcingAMessageBoxToHide.describe();
  
});
