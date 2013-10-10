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
  
  var button_;
  var _form;
  var _createTheResult;
  var _messageBox;
  var _retrieveFormValues;
  var _showElement;
  var _submitCallback;
  var _submitTheData;
  var toBeEnabled_;
  var _updateMessageBox;
  var validateAllValues_;
  
  
  //Test Hooks
  beforeEach(function() {
    _form = {'action': FormAction};
    _messageBox = {};
    _submitCallback = {};
    button_ = {};
    _retrieveFormValues = function() { return {}; };
    validateAllValues_ = function() { return []; };
    _createTheResult = function() { return {}; };
    _updateMessageBox = function() { };
    _showElement = function() {};
    _submitTheData = function() {};
    toBeEnabled_ = function() {};
  });
  
  //Support Methods
  var callTheMethod_ = function() {
    FormComponent.handleSubmit(_form, _messageBox, button_, _retrieveFormValues, validateAllValues_, _createTheResult, _updateMessageBox, _showElement, toBeEnabled_, _submitTheData, _submitCallback);
  };
  
  
  //Test Methods
  
  it('should disable the submit button.', function() {
    var methodWasCalled = false;
    
    toBeEnabled_ = function(theButton, toEnable) {
      methodWasCalled = theButton === button_ &&
        toEnable === false;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  it('should get the data from the form.', function() {
    var methodWasCalled = false;
    
    _retrieveFormValues = function(formToCheck) {
      methodWasCalled = formToCheck === _form;
      
      return _form;
    };
    //goog.dom.forms.getFormDataMap
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should validate the data.', function() {
    var methodWasCalled = false;
    var data = {};
    
    _retrieveFormValues = function() {
      return data;
    };
    
    validateAllValues_ = function(toValidate) {
      methodWasCalled = toValidate === data;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create a result to send to the message box.', function() {
    var methodWasCalled = false;
    var errors = ['ads'];
    
    validateAllValues_ = function() {
      return errors;
    };
    
    _createTheResult = function(list, success) {
      methodWasCalled = list === errors && !success;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should enable the submit button on validation errors.', function() {
    var methodWasCalled = false;
    
    validateAllValues_ = function() {
      return ['asd'];
    };
    
    toBeEnabled_ = function(button, enable) {
      methodWasCalled = button === button_ &&
        enable;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  
  it('should update the message box.', function() {
    var methodWasCalled = false;
    var result = {};
    
    validateAllValues_ = function() {
      return ['ad'];
    };
    
    _createTheResult = function() {
      return result;
    };
    
    _updateMessageBox = function(messageBox, resultToCheck) {
      methodWasCalled = resultToCheck === result && messageBox === _messageBox;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should show the message box when there are errors.', function() {
    var methodWasCalled = false;
    
    validateAllValues_ = function() {
      return ['ad'];
    };
    
    _showElement = function(element, show) {
      methodWasCalled = element === _messageBox && show;
    };
    
    callTheMethod_();
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should hide the message box if there are no errors.', function() {
    var methodWasCalled = false;
    
    
    _showElement = function(element, show) {
      methodWasCalled = element === _messageBox && !show;
    };
    
    callTheMethod_();
    
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

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should not submit the data if there are errors', function() {
    var methodWasCalled = false;

    validateAllValues_ = function() {
      return ['daf'];
    };

    _submitTheData = function() {
      methodWasCalled = true;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(false);
  });





  it('should add the action to the values', function() {
    var methodWasCalled = false;
    var actionToFind = 'asdf';

    _submitTheData = function(values) {
      methodWasCalled = values.action === _form.action;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });
};

describe('When the form is submitted, it', function() {
  src.test.control.formComponent.whenTheFormIsSubmitted.describe();
});
