goog.require('goog.string');
goog.require('src.base.control.formComponent');
goog.require('src.base.control.popupDatePicker');

goog.provide('src.test.control.formComponent.whenSettingUpAForm');

/**
 @export
 */
src.test.control.formComponent.whenSettingUpAForm.describe = function() {
  //Fields
  var Current = src.base.control.formComponent;
  var Popup = src.base.control.popupDatePicker;

  var ContainerOne = goog.string.getRandomString();
  var ContainerTwo = goog.string.getRandomString();
  var FormId = goog.string.getRandomString();
  var MessageBoxId = goog.string.getRandomString();
  var TextboxOne = goog.string.getRandomString();
  var TextboxTwo = goog.string.getRandomString();

  var addElement_;
  var createADatePicker_;
  var createMessageBox_;
  var datePickerOptions_;
  var findElement_;
  var form_;
  var messageBox_;
  var textboxes_;


  //Test Hooks
  beforeEach(function() {
    findElement_ = function() { return form_; };
    createMessageBox_ = function() { return messageBox_; };
    addElement_ = function() { };

    createADatePicker_ = function() { return {}; };
    datePickerOptions_ = {};
    datePickerOptions_[Popup.TextboxName] = '';
    textboxes_ = [[ContainerOne, TextboxOne], [ContainerTwo, TextboxTwo]];

    form_ = {};
    messageBox_ = {};
  });


  var callTheMethod_ = function() {
    return Current.setupTheForm(FormId, datePickerOptions_, textboxes_, MessageBoxId, findElement_, createMessageBox_, addElement_, createADatePicker_);
  };

  //Support Methods

  //Test Methods

  it('should find the form.', function() {
    var methodWasCalled = false;

    findElement_ = function(formId) {
      if (!methodWasCalled) {
        methodWasCalled = formId === FormId;
      }

      return {};
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should create a message box.', function() {
    var methodWasCalled = false;

    createMessageBox_ = function(messageBoxId) {

      methodWasCalled = messageBoxId === MessageBoxId;

    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should add the message box to the form.', function() {
    var methodWasCalled = false;

    addElement_ = function(formToCheck, messageBoxToCheck) {
      if (!methodWasCalled) {
        methodWasCalled = formToCheck === form_ && messageBoxToCheck === messageBox_;
      }
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should create a datepicker for every textbox named.', function() {
    var calledCount = 0;

    createADatePicker_ = function(options) {
      if (options[Popup.TextboxName] === TextboxOne ||
          options[Popup.TextboxName] === TextboxTwo)
      {
        calledCount += 1;
      }
    };

    callTheMethod_();

    expect(calledCount).toBe(2);
  });


  it('should find every date picker parent container.', function() {
    var calledCount = 0;

    findElement_ = function(elementId) {
      if (elementId === ContainerOne || elementId === ContainerTwo) {
        calledCount = 2;
      }

      return {};
    };

    callTheMethod_();
    expect(calledCount).toBe(2);//
  });



  it('should append the date pickers to their respective containers.', function() {
    var calledCount = 0;
    var containerOne = {};
    var containerTwo = {};
    var fakeNameProperty = 'fakeName';

    findElement_ = function(elementId) {
      return elementId === ContainerOne ? containerOne :
        elementId === ContainerTwo ? containerTwo :
        {};
    };

    createADatePicker_ = function(options) {
      var datePicker = {};
      datePicker[fakeNameProperty] = options[Popup.TextboxName];
      return datePicker;
    };

    addElement_ = function(parent, child) {

      var itIsAMatch = function(container, texboxName) {
        return parent === container &&
          child[fakeNameProperty] &&
          child[fakeNameProperty] === texboxName;
      };

      if (itIsAMatch(containerOne, TextboxOne) ||
          itIsAMatch(containerTwo, TextboxTwo))
      {
        calledCount += 1;
      }
    };

    callTheMethod_();

    expect(calledCount).toBe(2);
  });


  it('should return the message box and form.', function() {
    expect(callTheMethod_()['form']).toBe(form_);
    expect(callTheMethod_()['messageBox']).toBe(messageBox_);
  });
};

describe('When setting up a form, it', function() {
  src.test.control.formComponent.whenSettingUpAForm.describe();
});
