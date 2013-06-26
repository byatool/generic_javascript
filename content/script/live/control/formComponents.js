goog.require('goog.array');
goog.require('goog.dom');
goog.require('goog.dom.forms');
goog.require('goog.style');
goog.require('goog.window');
goog.require('src.base.control.messageBox');
goog.require('src.base.control.popupDatePicker');
goog.require('src.base.helper.constants');
goog.require('src.base.helper.domHelper');
goog.require('src.base.helper.events');

goog.provide('src.base.control.formComponent');


/**
 @const
 @type {string}
 @export
 */
src.base.control.formComponent.AutoFillUrl = 'autoFillUrl';


/**
 @const
 @type {string}
 @export
 */
src.base.control.formComponent.AutoFillParameters = 'autoFillParameters';

/**
 @const
 @type {string}
 @export
 */
src.base.control.formComponent.ButtonClass = 'submitButton';


/**
 @const
 @type {string}
 @export
 */
src.base.control.formComponent.DatepickerTextboxes = 'text';


/**
 @const
 @type {string}
 @export
 */
src.base.control.formComponent.DatepickerOptions = 'options';


/**
 @const
 @type {string}
 @export
 */
src.base.control.formComponent.MessageBoxSuffix = '_messageBox';


/**
 @const
 @type {string}
 @export
 */
src.base.control.formComponent.MessageItems = 'MessageItems';


/**
 @const
 @type {string}
 @export
 */
src.base.control.formComponent.RedirectUrl = 'RedirectUrl';


/**
 @const
 @type {string}
 @export
 */
src.base.control.formComponent.ErrorType = 0;


/* Support Methods */

/**
 @param {Object} container The form element.
 @param {?function} fillTheElements The method needed to set the form element values.
 @param {?function} setValue The method used to set an element's value.
 @return {function} The method that will be called as the event handler for the data request.
 @protected
 */
src.base.control.formComponent.createTheRetrieveFormDataCallback = function(container, fillTheElements, setValue) {
  return function(result) { return fillTheElements(container, result, setValue); };
};


/**
 @param {Object} container The parent control that holds the rows.
 @param {Object} result The result with the retrieved information.
 @param {?function} setValue The method used to set an element's value.
 @protected
 */
src.base.control.formComponent.fillTheFormElements = function(container, result, setValue) {
  var item = result;
  goog.array.forEach(goog.object.getKeys(item), function(propertyName) {

    var element = goog.dom.findNode(container, function(control) {
      return control['id'] === propertyName;
    });

    setValue(element, item[propertyName]);
  });
};


/**
 @param {Object} result The result from a form submital.
 @param {Object} messageBox The message box container element.
 @param {Object} button The form button to enable.
 @param {function} onClick The function to call after a successful result.
 @param {function} filter This is the filter method to get all the message text.
 @param {function} some A check to see if at least on item matches the comparison.
 @param {function(Array.<string>, boolean) : Object} createAResult The method used to take in
 messages, and create a result for a message box.
 @param {function(Object, Object} updateTheMessageBox The method used to update the message box
 with a failure result.
 @param {function(Object, boolean} showElement The method used to show or hide an element.
 @param {function(Objct, boolean}} toBeEnabled The method used to enable the submit button.
 @param {function(string)} openWindow The method used to redirect.
 */
src.base.control.formComponent.handleCallback = function(result, messageBox, button, onClick, filter, some, createAResult, updateTheMessageBox, showElement, toBeEnabled, openWindow) {
  var Current = src.base.control.formComponent;
  var Constants = src.base.helper.constants;

  if (result[Current.MessageItems].length > 0) {
    var justMessages = filter(result[Current.MessageItems], function(item) {
      return item['Message'];
    });

    var errorsExist = some(result[Current.MessageItems], function(item) {
      return item['MessageType'] === Current.ErrorType;
    });

    if (!errorsExist) {
      onClick();
    }

    updateTheMessageBox(messageBox, createAResult(justMessages, !errorsExist));
    showElement(messageBox, true);
  }
  else {
    openWindow(result[Current.RedirectUrl]);
  }

  toBeEnabled(button, true);
};


