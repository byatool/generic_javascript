goog.require('goog.dom');
goog.require('src.base.control.messageBox');
goog.require('src.base.helper.constants');

goog.provide('src.test.control.messageBox.whenSettingTheAppearanceOfAMessageBoxBasedOnAResult');

/**
 @export
 */
src.test.control.messageBox.whenSettingTheAppearanceOfAMessageBoxBasedOnAResult.describe = function() {
  //Import
  var Constants = src.base.helper.constants.result;
  var Current = src.base.control.messageBox;

  //Fields
  var addRemoveClass_;
  var divToChange_;
  var result_;


  //Test Hooks
  beforeEach(function() {
    divToChange_ = {};
    result_ = {};
  });


  //Support Methods
  var callTheMethod_ = function() {
    Current.setTheAppearanceByResult(divToChange_, result_, addRemoveClass_);
  };


  //Test Methods

  it('should change the class from error to info', function() {
    var methodWasCalled = false;

    result_[Constants.SUCCESS] = true;

    addRemoveClass_ = function(element, from, to) {
      methodWasCalled = element === divToChange_ &&
        from === 'error' &&
        to === 'info';
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });

  it('should change the class from info to error', function() {
    var methodWasCalled = false;

    result_[Constants.SUCCESS] = false;

    addRemoveClass_ = function(element, from, to) {
      methodWasCalled = element === divToChange_ &&
        from === 'info' &&
        to === 'error';
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });

};

describe('When setting the appearance of a message box based on a result, it', function() {
  src.test.control.messageBox.whenSettingTheAppearanceOfAMessageBoxBasedOnAResult.describe();
});
