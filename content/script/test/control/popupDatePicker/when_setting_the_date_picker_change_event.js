goog.require('goog.string');
goog.require('src.base.control.popupDatePicker');

goog.provide('src.test.control.popupDatePicker.whenSettingTheDatePickerChangeEvent');

/**

 @export
 */
src.test.control.popupDatePicker.whenSettingTheDatePickerChangeEvent.describe = function() {
  //Fields
  var ChangeType = goog.string.getRandomString();
  var Popup = src.base.control.popupDatePicker;
  var TextboxName = goog.string.getRandomString();


  var datePicker_;
  var findElement_;
  var listen_;
  var setValue_;
  var textbox_;

  //Test Hooks
  beforeEach(function() {

      findElement_ = function() { {} };
      listen_ = function() {};
      setValue_ = function() {};

      datePicker_ = {};
      textbox_ = {};
    });

    //Support Methods

    var callTheMethod = function() {
      Popup.setTheDatePickerEvent(datePicker_, TextboxName, findElement_, listen_, ChangeType, setValue_);
    };

    //Test Methods
  it('should find the textbox.', function() {
    var methodWasCalled = false;

    findElement_ = function(textboxName) {
      methodWasCalled = textboxName === TextboxName;
      return {};
    };

    callTheMethod();
      expect(methodWasCalled).toBe(true);

  });

  it('should set using the listen function.', function() {
    var methodWasCalled = false;

    listen_ = function(datePicker, changeType, setValue) {
      methodWasCalled = datePicker === datePicker_ &&
          changeType === ChangeType;
    };

    callTheMethod();

    expect(methodWasCalled).toBe(true);
  });
};

describe('When setting the date picker change event, it', function() {
  src.test.control.popupDatePicker.whenSettingTheDatePickerChangeEvent.describe();
});

