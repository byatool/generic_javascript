goog.require('goog.array');
goog.require('goog.dom');
goog.require('goog.dom.forms');
goog.require('goog.style');
goog.require('goog.window');
goog.require('src.base.control.formComponent.constant');
goog.require('src.base.control.messageBox');
goog.require('src.base.control.popupDatePicker');
goog.require('src.base.helper.constants');
goog.require('src.base.helper.domHelper');
goog.require('src.base.helper.events');

goog.provide('src.base.control.formComponent');


/* Support Methods */

/**
 @param {Object} container The form element.
 @param {?function} fillTheElements The method needed to set the form element
 values.
 @param {?function} setValue The method used to set an element's value.
 @return {function} The method that will be called as the event handler for
 the data request.
 @protected
 */
src.base.control.formComponent.createTheRetrieveFormDataCallback =
  function(container, fillTheElements, setValue) {
    return function(result) {
      return fillTheElements(container, result, setValue);
    };
  };


/**
 @param {Object} container The parent control that holds the rows.
 @param {Object} result The result with the retrieved information.
 @param {?function} setValue The method used to set an element's value.
 @protected
 */
src.base.control.formComponent.fillTheFormElements =
  function(container, result, setValue, forEach,
           getKeys, findNode) {
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
 @param {Object} form The form the result belongs to.
 @param {Object} messageBox The message box container element.
 @param {Object} button The form button to enable.
 @param {boolean} shouldResetFormOnSuccess This toggles whether to reset the form on success.
 @param {function} onClick The function to call after a successful result.
 @param {function} filter This is the filter method to get all the message text.
 @param {function} some A check to see if at least on item matches the comparison.
 @param {function} createAResult The method used to take in
 messages, and create a result for a message box.
 @param {function} updateTheMessageBox The method used to update the message box
 with a failure result.
 @param {function} showElement The method used to show or hide an element.
 @param {function} toBeEnabled The method used to enable the submit button.
 @param {function} resetTheForm The function used to reset the form on success if directed to.
 @param {function} openWindow The method used to redirect.
 */
src.base.control.formComponent.handleCallback =
  function(result, form, messageBox, button, shouldResetFormOnSuccess,
           onClick, filter, some, createAResult, updateTheMessageBox,
           showElement, toBeEnabled, resetTheForm, openWindow) {
    
    var Constant_ = src.base.control.formComponent.constant;
    
    
    if (result[Constant_.MessageItems].length > 0) {
      var justMessages = filter(result[Constant_.MessageItems], function(item) {
        return item['Message'];
      });
      
      var errorsExist = some(result[Constant_.MessageItems], function(item) {
        return item['MessageType'] === Constant_.ErrorType;
      });
      
      if (!errorsExist) {
        onClick();
      }
      
      if (!errorsExist && shouldResetFormOnSuccess) {
        resetTheForm(form);
      }
      
      updateTheMessageBox(messageBox, createAResult(justMessages, !errorsExist));
      showElement(messageBox, true);
    }
    else {
      openWindow(result[Constant_.RedirectUrl]);
    }
    
    toBeEnabled(button, true);
  };


/**
 @param {Object} form The parent form.
 @param {Object} messageBox The message box...
 @param {Object} submitButton The button to disable on submittion.
 @param {function} retrieveFormValues The method to retrieve all values
 from the parent form.
 @param {function} validate The method used to validate the form
 values, and return a list of errors if there are any.
 @param {function} createAResult The method used to take in
 messages, and create a result for a message box.
 @param {function} updateTheMessageBox The method used to update the message box
 with a failure result.
 @param {function} showElement The method used to show or hide an element.
 @param {function}  toBeEnabled This will enable an element if true, otherwise will
 disable.
 @param {function} submitMethod The final method to call when there are no
 errors.
 @param {function} callBack The method called once the server responds.
 */
src.base.control.formComponent.handleSubmit =
  function(form, messageBox, submitButton,  retrieveFormValues,
           validate, createAResult, updateTheMessageBox, showElement,
           toBeEnabled, submitMethod, callBack) {
    
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
 @param {string} formId This is the id of the form that will be
 setup.
 @param {Object} datePickerOptions The options for any created
 date picker.
 @param {Array.<Array.<string>>} datePickerContainerAndTextboxes The
 containers to add
 the date pickers to, and the names of each textbox that needs a
 date picker attached to it.
 @param {string} messageBoxName This is the name of the form's
 message box.
 @param {function} findElement Method used to find the form.
 @param {function} findNode The function used to find the
 date picker container.
 @param {function} createAMessageBox The method needed to.
 @param {funtion} addElement The function used to add the message
 box to the form .
 @param {function} createADatePicker Method used to create a
 datepicker when in conjuction with the datePickerOptions..
 @return {Object} The updated form.
 */
src.base.control.formComponent.setupTheForm =
  function(formId, datePickerOptions, datePickerContainerAndTextboxes,
           messageBoxName, findElement, forEach, findNode, createAMessageBox,
           addElement, createADatePicker) {
    
    var Constant_ =  src.base.control.formComponent.constant;
    var PopupConstant_ = src.base.control.popupDatePicker.constant;
    
    var ifNullThen = function(toCheck, toSet) {
      return toCheck ? toCheck : toSet;
    };
    
    var form = findElement(formId);
    var messageBox = createAMessageBox(messageBoxName);
    addElement(form, messageBox);
    
    forEach(datePickerContainerAndTextboxes, function(item) {
      var container = findNode(form, function(node) {
        return node['id'] === item[0];
      });
      
      datePickerOptions[PopupConstant_.TextboxName] = item[1];
      var datePicker = createADatePicker(datePickerOptions);
      addElement(container, datePicker);
    });
    
    var result = {};
    result[Constant_.Form] = form;
    result[Constant_.MessageBox] = messageBox;
    return result;
  };


/**
 @param {Object} parentForm This is the button holder.
 @param {function} onClick The onClick event hook.
 @param {function} findTheButton The method used to find the button element in the form.
 @param {function} setTheClick The method used to assing onClick to the onClick event.
 */
src.base.control.formComponent.setTheSubmitButton =
  function(parentForm, onClick, findTheButton, setTheClick) {
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
 @param {?function} setupTheForm This will find the form,  create a message
 box, append that message box, and return both.
 @param {?function} handleCallback The function used to after submital.
 @param {?function} handleSubmit The method used to create the click event handler.
 @param {?function} findTheButton The method to find the needed button.
 @param {?function} setClick The method the attach the onClick method to
 the click event.
 @param {?function) createTheRetrieveFormDataCallback This is used to create a
 callback method that only takes in a result, and uses closures for other information.
 @param {?function} submitAutoFill The method used to retrieve
 the data for the form elements.
 @export
 */
src.base.control.formComponent.initialize =
  function(formId, datePickerOptions, validate, autoFillParameters,
           onClick, setupTheForm, handleCallback, handleSubmit,
           findTheButton, setClick, createTheRetrieveFormDataCallback,
           submitAutoFill) {
    
    setupTheForm = setupTheForm ?
      setupTheForm :
      src.base.control.formComponent.setupTheForm;
    
    handleCallback = handleCallback ?
      handleCallback :
      src.base.control.formComponent.handleCallback;
    
    handleSubmit = handleSubmit ?
      handleSubmit :
      src.base.control.formComponent.handleSubmit;
    
    findTheButton = findTheButton ?
      findTheButton : 
      goog.dom.getElementByClass;
    
    setClick = setClick ?
      setClick :
      src.base.helper.events.setClick;
    
    createTheRetrieveFormDataCallback = createTheRetrieveFormDataCallback ?
      createTheRetrieveFormDataCallback :
      src.base.control.formComponent.createTheRetrieveFormDataCallback;
    
    submitAutoFill = submitAutoFill ?
      submitAutoFill :
      src.base.helper.domHelper.submitToUrl;
    
    
    /* Actual Code */
    
    var Constant_ = src.base.control.formComponent.constant;
    var Current_ = src.base.control.formComponent;
    
    var messageBoxName = typeof(formId) === 'string' ?
          formId :
          formId['id'];
    
    // formId, datePickerOptions, datePickerContainerAndTextboxes,
    // messageBoxName, findElement, forEach, findNode, createAMessageBox,
    // addElement, createADatePicker
    
    var setupItems = setupTheForm(formId,
                                  datePickerOptions[Constant_.DatepickerOptions],
                                  datePickerOptions[Constant_.DatepickerTextboxes],
                                  messageBoxName + Constant_.MessageBoxSuffix,
                                  goog.dom.getElement,
                                  goog.array.forEach,
                                  goog.dom.findNode,
                                  src.base.control.messageBox.createMessageBox,
                                  goog.dom.appendChild,
                                  src.base.control.popupDatePicker.create);
    
    if (autoFillParameters) {
      var callBackToHandleReturnedFormData =
            createTheRetrieveFormDataCallback(setupItems[Constant_.Form],
                                              Current_.fillTheFormElements,
                                              goog.dom.forms.setValue);
      
      submitAutoFill(autoFillParameters[Constant_.AutoFillUrl],
                     autoFillParameters[Constant_.AutoFillParameters],
                     callBackToHandleReturnedFormData);
    }
    
    
    var button = findTheButton(Constant_.ButtonClass, setupItems[Constant_.Form]);
    
    //Can't test...
    //Export this out to a method that creates a method?
    var whenFinished = function(formResult) {
      handleCallback(formResult,
                     setupItems[Constant_.Form],
                     setupItems[Constant_.MessageBox],
                     button,
                     true,
                     onClick,
                     goog.array.map,    //This needs to be added to the method signature.
                     goog.array.some,
                     src.base.control.messageBox.createAResult,
                     src.base.control.messageBox.updateMessagesByResult ,
                     goog.style.showElement,
                     src.base.helper.domHelper.toBeEnabled,
                     src.base.helper.domHelper.resetAForm,
                     function(url) {window.location = url;});
    };
    
    
    //Can't test...
    //Export this out to a method that creates a method?
    var whenClicked = function() {
      handleSubmit(setupItems[Constant_.Form],
                   setupItems[Constant_.MessageBox],
                   button,
                   goog.dom.forms.getFormDataMap,
                   validate,
                   src.base.control.messageBox.createAResult,
                   src.base.control.messageBox.updateMessagesByResult,
                   goog.style.showElement,
                   src.base.helper.domHelper.toBeEnabled,
                   src.base.helper.domHelper.submitData,
                   whenFinished);
    };
    
    
    setClick(button, whenClicked);
  };

