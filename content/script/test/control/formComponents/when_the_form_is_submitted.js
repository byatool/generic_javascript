goog.require('goog.string');
goog.require('src.base.control.formComponent');

goog.provide('src.test.control.formComponent.whenTheFormIsSubmitted');

/**
 @export
 */
src.test.control.formComponent.whenTheFormIsSubmitted.describe = function() {
  //Fields
  var FormComponent = src.base.control.formComponent;
  var FormAction = goog.string.getRandomString();

  var _button;
  var _form;
  var _createTheResult;
  var _messageBox;
  var _retrieveFormValues;
  var _showElement;
  var _submitCallback;
  var _submitTheData;
  var _toBeEnabled;
  var _updateMessageBox;
  var _validateAllValues;


  //Test Hooks
  beforeEach(function() {
    _form = {'action': FormAction};
    _messageBox = {};
    _submitCallback = {};
    _button = {};
    _retrieveFormValues = function() { return {}; };
    _validateAllValues = function() { return []; };
    _createTheResult = function() { return {}; };
    _updateMessageBox = function() { };
    _showElement = function() {};
    _submitTheData = function() {};
    _toBeEnabled = function() {};
  });

  //Support Methods
  var callMethod = function() {
    FormComponent.handleSubmit(_form, _messageBox, _button, _retrieveFormValues, _validateAllValues, _createTheResult, _updateMessageBox, _showElement, _toBeEnabled, _submitTheData, _submitCallback);
  };


  //Test Methods

  it('should disable the submit button.', function() {
    var methodWasCalled = false;

    _toBeEnabled = function(theButton, toEnable) {
      methodWasCalled = theButton === _button &&
        toEnable === false;
    };

    callMethod();

    expect(methodWasCalled).toBe(true);
  });

  it('should get the data from the form.', function() {
    var methodWasCalled = false;

    _retrieveFormValues = function(formToCheck) {
      methodWasCalled = formToCheck === _form;

      return _form;
    };
    //goog.dom.forms.getFormDataMap
    callMethod();

    expect(methodWasCalled).toBe(true);
  });


  it('should validate the data.', function() {
    var methodWasCalled = false;
    var data = {};

    _retrieveFormValues = function() {
      return data;
    };

    _validateAllValues = function(toValidate) {
      methodWasCalled = toValidate === data;
    };

    callMethod();

    expect(methodWasCalled).toBe(true);
  });


  it('should create a result to send to the message box.', function() {
    var methodWasCalled = false;
    var errors = ['ads'];

    _validateAllValues = function() {
      return errors;
    };

    _createTheResult = function(list, success) {
      methodWasCalled = list === errors && !success;
    };

    callMethod();

    expect(methodWasCalled).toBe(true);
  });


  it('should update the message box.', function() {
    var methodWasCalled = false;
    var result = {};

    _validateAllValues = function() {
      return ['ad'];
    };

    _createTheResult = function() {
      return result;
    };

    _updateMessageBox = function(messageBox, resultToCheck) {
      methodWasCalled = resultToCheck === result && messageBox === _messageBox;
    };

    callMethod();

    expect(methodWasCalled).toBe(true);
  });


  it('should show the message box when there are errors.', function() {
    var methodWasCalled = false;

    _validateAllValues = function() {
      return ['ad'];
    };

    _showElement = function(element, show) {
      methodWasCalled = element === _messageBox && show;
    };

    callMethod();
    expect(methodWasCalled).toBe(true);
  });


  it('should hide the message box if there are no errors.', function() {
    var methodWasCalled = false;


    _showElement = function(element, show) {
      methodWasCalled = element === _messageBox && !show;
    };

    callMethod();

    expect(methodWasCalled).toBe(true);
  });

  it('should submit the data if there are no errors.', function() {
    var methodWasCalled = false;
    var data = {};

    _retrieveFormValues = function() {
      return data;
    };

    _submitTheData = function(dataToSend, callBack) {
      methodWasCalled = data === dataToSend && callBack == _submitCallback;
    };

    callMethod();

    expect(methodWasCalled).toBe(true);
  });


  it('should not submit the data if there are errors', function() {
    var methodWasCalled = false;

    _validateAllValues = function() {
      return ['daf'];
    };

    _submitTheData = function() {
      methodWasCalled = true;
    };

    callMethod();

    expect(methodWasCalled).toBe(false);
  });





  it('should add the action to the values', function() {
    var methodWasCalled = false;
    var actionToFind = 'asdf';

    _submitTheData = function(values) {
      methodWasCalled = values.action === _form.action;
    };

    callMethod();

    expect(methodWasCalled).toBe(true);
  });
};

describe('When the form is submitted, it', function() {
  src.test.control.formComponent.whenTheFormIsSubmitted.describe();
});