/**
 @param {Object} form The parent form.
 @param {Object} messageBox The message box...
 @param {Object} submitButton The button to disable on submittion.
 @param {function(Object) : Object} retrieveFormValues The method to retrieve all values
 from the parent form.
 @param {function(Object) : Array.<string>} validate The method used to validate the form
 values, and return a list of errors if there are any.
 @param {function(Array.<string>, boolean) : Object} createAResult The method used to take in
 messages, and create a result for a message box.
 @param {function(Object, Object} updateTheMessageBox The method used to update the message box
 with a failure result.
 @param {function(Object, boolean} showElement The method used to show or hide an element.
 @param {function(string, bool)}  toBeEnabled This will enable an element if true, otherwise will
 disable.
 @param {function(Object, function(Object)} submitMethod The final method to call when there are no
 errors.
 @param {function(Object)} callBack The method called once the server responds.
 */
src.base.control.formComponent.handleSubmit = function(form, messageBox, submitButton,  retrieveFormValues, validate, createAResult, updateTheMessageBox, showElement, toBeEnabled, submitMethod, callBack) {
  toBeEnabled(submitButton, false);

  var values = retrieveFormValues(form);
  var errors = validate(values);

  if (errors && errors.length > 0) {
    var result = createAResult(errors, false);
    updateTheMessageBox(messageBox, result);
    showElement(messageBox, true);
    toBeEnabled(submitButton, true);
  }
  else {
    showElement(messageBox, false);
    values.action = form.action;
    submitMethod(values, callBack);
  }
};


/**
 @param {string} formId This is the id of the form that will be setup.
 @param {Object} datePickerOptions The options for any created date picker.
 @param {Array.<Array.<string>>} datePickerContainerAndTextboxes The containers to add
 the date pickers to, and the names of each textbox that needs a date picker attached to it.
 @param {string} messageBoxName This is the name of the form's message box..
 @param {function(string) : Object} findElement Method used to find the form..
 @param {function(string) : Object} createAMessageBox The method needed to.
 @param {funtion(string)} addElement Method used to add the message box to the.
 @param {function(Object) : Object} createADatePicker Method used to create a
 datepicker when in conjuction with the datePickerOptions..
 @return {Object} The updated form.
 */
src.base.control.formComponent.setupTheForm = function(formId, datePickerOptions, datePickerContainerAndTextboxes, messageBoxName, findElement, createAMessageBox, addElement, createADatePicker) {
  var Popup = src.base.control.popupDatePicker;

  var ifNullThen = function(toCheck, toSet) {
    return toCheck ? toCheck : toSet;
  };

  var form = findElement(formId);
  var messageBox = createAMessageBox(messageBoxName);
  addElement(form, messageBox);

  //TODO this should probably use a passed in method for testing reasons
  //  src.test.control.formComponent.whenSettingUpAForm
  //   'should create a datepicker for every textbox named'
  //     This is the test for making sure the forEach works.  It does so
  //     by counting the calls to createADatePicker.  That is ok for now...
  goog.array.forEach(datePickerContainerAndTextboxes, function(item) {
    datePickerOptions[Popup.TextboxName] = item[1];
    addElement(findElement(item[0]), createADatePicker(datePickerOptions));
  });

  return {'form': form, 'messageBox': messageBox};
};


/**
 @param {Object} parentForm This is the button holder.
 @param {function} onClick The onClick event hook.
 @param {function} findTheButton The method used to find the button element in the form.
 @param {function} setTheClick The method used to assing onClick to the onClick event.
 */
src.base.control.formComponent.setTheSubmitButton = function(parentForm, onClick, findTheButton, setTheClick) {
  var button = findTheButton(parentForm, src.base.control.formComponent.ButtonClass);
  setTheClick(button, onClick);
};


/* Exports */

/**
 @param {string} formId This is the form that will be updated for submital.
 @param {Object} datePickerOptions The options for any created date picker.
 @param {function} validate The method used for validating the form.
 @param {?Object} autoFillParameters Parameters needed to retrieve the data for a form.
 @param {?function} onClick The method to call when the submit is finished. Not used yet,
 but will be.
 @param {?function(string) : Object} setupTheForm This will find the form,  create a message
 box, append that message box, and return both.
 @param {?function : Object} handleSubmit The method used to create the click event handler.
 @param {?function(Object) : Object} findTheButton The method to find the needed button.
 @param {?function(Object, function())} setClick The method the attach the onClick method to
 the click event.
 @param {?function} getElement Method for getting an element by id.
 @param {?function} createMessageBox Method used to create a message box.
 @param {?function} appendChild Method to add an element to an element.
 @param {?function} createDatepicker Method used to create a date picker popup.
 @param {?function} getFormDataMap Method used to get the data from a form.
 @param {?function} createAResult Method used to create a message result.
 @param {?function} updateMessagesByResult Method used to update a message box.
 @param {?function} showElement Method used to show an element.
 @param {?function} submitData Method used submit the data.
 @param {?function(Object, Object)} setValue The method used to set an element's value.
 @param {?function(Object, function) : function(Object}) createTheRetrieveFormDataCallback This is used to create a
 callback method that only takes in a result, and uses closures for other information.
 @param {?function} fillTheRows The method used to handle the async response, and to fill
 the rows.
 @param {?function(string, Object, function)} submitAutoFill The method used to retrieve
 the data for the form elements.
 @export
 */
