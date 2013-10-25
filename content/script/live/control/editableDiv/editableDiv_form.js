goog.require('src.base.control.controlConstant');
goog.require('src.base.control.editableDiv.constant');

goog.provide('src.base.control.editableDiv.form');

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
 @protected
 */
src.base.control.editableDiv.form.createTheForm =
  function(formId, postTo, createAForm, createATextArea,
           createAButton, appendChild) {
    
    var Constant_ = src.base.control.editableDiv.constant;
    var ControlConstant_ = src.base.control.controlConstant;
    
    var formAttributes = {};
    formAttributes[ControlConstant_.Action] = postTo;
    formAttributes[ControlConstant_.Class] = Constant_.FormId;
    formAttributes[ControlConstant_.Method] = ControlConstant_.Post;
    formAttributes[ControlConstant_.Id] = Constant_.FormId;
    var form = createAForm(formAttributes);
    
    var editTextAreaAttributes = {};
    editTextAreaAttributes[ControlConstant_.Class] = Constant_.EditTextArea;
    var editTextArea = createATextArea(editTextAreaAttributes);
    
    appendChild(form, editTextArea);
    
    var submitButtonAttributes = {};
    submitButtonAttributes[ControlConstant_.ButtonType] = ControlConstant_.Button;
    submitButtonAttributes[ControlConstant_.Id] = Constant_.ButtonSubmit;
    submitButtonAttributes[ControlConstant_.Class] = Constant_.ButtonSubmit;
    var submitButton = createAButton(submitButtonAttributes, Constant_.ButtonSubmitText);
    appendChild(form, submitButton);
    
    
    var cancelButtonAttributes = {};
    cancelButtonAttributes[ControlConstant_.ButtonType] = ControlConstant_.Button;
    cancelButtonAttributes[ControlConstant_.Id] = Constant_.ButtonCancel;
    cancelButtonAttributes[ControlConstant_.Class] = Constant_.ButtonCancel;
    var cancelButton = createAButton(cancelButtonAttributes, Constant_.ButtonCancelText);
    appendChild(form, cancelButton);
    
    var result = {};
    result[ControlConstant_.CreatedControl] = form;
    result[ControlConstant_.CreatedOptions] = {};
    result[ControlConstant_.CreatedOptions][ControlConstant_.Action] = postTo;
    
    return result;
  };
    
