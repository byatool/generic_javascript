goog.require('goog.string');
goog.require('src.base.control.refreshPair');
goog.require('src.base.helper.domCreation');

goog.provide('src.test.control.refreshPair.whenCreatingTheUrlSubmitHandler');

/**
 @export
 */
src.test.control.refreshPair.whenCreatingTheUrlSubmitHandler.describe = function() {
  //Using
  var Current_ = src.base.control.refreshPair;


  //Fields

  var ResultValue_ = goog.string.getRandomString();

  var elementToUpdate_;
  var setValue_;

  //Test Hooks
  beforeEach(function() {
    elementToUpdate_ = src.base.helper.domCreation.textbox();
    setValue_ = function() {};

  });


  //Support Methods
  var callTheMethod_ = function() {
    return Current_.createTheUrlSubmitHandler(elementToUpdate_, setValue_)(ResultValue_);
  };


  //Test Methods


  it('should set the elementValue.', function() {
    var methodWasCalled = false;
    setValue_ = function(element, value) {
      methodWasCalled = element === elementToUpdate_ &&
        value === ResultValue_;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


};


describe('When creating the url submit handler, it', function() {
  src.test.control.refreshPair.whenCreatingTheUrlSubmitHandler.describe();
});