src.base.control.formComponent.initialize = function(formId, datePickerOptions, validate, autoFillParameters,
                                                     onClick, setupTheForm, handleSubmit, findTheButton, setClick,
                                                     getElement, createMessageBox, appendChild, createDatepicker,
                                                     getFormDataMap, createAResult, updateMessagesByResult,
                                                     showElement, submitData, setValue,
                                                     createTheRetrieveFormDataCallback, fillTheRows,
                                                     submitAutoFill) {
  var Current = src.base.control.formComponent;
  var DomHelper = src.base.helper.domHelper;
  var MessageBox = src.base.control.messageBox;

  setupTheForm = setupTheForm ? setupTheForm : Current.setupTheForm;
  getElement = getElement ? getElement : goog.dom.getElement;
  createMessageBox = createMessageBox ? createMessageBox : MessageBox.createMessageBox;
  appendChild = appendChild ? appendChild : goog.dom.appendChild;
  createDatepicker = createDatepicker ? createDatepicker : src.base.control.popupDatePicker.create;
  //Autofill
  setValue = setValue ? setValue : goog.dom.forms.setValue;
  createTheRetrieveFormDataCallback = createTheRetrieveFormDataCallback ? createTheRetrieveFormDataCallback : Current.createTheRetrieveFormDataCallback;
  fillTheRows = fillTheRows ? fillTheRows : Current.fillTheFormElements;
  submitAutoFill = submitAutoFill ? submitAutoFill : src.base.helper.domHelper.submitToUrl;
  //Submit handling
  handleSubmit = handleSubmit ? handleSubmit : Current.handleSubmit;
  getFormDataMap = getFormDataMap ? getFormDataMap : goog.dom.forms.getFormDataMap;
  validate = validate ? validate : Current.Validate;
  createAResult = createAResult ? createAResult : MessageBox.createAResult;
  updateMessagesByResult = updateMessagesByResult ? updateMessagesByResult : MessageBox.updateMessagesByResult;
  showElement = showElement ? showElement : goog.style.showElement;
  submitData = submitData ? submitData : DomHelper.submitData;



  /* Actual Code */

  var setupItems = setupTheForm(formId,
                                datePickerOptions[Current.DatepickerOptions],
                                datePickerOptions[Current.DatepickerTextboxes],
                                formId + Current.MessageBoxSuffix,
                                getElement,
                                createMessageBox,
                                appendChild,
                                createDatepicker);

  if (autoFillParameters) {
    var callBackToHandleReturnedFormData = createTheRetrieveFormDataCallback(setupItems['form'], fillTheRows, setValue);
    submitAutoFill(autoFillParameters[Current.AutoFillUrl], autoFillParameters[Current.AutoFillParameters], callBackToHandleReturnedFormData);
  }

  var handleCallback = Current.handleCallback;

  findTheButton = findTheButton ? findTheButton : goog.dom.getElementByClass;
  var button = findTheButton(Current.ButtonClass, setupItems['form']);

  //Can't test...
  //Export this out to a method that creates a method?
  var whenFinished = function(formResult) {
    handleCallback(formResult,
                   setupItems['messageBox'],
                   button,
                   onClick,
                   goog.array.map,    //This needs to be added to the method signature.
                   goog.array.some,
                   createAResult,
                   updateMessagesByResult,
                   showElement,
                   src.base.helper.domHelper.toBeEnabled,
                   function(url) {window.location = url;});
  };


  //Can't test...
  //Export this out to a method that creates a method?
  var whenClicked = function() {
    handleSubmit(setupItems['form'],
                 setupItems['messageBox'],
                 button,
                 getFormDataMap,
                 validate,
                 createAResult,
                 updateMessagesByResult,
                 showElement,
                 src.base.helper.domHelper.toBeEnabled,
                 submitData,
                 whenFinished);
  };

  setClick = setClick ? setClick : src.base.helper.events.setClick;
  setClick(button, whenClicked);

};

