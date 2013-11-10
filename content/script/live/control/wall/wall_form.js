goog.require('goog.dom');
goog.require('goog.dom.forms');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.formComponent');
goog.require('src.base.control.formComponent.constant');
goog.require('src.base.control.wall.constant');
goog.require('src.site.validation.validationInterpreter');
goog.require('src.site.validation.validationInterpreter.constant');

goog.provide('src.base.control.wall.form');



/**
 @return {Object} The empty date picker options for the form.
 @protected
 */
src.base.control.wall.form.createEmptyDatePickerOptions =
  function() {

    var FormConstant_ = src.base.control.formComponent.constant;

    var datePickerInformation = {};
    datePickerInformation[FormConstant_.DatepickerOptions] = {};
    datePickerInformation[FormConstant_.DatepickerTextboxes] = [];
    return datePickerInformation;
  };


/**
 @param {Object} textContainer The read only text container.
 @param {function} onSubmit The function to call when the
 submit is handled.
 @param {function} setValue The function used to remove
 the entered text.
 @return {function} The create result submit handler.
 @protected
 */
src.base.control.wall.form.createTheSubmitResultHandler =
  function(textContainer, onSubmit, setValue) {
    return function(result) {
      setValue(textContainer, '');
      if (onSubmit) {
        onSubmit(result);
      }
    };
  };


/**
 @return {Object} The keyword/value dictionary with the rules.
 @protected
 */
src.base.control.wall.form.createTheValidationRules =
  function() {

    var Constant_ = src.base.control.wall.constant;
    var ValidationInterpreterConstant_ = src.site.validation.validationInterpreter.constant;

    return [
      [Constant_.EntryTextbox,
       [ValidationInterpreterConstant_.IsNotEmpty, Constant_.ErrorEmptyText]]];
  };


/**
 @param {string} postTo The url to post the form data to.
 @param {?function} createAForm The function used to create the
 container form.
 @param {?function} createATextbox The function used to add the
 comment textbox.
 @param {?function} createAButton The function used to create
 the submit button.
 @param {?function} appendChild The function used to add the
 elements to the form.
 @return {Object} The created form.
 @protected
 */
src.base.control.wall.form.create =
  function(postTo, createAForm, createATextbox,
           createAButton, appendChild) {

    createAForm = createAForm ?
      createAForm :
      src.base.helper.domCreation.form;

    createAButton = createAButton ?
      createAButton :
      src.base.helper.domCreation.textbox;

    createAButton = createAButton ?
      createAButton :
      src.base.helper.domCreation.button;

    appendChild = appendChild ?
      appendChild :
      goog.dom.appendChild;

    /* START */


    var Constant_ = src.base.control.wall.constant;
    var ControlConstant_ = src.base.control.controlConstant;

    var entryFormAttributes = {};
    entryFormAttributes[ControlConstant_.Id] = Constant_.EntryForm;
    entryFormAttributes[ControlConstant_.Class] = Constant_.EntryForm;
    entryFormAttributes[ControlConstant_.Method] = ControlConstant_.Post;
    entryFormAttributes[ControlConstant_.Action] = postTo;
    var entryForm = createAForm(entryFormAttributes);

    var entryTextBoxAttributes = {};
    entryTextBoxAttributes[ControlConstant_.Class] = Constant_.EntryTextbox;
    entryTextBoxAttributes[ControlConstant_.Id] = Constant_.EntryTextbox;
    entryTextBoxAttributes[ControlConstant_.Name] = Constant_.EntryTextbox;
    var textEntry = createATextbox(entryTextBoxAttributes);


    var entrySubmitAttributes = {};
    entrySubmitAttributes[ControlConstant_.Class] = Constant_.EntrySubmit;
    entrySubmitAttributes[ControlConstant_.Id] = Constant_.EntrySubmit;
    entrySubmitAttributes[ControlConstant_.Type] = ControlConstant_.Button;
    var submitEntry = createAButton(entrySubmitAttributes,
                                    Constant_.EntrySubmitText);

    appendChild(entryForm,
                textEntry);

    appendChild(entryForm,
                submitEntry);

    return entryForm;

  };


/**
 @param {Object} form The form to initialize.
 @param {?function} onSubmit The function to call after a successful
 submital of the form.
 @param {?function} createEmptyDatePickerOptions The function used to
 create an empty set of date picker options for the form initialization.
 @param {?function} createAValidationWrapper The function used to create
 the validation handler.
 @param {?function} createTheValidationRules The function used to create
 the validation rules for the form intialization.
 @param {?function} getElementByClass The function used to find the text
 entry.
 @param {?function} initializeTheForm The function used to create
 the needed functionality for the form.
 @param {?function} createTheSubmitResultHandler The function used to
 create the post form submit handler.
 @protected
 */
src.base.control.wall.form.initialize =
  function(form, onSubmit, createEmptyDatePickerOptions,
           createAValidationWrapper, createTheValidationRules,
           getElementByClass, initializeTheForm,
           createTheSubmitResultHandler) {

    createEmptyDatePickerOptions = createEmptyDatePickerOptions ?
      createEmptyDatePickerOptions :
      src.base.control.wall.form.createEmptyDatePickerOptions;

    createAValidationWrapper = createAValidationWrapper ?
      createAValidationWrapper :
      src.site.validation.validationInterpreter.createAValidationWrapper;

    createTheValidationRules = createTheValidationRules ?
      createTheValidationRules :
      src.base.control.wall.form.createTheValidationRules;

    getElementByClass = getElementByClass ?
      getElementByClass :
      goog.dom.getElementByClass;

    initializeTheForm = initializeTheForm ?
      initializeTheForm :
      src.base.control.formComponent.initialize;

    createTheSubmitResultHandler = createTheSubmitResultHandler ?
      createTheSubmitResultHandler :
      src.base.control.wall.form.createTheSubmitResultHandler;

    /* START */

    var Constant_ = src.base.control.wall.constant;

    var validationRules = createTheValidationRules();
    var validationWrapper = createAValidationWrapper(validationRules);

    var textEntry = getElementByClass(Constant_.EntryTextbox,
                                      form);

    var submitResultHandler = createTheSubmitResultHandler(textEntry,
                                                           onSubmit,
                                                           goog.dom.forms.setValue);

    var datePickerOptions = createEmptyDatePickerOptions();

    initializeTheForm(form,
                      datePickerOptions,
                      validationWrapper,
                      null,
                      submitResultHandler);
  };




