goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('src.base.control.popupDatePicker');

goog.provide('src.test.control.popupDatePicker.whenCreatingAPopupDatePicker');

/**
 @export
 */
src.test.control.popupDatePicker.whenCreatingAPopupDatePicker.describe = function() {
  //Fields
  var Popup = src.base.control.popupDatePicker;

  var ButtonClass = goog.string.getRandomString();
  var ButtonText = goog.string.getRandomString();
  var ContainerClass = goog.string.getRandomString();
  var DatePickerClass = goog.string.getRandomString();
  var PopupClass = goog.string.getRandomString();
  var TextboxName = goog.string.getRandomString();

  var appendChild_;
  var control_;
  var createTheDatePicker_;
  var createThePopup_;
  var fakeDatePicker_;
  var fakeDatePickerDomObject_;
  var fakePopup_;
  var options_;
  var setTheEvent_;
  var setTheDatePickerEvent_;
  var showPopup_;

  //Test Hooks
  beforeEach(function() {
    options_ = {};

    options_[Popup.ButtonClass] = ButtonClass;
    options_[Popup.ButtonText] = ButtonText;
    options_[Popup.ContainerClass] = ContainerClass;
    options_[Popup.DatePickerClass] = DatePickerClass;
    options_[Popup.PopupClass] = PopupClass;
    options_[Popup.TextboxName] = TextboxName;

    appendChild_ = function() {};

    fakePopup_ = {};
    fakePopup_['element_'] = {};
    fakeDatePicker_ = {};
    fakeDatePickerDomObject_ = {};

    createThePopup_ = function() {return fakePopup_; };
    createTheDatePicker_ = function() { return [fakeDatePicker_, fakeDatePickerDomObject_]; };
    setTheEvent_ = function() {};
    setTheDatePickerEvent_ = function() {};
    showPopup_ = function() {};
  });

  //Support Methods

  var callTheMethod = function() {
    control_ = Popup.create(options_, appendChild_, createThePopup_, createTheDatePicker_, setTheEvent_,
                            setTheDatePickerEvent_, showPopup_);
  };

  //Test Methods

  it('should create the parent container.', function() {
    callTheMethod();

    expect(control_ && goog.dom.classes.has(control_, ContainerClass) ? true : false).toBe(true);
  });


  it('should add a button.', function() {
    var calledCount = 0;

    appendChild_ = function(parent, child) {
      if (calledCount === 0 &&
          child.tagName === 'BUTTON' &&
          child.type === 'button' &&
          child.innerText === options_[Popup.ButtonText] &&
          goog.dom.classes.has(child, ButtonClass))
      {
        calledCount += 1;
      }
    };

    callTheMethod();
    expect(calledCount).toBe(1);
  });


  it('should create the popup.', function() {
    var methodWasCalled = false;

    createThePopup_ = function(cssClass) {

      methodWasCalled = cssClass === PopupClass;
      return fakePopup_;
    };

    callTheMethod();
    expect(methodWasCalled).toBe(true);
  });


  it('should create the date picker', function() {
    var methodWasCalled = false;

    createTheDatePicker_ = function(cssClass) {
      methodWasCalled = cssClass === DatePickerClass;
      return [fakeDatePicker_, fakeDatePickerDomObject_];
    };

    callTheMethod();

    expect(methodWasCalled).toBe(true);
  });


  it('should set the change event for the date picker.', function() {
    var methodWasCalled = false;

    setTheDatePickerEvent_ = function(datePicker, textboxName) {
      methodWasCalled = datePicker === fakeDatePickerDomObject_ &&
        textboxName === options_[Popup.TextboxName];
    };

    callTheMethod();
    expect(methodWasCalled).toBe(true);
  });

  it('should set the click event to show the popup.', function() {
    var methodWasCalled = false;

    setTheEvent_ = function(element, method) {

      methodWasCalled = goog.dom.classes.has(element, ButtonClass) &&
        method ? true : false;
    };

    callTheMethod();

    expect(methodWasCalled).toBe(true);
  });


  it('should add the date picker to the popup element.', function() {
    var calledCount = 0;

    appendChild_ = function(parent, child) {
      if (calledCount === 0 &&
          parent === fakePopup_['element'] &&
          child === fakeDatePicker_)
      {
        calledCount += 1;
      }
    };

    callTheMethod();

    expect(calledCount).toBe(1);
  });


  it('should add the click control to the main control.', function() {
    var calledCount = 0;

    appendChild_ = function(parent, child) {
      if (calledCount === 0 &&
          goog.dom.classes.has(parent, ContainerClass) &&
          child.type &&
          child.type === 'button')

      {
        calledCount += 1;
      }
    };

    callTheMethod();

    expect(calledCount).toBe(1);
  });


  it('should add the popup to the main container', function() {
    var calledCount = 0;

    appendChild_ = function(parent, child) {
      if (calledCount === 0 &&
          parent &&
          parent.className &&
          goog.dom.classes.has(parent, ContainerClass) &&
          child === fakePopup_['element'])
      {
        calledCount += 1;
      }
    };

    callTheMethod();

    expect(calledCount).toBe(1);
  });

};

describe('When creating a popup date picker, it', function() {
  src.test.control.popupDatePicker.whenCreatingAPopupDatePicker.describe();
});
