goog.require('src.base.control.controlConstant');
goog.require('src.base.control.editableDiv.constant');
goog.require('src.base.control.formComponent.constant');
goog.require('src.site.validation.validationInterpreter');

goog.provide('src.base.control.editableDiv.form');


/* PRIVATE FUNCTIONS */

/**
 
 @param {string} form The form to append the button to.
 @param {string} id The button id, and css class.
 @param {string} text The button text.
 @param {function} createAButton The function used to
 create the button.
 @param {function} appendChild The function used to
 append the button to the form.
 @private
 */
src.base.control.editableDiv.form.createAndAppendButton_ =
  function(form, id, text, createAButton, appendChild) {
    var Constant_ = src.base.control.editableDiv.constant;
    var ControlConstant_ = src.base.control.controlConstant;
    
    var buttonAttributes = {};
    buttonAttributes[ControlConstant_.Type] = ControlConstant_.Button;
    buttonAttributes[ControlConstant_.Id] = id;
    buttonAttributes[ControlConstant_.Class] = id;
    
    var submitButton = createAButton(buttonAttributes, text);
    
    appendChild(form, submitButton);
    
  };


/**
 @param {Object} form The parent form to append the text area
 to.
 @param {function} createATextArea The function used to create the
 edit text area.
 @param {function} appendChild The function used to append the text
 area to the form.
 @private
 */
src.base.control.editableDiv.form.createAndAppendEditTextArea_ =
  function(form, createATextArea, appendChild) {
    var Constant_ = src.base.control.editableDiv.constant;
    var ControlConstant_ = src.base.control.controlConstant;
    
    var editTextAreaAttributes = {};
    editTextAreaAttributes[ControlConstant_.Class] = Constant_.EditTextArea;
    editTextAreaAttributes[ControlConstant_.Name] = Constant_.EditTextAreaId;
    editTextAreaAttributes[ControlConstant_.Id] = Constant_.EditTextAreaId;
    var editTextArea = createATextArea(editTextAreaAttributes);
    
    appendChild(form, editTextArea);
  };


/**
 @param {string} postTo The url to post the data to on
 submit.
 @param {function} createAForm The function used to
 create a form element.
 @return {Object} The created form.
 @private
 */
src.base.control.editableDiv.form.createTheForm_ =
  function(postTo, createAForm) {
    var Constant_ = src.base.control.editableDiv.constant;
    var ControlConstant_ = src.base.control.controlConstant;
    
    var formAttributes = {};
    formAttributes[ControlConstant_.Action] = postTo;
    formAttributes[ControlConstant_.Class] = Constant_.FormId;
    formAttributes[ControlConstant_.Method] = ControlConstant_.Post;
    formAttributes[ControlConstant_.Id] = Constant_.FormId;
    
    return createAForm(formAttributes);
  };



/* PROTECTED FUNCTIONS */

/**
 @return {Object} The keyword/value dictionary with the rules.
 @protected
 */
src.base.control.editableDiv.form.createTheValidationRules =
  function() {
    
    var Constant_ = src.base.control.editableDiv.constant;
    var ValidationInterpreterConstant_ = src.site.validation.validationInterpreter.constant;
    
    return [
      [Constant_.EditTextAreaId,
       [ValidationInterpreterConstant_.IsNotEmpty, Constant_.ErrorEmptyText]]];
  };


/**
 @param {Object} form The form that holds the cancel button.
 @param {function} toCall The function to call when the cancel button is
 clicked.
 @param {function} getElementByClass The function used to find the cancel
 button.
 @param {function} setClick The .
 @protected
 */
src.base.control.editableDiv.form.setCancelHandler =
  function(form, toCall, getElementByClass, showElement,
           setClick) {
    var Constant_ = src.base.control.editableDiv.constant;
    
    
    var button = getElementByClass(Constant_.ButtonCancel, form);
    
    
    setClick(button, toCall);
  };

/* EXPORTED FUNCTIONS */

/**
 @param {string} formId The id of the created form.
 @param {string} postTo The url to post the form values
 to.
 @param {function} createAForm The function used to
 create the form.
 @param {function} createATextArea The function used to
 create the edit text area.
 @param {function} createAButton The function used to
 create the update button.
 @param {function} appendChild The function used to
 add the child elements to the created form.
 createAButton
 @return {Object} The created control, and its options.
 @protected
 */
src.base.control.editableDiv.form.createTheForm =
  function(formId, postTo, createAForm, createATextArea,
           createAButton, appendChild) {
    
    var Constant_ = src.base.control.editableDiv.constant;
    var ControlConstant_ = src.base.control.controlConstant;
    var Current_ = src.base.control.editableDiv.form;
    var FormComponentConstant_ = src.base.control.formComponent.constant;
    
    
    var form = Current_.createTheForm_(postTo, createAForm);
    
    Current_.createAndAppendEditTextArea_(form,
                                          createATextArea,
                                          appendChild);
    
    Current_.createAndAppendButton_(form,
                                    FormComponentConstant_.ButtonClass,
                                    Constant_.ButtonSubmitText,
                                    createAButton,
                                    appendChild);
    
    Current_.createAndAppendButton_(form,
                                    Constant_.ButtonCancel,
                                    Constant_.ButtonCancelText,
                                    createAButton,
                                    appendChild);
    
    var result = {};
    result[ControlConstant_.CreatedControl] = form;
    result[ControlConstant_.CreatedOptions] = {};
    result[ControlConstant_.CreatedOptions][ControlConstant_.Action] = postTo;
    
    return result;
  };

