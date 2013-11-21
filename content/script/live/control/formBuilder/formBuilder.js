goog.require('goog.dom');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.formBuilder.constant');
goog.require('src.base.control.formBuilder.validation');
goog.require('src.base.control.formComponent.constant');
goog.require('src.base.control.popupDatePicker.constant');
goog.require('src.base.helper.domCreation');


goog.provide('src.base.control.formBuilder');

/* PRIVATE FUNCTIONS */

/**
 @param {Object} controlSpec The current form spec item.
 @param {Object} textbox The text box paired with the date
 picker.
 @param {Object} parentRow The row to add the date picker
 container to.
 @param {Object} datePickerControlList The list of date 
 picker information that the date picker needs to be added
 to.
 @param {function} insert The function used to add the
 elements to the datePickerControlList
 @param {function} createADiv The function used to create
 the date picker container.
 @param {function} appendChild The function used to add
 the date picker control to the parentRow.
 @private
 */
src.base.control.formBuilder.createDatePicker_ =
  function(controlSpec, textbox, parentRow, datePickerControlList,
           insert, createADiv, appendChild) {
    
    var Constant_ = src.base.control.formBuilder.constant;
    var ControlConstant_ = src.base.control.controlConstant;
    
    var datePickerAttributes = {};
    var datePickerId = controlSpec[ControlConstant_.Id] + Constant_.DateSuffix;
    datePickerAttributes[ControlConstant_.Id] = datePickerId;
    datePickerAttributes[ControlConstant_.Name] = datePickerId;
    var datePickerContainer = createADiv(datePickerAttributes);
    
    insert(datePickerControlList,
           [datePickerId, textbox]);
    
    appendChild(parentRow,
                datePickerContainer);
  };





/**
 @param {Object} controlSpec The current form build spec row.
 @param {Object} container The parent row the textbox will be
 appended to.
 @param {function} createATextbox The function used to create
 the needed textbox.
 @param {function} appendChild The function used to append
 the textbox to the parent.
 @return {Object} The created textbox.
 @private
 */
