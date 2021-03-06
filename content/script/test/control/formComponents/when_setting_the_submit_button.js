goog.require('src.base.control.formComponent');

goog.provide('src.test.control.formComponent.whenSettingTheSubmitButton');

/**
 @export
 */
src.test.control.formComponent.whenSettingTheSubmitButton.describe = function() {
  //Fields
  var Current = src.base.control.formComponent;

  var findTheButton_;
  var form_;
  var onClick_;
  var setTheClick_;



  //Test Hooks
  beforeEach(function() {
    form_ = {};

    findTheButton_ = function() { };
    onClick_ = function() { };
    setTheClick_ = function() { };
  });

  //Support Methods

  var callTheMethod_ = function() {
    Current.setTheSubmitButton(form_, onClick_, findTheButton_, setTheClick_);
  };


  //Test Methods

  it('should find the button', function() {
    var button = {};
    var methodWasCalled = false;

    findTheButton_ = function(form, buttonClass) {
      methodWasCalled = form === form_ && buttonClass === Current.ButtonClass;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should set the click hook.', function() {
    var methodWasCalled = false;

    var button = {};
    findTheButton_ = function() {
      return button;

    };

    setTheClick_ = function(buttonToSet, onClick) {
      methodWasCalled = buttonToSet === button && onClick === onClick_;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });
};

describe('When setting the submit button, it', function() {
  src.test.control.formComponent.whenSettingTheSubmitButton.describe();
});
