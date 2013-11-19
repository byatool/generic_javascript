goog.require('goog.dom');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.formBuilder.constant');
goog.require('src.base.helper.domCreation');


goog.provide('src.base.control.formBuilder');


/**
 @param {Object} controlSpec The various control specifications.
 @param {function} createADiv The function used to create divs.
 @param {function} createALabel The function used to create a
 label.
 @param {function} createATextbox The function used to create a
 textbox.
 @param {function} appendChild The function used to append all
 created elements to a parent element.
 @param {function} createAClearDiv The function used to create
 a clear:both div.
 @return {Object} The created control.
 @protected
 */
src.base.control.formBuilder.createControl =
  function(controlSpec, createADiv, createALabel,
           createATextbox, appendChild, createAClearDiv) {

    var Constant_ = src.base.control.formBuilder.constant;
    var ControlConstant_ = src.base.control.controlConstant;


    var formRowAttributes = {};
    formRowAttributes[ControlConstant_.Class] = Constant_.FormRowContainer;
    formRowAttributes[ControlConstant_.Id] = Constant_.FormRowContainer;
    var formRow = createADiv(formRowAttributes);

    var formRowLabelAttributes = {};
    formRowLabelAttributes[ControlConstant_.Class] = Constant_.FormRowLabel;
    var formRowLabel = createALabel(formRowLabelAttributes,
                                    controlSpec[Constant_.LabelText]);


    var element = {};

    switch (controlSpec[ControlConstant_.Type]) {
    case Constant_.Textbox:

      var textboxAttributes = {};
      textboxAttributes[ControlConstant_.Class] = controlSpec[ControlConstant_.Class];
      textboxAttributes[ControlConstant_.Id] = controlSpec[ControlConstant_.Id];
      textboxAttributes[ControlConstant_.Name] = controlSpec[ControlConstant_.Id];
      element = createATextbox(textboxAttributes);

      break;
    default:

      textboxAttributes = {};
      textboxAttributes[ControlConstant_.Class] = controlSpec[ControlConstant_.Class];
      textboxAttributes[ControlConstant_.Id] = controlSpec[ControlConstant_.Id];
      textboxAttributes[ControlConstant_.Name] = controlSpec[ControlConstant_.Id];
      element = createATextbox(textboxAttributes);

      break;
    }

    appendChild(formRow,
                formRowLabel);

    appendChild(formRow,
                element);

    appendChild(formRow,
                createAClearDiv());

    return formRow;
  };



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
 @return {Object} The created control.
 @export
 */
src.base.control.formBuilder.initialize =
  function(containerId, postTo, controlSpecs, createAForm, forEach,
           createADiv, createControl, createAButton, appendChild) {
    
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
    
    
    /* START */
    
    var Constant_ = src.base.control.formBuilder.constant;
    var ControlConstant_ = src.base.control.controlConstant;
    var Current_ = src.base.control.formBuilder;
    
    var containerAttributes = {};
    containerAttributes[ControlConstant_.Id] = containerId;
    containerAttributes[ControlConstant_.Class] = containerId;
    var container = createADiv(containerAttributes);
    
    var formAttributes = {};
    formAttributes[ControlConstant_.Action] = postTo;
    formAttributes[ControlConstant_.Class] = Constant_.FormId;
    formAttributes[ControlConstant_.Method] = ControlConstant_.Post;
    formAttributes[ControlConstant_.Id] = Constant_.FormId;
    var form = createAForm(formAttributes);
    
    forEach(controlSpecs, function(control) {
      var element = createControl(control,
                                  createADiv,
                                  src.base.helper.domCreation.label,
                                  src.base.helper.domCreation.textbox,
                                  appendChild,
                                  src.base.helper.domCreation.createAClearDiv);
      
      appendChild(form,
                  element);
    });
    
    var submitButtonAttributes = {};
    submitButtonAttributes[ControlConstant_.Id] = Constant_.FormSubmit;
    submitButtonAttributes[ControlConstant_.Type] = ControlConstant_.Button;
    submitButtonAttributes[ControlConstant_.Class] = Constant_.FormSubmit;
    var submitButton = createAButton(submitButtonAttributes);
    
    
    
    appendChild(container,
                form);
    
    appendChild(container,
                submitButton);
    
    return container;
  };

/*
 - [controlSpecs:
 -  {type: 'text', id: 'username', class: 'textInput', label: 'Username:',
 -   validation: [
 -     ['is not empty', 'Return To Work Date is required'],
 -     ['is a valid date', 'Must be a valid date.']
 -  ]}
 -  {type: 'select, default: 'choose', url: 'retrieveUserNames'}
 - ]
 */


// src.site.view.employmentTransaction.stop.form.startValidationRules_ = [
//   ['actionDate',
//    ['is not empty', 'Return To Work Date is required'],
//    ['is a valid date', 'Return To Work Date is not valid: (mm/dd/yyyy)']],
//   ['enteredDate',
//    ['is not empty', 'Entered Date is required']],
//   ['reportedDate',
//    ['is not empty', 'Reported Date is required']],
//   ['statusStartDate',
//    ['is not empty', 'Status Start Date is required']],
//   ['statusCode',
//    ['is not empty', 'Status Code is required.']]];
