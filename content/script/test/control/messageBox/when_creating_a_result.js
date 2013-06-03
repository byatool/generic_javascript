goog.require('src.base.control.messageBox');
goog.require('src.base.helper.constants');

goog.provide('src.test.control.messageBox.whenCreatingAResult');

/**
 @export
 */
src.test.control.messageBox.whenCreatingAResult.describe = function() {
  //Fields
  var MessageBox = src.base.control.messageBox;
  var ResultConstants = src.base.helper.constants.result;
  
  var messages_;
  var result_;
  var success_;
  
  //Test Hooks
  beforeEach(function() {
    messages_ = ['error'];
    success_ = true;
  });
  
  //Support Methods
  
  var callTheMethod = function(){
    return MessageBox.createAResult(messages_, success_);
  };
  
  //Test Methods
  
  it('should set the messages_', function() {
    expect(callTheMethod()[ResultConstants.MESSAGES]).toBe(messages_);
  });
  
  
  it('should set the success.', function() {
    expect(callTheMethod()[ResultConstants.SUCCESS]).toBe(success_);
  });
};

describe('When creating a result_, it', function() {
  src.test.control.messageBox.whenCreatingAResult.describe();
});
