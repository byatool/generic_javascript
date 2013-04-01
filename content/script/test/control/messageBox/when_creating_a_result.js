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
  var success = true;

  var messages;
  var result;

  //Test Hooks
  beforeEach(function() {
    messages = ['error'];
    result = MessageBox.createAResult(messages, true);
  });

  //Support Methods

  //Test Methods

  it('should set the messages', function() {
    expect(result[ResultConstants.MESSAGES]).toBe(messages);
  });


  it('should set the success.', function() {
    expect(result[ResultConstants.SUCCESS]).toBe(true);
  });
};

describe('When creating a result, it', function() {
  src.test.control.messageBox.whenCreatingAResult.describe();
});
