goog.require('goog.dom');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.formBuilder.constant');
goog.require('src.base.control.formBuilder.control');
goog.require('src.base.control.formBuilder.validation');
goog.require('src.base.control.formComponent');
goog.require('src.base.control.formComponent.constant');
goog.require('src.base.control.popupDatePicker.constant');
goog.require('src.base.helper.domCreation');


goog.provide('src.base.control.formBuilder');

/* PRIVATE FUNCTIONS */

/**
 @param {string} containerId The id of the container.
 @param {function} createADiv The function used to create
 the container.
 @return {Object} The created container.
 @private
 */
src.base.control.formBuilder.createTheContainer_ =
  function(containerId, createADiv) {
    
    var ControlConstant_ = src.base.control.controlConstant;
    
    var containerAttributes = {};
    containerAttributes[ControlConstant_.Id] = containerId;
    containerAttributes[ControlConstant_.Class] = containerId;
    return createADiv(containerAttributes);
  };


/**
 @param {Object} datePickerTextboxes The array of textboxes needing a 
 date picker.
 @return {Object} The datepicker options
 @private
 */
src.base.control.formBuilder.createTheDatePickerOptions_ =
  function(datePickerTextboxes) {
    
    var DatePickerConstant_ = src.base.control.popupDatePicker.constant;
    var FormComponentConstant_ = src.base.control.formComponent.constant;
    
    var datePickerInformation = {};
    var datePickerOptions = {};
    datePickerOptions[DatePickerConstant_.ButtonText] = '';
    datePickerOptions[DatePickerConstant_.TextboxName] = 'theTextbox';
    datePickerInformation[FormComponentConstant_.DatepickerOptions] = datePickerOptions;
    datePickerInformation[FormComponentConstant_.DatepickerTextboxes] = datePickerTextboxes;
    
    return datePickerInformation;
  };

/**
 @param {function} cssClass The class for the form.
 @param {string} postTo The url to post the form to.
 @param {string} formId The id of the form.
 @param {function} createAForm The function used to
 create the form.
 @return {Object} The created form.
 @private
 */
src.base.control.formBuilder.createTheForm_ =
  function(cssClass, postTo, formId, createAForm) {
    var Constant_ = src.base.control.formBuilder.constant;
    var ControlConstant_ = src.base.control.controlConstant;
    
    var formAttributes = {};
    formAttributes[ControlConstant_.Action] = postTo;
    formAttributes[ControlConstant_.Class] = cssClass;
    formAttributes[ControlConstant_.Method] = ControlConstant_.Post;
    formAttributes[ControlConstant_.Id] = formId;
    return createAForm(formAttributes);
  };


/**
 buttonId
 @param {string} buttonId The id for the button.
 @param {string} buttonClass The class for the button.
 @param {function} createAButton The function used to
 created the button.
 @return {Object} The created button.
 @private
 */
src.base.control.formBuilder.createTheButton_ =
  function(buttonId, buttonClass, createAButton) {
    
    var ControlConstant_ = src.base.control.controlConstant;
    var FormComponentConstant_ = src.base.control.formComponent.constant;
    
    var submitButtonAttributes = {};
    submitButtonAttributes[ControlConstant_.Id] = buttonId;
    submitButtonAttributes[ControlConstant_.Type] = ControlConstant_.Button;
    submitButtonAttributes[ControlConstant_.Class] = FormComponentConstant_.ButtonClass;
    return createAButton(submitButtonAttributes);
  };


/* EXPORTED FUNCTIONS */

/**
 @param {string} containerId The id for the overall container.
 @param {string} postTo The url for the form to post to.
 @param {Object} controlSpecs The list representation of the
 needed inputs.
 @param {?function} postSubmit The function to be called after
 the form submits.  This can be null.
 @param {?function} createAForm The function used to create the
 form.
 @param {?function} forEach The function used to loop through
 the controls, and create elements.
 @param {?function} createADiv The function used  to create a
 div element.
 @param {?function} createControl The function used to take in
 the specs, and produce a control.
 @param {?function} createAButton The function used to
 create the submit button.
 @param {?function} appendChild The function used to append all
 created controls to the parent container.
 @param {?function} createValidation The function used to create
 the validation handler.
 @param {?function} initializeTheForm The function used to set
 the form handling.
 @return {Object} The created control.
 @export
 */
src.base.control.formBuilder.initialize =
  function(containerId, postTo, controlSpecs, postSubmit, createAForm, forEach,
           createADiv, createControl, createAButton, appendChild,
           createValidation, initializeTheForm) {
    
    createAForm = createAForm ?
      createAForm :
      src.base.helper.domCreation.form;
    
    forEach = forEach ?
      forEach :
      goog.array.forEach;
    
    createADiv = createADiv ?
      createADiv :
      src.base.helper.domCreation.div;
    
    createControl = createControl ?
      createControl :
      src.base.control.formBuilder.control.createControl;
    
    createAButton = createAButton ?
      createAButton :
      src.base.helper.domCreation.button;
    
    appendChild = appendChild ?
      appendChild :
      goog.dom.appendChild;
    
    createValidation = createValidation ?
      createValidation :
      src.base.control.formBuilder.validation.createValidation;
    
    initializeTheForm = initializeTheForm ?
      initializeTheForm :
      src.base.control.formComponent.initialize;
    
    
    /* START */
    
    var Constant_ = src.base.control.formBuilder.constant;
    var ControlConstant_ = src.base.control.controlConstant;
    var Current_ = src.base.control.formBuilder;
    var DatePickerConstant_ = src.base.control.popupDatePicker.constant;
    var FormComponentConstant_ = src.base.control.formComponent.constant;
    
    
    var container = Current_.createTheContainer_(containerId,
                                                 createADiv);
    
    
    var form = Current_.createTheForm_(Constant_.FormId,
                                       postTo,
                                       Constant_.FormId,
                                       createAForm);
    //BAD It is difficult to test the interaction with this array
    //  since there is nothing to inject...
    var datePickerTextboxes = [];
    
    forEach(controlSpecs, function(control) {
      var element = createControl(control,
                                  datePickerTextboxes);
      
      appendChild(form, element);
    });
    
    
    var submitButton = Current_.createTheButton_(Constant_.FormSubmit,
                                                 FormComponentConstant_.ButtonClass,
                                                 createAButton);
    
    appendChild(form, submitButton);
    appendChild(container, form);
    
    
    var validationWrapper = createValidation(controlSpecs);
    var datePickerInformation = Current_.createTheDatePickerOptions_(datePickerTextboxes);

    postSubmit = postSubmit ? postSubmit : function() {};
    
    initializeTheForm(form,
                      datePickerInformation,
                      validationWrapper,
                      null,
                      postSubmit);
    
    return container;
  };