src.base.control.formBuilder.createAndAppendATextbox_ =
  function(controlSpec, container, createATextbox, appendChild) {
    var Constant_ = src.base.control.formBuilder.constant;
    var ControlConstant_ = src.base.control.controlConstant;
    
    var textboxAttributes = {};
    textboxAttributes[ControlConstant_.Class] = controlSpec[ControlConstant_.Class];
    textboxAttributes[ControlConstant_.Id] = controlSpec[ControlConstant_.Id];
    textboxAttributes[ControlConstant_.Name] = controlSpec[ControlConstant_.Id];
    var textbox = createATextbox(textboxAttributes);
    
    appendChild(container,
                textbox);
    
    return textbox;
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


/* PROTECTED FUNCTIONS */

/**
 @param {Object} controlSpec The various control specifications.
 @param {Array.<Object>} datePickerControls The list to add any textbox
 that is pair with a date.
 @param {function} createADiv The function used to create divs.
 @param {function} createALabel The function used to create a
 label.
 @param {function} createATextbox The function used to create a
 textbox.
 @param {function} appendChild The function used to append all
 created elements to a parent element.
 @param {function} createAClearDiv The function used to create
 a clear:both div.
 @param {function} insert The function used to add items to
 the datePickerControls list.
 @return {Object} The created control.
 @protected
 */
src.base.control.formBuilder.createControl =
  function(controlSpec, datePickerControls, createADiv, createALabel,
           createATextbox, appendChild, createAClearDiv, insert) {
    
    var Constant_ = src.base.control.formBuilder.constant;
    var ControlConstant_ = src.base.control.controlConstant;
    var Current_ = src.base.control.formBuilder;
    
    var formRowAttributes = {};
    formRowAttributes[ControlConstant_.Class] = Constant_.FormRowContainer;
    formRowAttributes[ControlConstant_.Id] = Constant_.FormRowContainer;
    var formRow = createADiv(formRowAttributes);
    
    var formRowLabelAttributes = {};
    formRowLabelAttributes[ControlConstant_.Class] = Constant_.FormRowLabel;
    var formRowLabel = createALabel(formRowLabelAttributes,
                                    controlSpec[Constant_.LabelText]);
    
    appendChild(formRow,
                formRowLabel);
    
    
    var element = {};
    
    switch (controlSpec[ControlConstant_.Type]) {
    case Constant_.Textbox:
      element = Current_.createAndAppendATextbox_(controlSpec,
                                                  formRow,
                                                  createATextbox,
                                                  appendChild);
      break;
      
    case Constant_.Date:
      element = Current_.createAndAppendATextbox_(controlSpec,
                                                  formRow,
                                                  createATextbox,
                                                  appendChild);
      
      Current_.createDatePicker_(controlSpec,
                                 element,
                                 formRow,
                                 datePickerControls,
                                 insert,
                                 createADiv,
                                 appendChild);
      
      break;
      
    default:
      
      element = Current_.createAndAppendATextbox_(controlSpec,
                                                  formRow,
                                                  createATextbox,
                                                  appendChild);
      break;
    }
    
    
    // if (controlSpec[Constant_.IsDate]) {
    //   // var datePickerAttributes = {};
    //   // var datePickerId = controlSpec[ControlConstant_.Id] + 'date';
    //   // datePickerAttributes[ControlConstant_.Id] = datePickerId;
    //   // datePickerAttributes[ControlConstant_.Name] = datePickerId;
    //   // var datePickerContainer = createADiv(datePickerAttributes);
      
      
    // }
    
    appendChild(formRow,
                createAClearDiv());
             
             
    return formRow;
  };


/* EXPORTED FUNCTIONS */

/**
 @param {string} containerId The id for the overall container.
 @param {string} postTo The url for the form to post to.
 @param {Object} controlSpecs The list representation of the
 needed inputs.
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
  function(containerId, postTo, controlSpecs, createAForm, forEach,
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
      src.base.control.formBuilder.createControl;

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


    var containerAttributes = {};
    containerAttributes[ControlConstant_.Id] = containerId;
    containerAttributes[ControlConstant_.Class] = containerId;
    var container = createADiv(containerAttributes);
    
    
    var form = Current_.createTheForm_(Constant_.FormId,
                                       postTo,
                                       Constant_.FormId,
                                       createAForm);
    //BAD It is difficult to test the interaction with this array
    //  since there is nothing to inject...
    var datePickerTextboxes = [];

    forEach(controlSpecs, function(control) {
      var element = createControl(control,
                                  datePickerTextboxes,
                                  createADiv,
                                  src.base.helper.domCreation.label,
                                  src.base.helper.domCreation.textbox,
                                  appendChild,
                                  src.base.helper.domCreation.createAClearDiv,
                                  goog.array.insert);


      appendChild(form,
                  element);


    });


    var submitButton = Current_.createTheButton_(Constant_.FormSubmit,
                                                 FormComponentConstant_.ButtonClass,
                                                 createAButton);

    appendChild(form,
                submitButton);

    appendChild(container,
                form);


    var validationWrapper = createValidation(controlSpecs);

    var datePickerInformation = {};
    var datePickerOptions = {};
    datePickerOptions[DatePickerConstant_.ButtonText] = '';
    datePickerOptions[DatePickerConstant_.TextboxName] = 'theTextbox';
    datePickerInformation[FormComponentConstant_.DatepickerOptions] = datePickerOptions;
    datePickerInformation[FormComponentConstant_.DatepickerTextboxes] = datePickerTextboxes;

    initializeTheForm(form,
                      datePickerInformation,
                      validationWrapper,
                      null,
                      function() {});

    return container;
  };



/*
 - [controlSpecs:
 -  {type: 'text', id: 'username', class: 'textInput', label: 'Username:',
 -   validation: [
 -     ['is not empty', 'Return To Work Date is required'],
 -     ['is a valid date', 'Must be a valid date.']
 -  ]}
 -  {type: 'text', id: 'enteredDate', class: 'textInput', label: 'Entered Date:', 'date': true
 -   validation: []}
 -  {type: 'select, default: 'choose', url: 'retrieveUserNames'}
 - ]
 */

