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
 @param {Object} result The result from a form submital.
 @param {Object} messageBox The message box container element.
 @param {function} filter This is the filter method to get all the message text.
 @param {function(Array.<string>, boolean) : Object} createAResult The method used to take in
 messages, and create a result for a message box.
 @param {function(Object, Object} updateTheMessageBox The method used to update the message box
 with a failure result.
 @param {function(Object, boolean} showElement The method used to show or hide an element.
 @param {function(string)} openWindow The method used to redirect.
 */
src.base.control.formComponent.handleCallback = function(result, messageBox, filter, createAResult, updateTheMessageBox, showElement, openWindow) {
  var Current = src.base.control.formComponent;
  var Constants = src.base.helper.constants;

  if (result[Current.MessageItems].length > 0) {
    var justMessages = filter(result[Current.MessageItems], function(item) {
      return item['Message'];
    });

    updateTheMessageBox(messageBox, createAResult(justMessages));
    showElement(messageBox, true);
  }
  else {
    openWindow(result[Current.RedirectUrl]);
  }
};


/**
 @param {Object} form The parent form.
 @param {Object} messageBox The message box...
 @param {function(Object) : Object} retrieveFormValues The method to retrieve all values
 from the parent form.
 @param {function(Object) : Array.<string>} validate The method used to validate the form
 values, and return a list of errors if there are any.
 @param {function(Array.<string>, boolean) : Object} createAResult The method used to take in
 messages, and create a result for a message box.
 @param {function(Object, Object} updateTheMessageBox The method used to update the message box
 with a failure result.
 @param {function(Object, boolean} showElement The method used to show or hide an element.
 @param {function(Object, function(Object)} submitMethod The final method to call when there are no
 errors.
 @param {function(Object)} callBack The method called once the server responds.
 */
src.base.control.formComponent.handleSubmit = function(form, messageBox, retrieveFormValues, validate, createAResult, updateTheMessageBox, showElement, submitMethod, callBack) {
  var values = retrieveFormValues(form);
  var errors = validate(values);

  if (errors && errors.length > 0) {
    var result = createAResult(errors, false);
    updateTheMessageBox(messageBox, result);
    showElement(messageBox, true);
  }
  else {
    showElement(messageBox, false);
    values.action = form.action;


    submitMethod(values, callBack);
  }
};


/**
 @param {string} formId This is the form that will be updated for submital.
 @param {Object} datePickerOptions The options for any created date picker.
 @param {function} validate The method used for validating the form.
 @param {function} onClick The method to call when the submit is finished.
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
 @export
 */
src.base.control.formComponent.initialize = function(formId, datePickerOptions, validate, onClick,
                                                     setupTheForm, handleSubmit, findTheButton, setClick,
                                                     getElement, createMessageBox, appendChild, createDatepicker,
                                                     getFormDataMap, createAResult, updateMessagesByResult,
                                                     showElement, submitData) {
  var Current = src.base.control.formComponent;
  var DomHelper = src.base.helper.domHelper;
  var MessageBox = src.base.control.messageBox;
  
  setupTheForm = setupTheForm ? setupTheForm : Current.setupTheForm;
  getElement = getElement ? getElement : goog.dom.getElement;
  createMessageBox = createMessageBox ? createMessageBox : MessageBox.createMessageBox;
  appendChild = appendChild ? appendChild : goog.dom.appendChild;
  createDatepicker = createDatepicker ? createDatepicker : src.base.control.popupDatePicker.create;
  
  var setupItems = setupTheForm(formId,
                                datePickerOptions[Current.DatepickerOptions],
                                datePickerOptions[Current.DatepickerTextboxes],
                                formId + Current.MessageBoxSuffix,
                                getElement,
                                createMessageBox,
                                appendChild,
                                createDatepicker
                               );
  
  
  handleSubmit = handleSubmit ? handleSubmit : Current.handleSubmit;
  getFormDataMap = getFormDataMap ? getFormDataMap : goog.dom.forms.getFormDataMap;
  validate = validate ? validate : Current.Validate;
  createAResult = createAResult ? createAResult : MessageBox.createAResult;
  updateMessagesByResult = updateMessagesByResult ? updateMessagesByResult : MessageBox.updateMessagesByResult;
  showElement = showElement ? showElement : goog.style.showElement;
  submitData = submitData ? submitData : DomHelper.submitData;
  
  var handleCallback = Current.handleCallback;
  
  //Can't test...
  //Export this out to a method that creates a method?
  var whenFinished = function(formResult) {
    handleCallback(formResult,
                   setupItems['messageBox'],
                   goog.array.map,    //This needs to be added to the method signature.
                   createAResult,
                   updateMessagesByResult,
                   showElement,
                   function(url) {window.location = url;});
  };


  //Can't test...
  //Export this out to a method that creates a method?
  var whenClicked = function() {
    handleSubmit(setupItems['form'],
                 setupItems['messageBox'],
                 getFormDataMap,
                 validate,
                 createAResult,
                 updateMessagesByResult,
                 showElement,
                 submitData,
                 whenFinished);
  };
  
  findTheButton = findTheButton ? findTheButton : goog.dom.getElementByClass;
  var button = findTheButton(Current.ButtonClass, setupItems['form']);

  setClick = setClick ? setClick : src.base.helper.events.setClick;
  setClick(button, whenClicked);

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
