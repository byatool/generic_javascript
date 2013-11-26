goog.require('goog.dom');
goog.require('goog.dom.forms');
goog.require('goog.events');
goog.require('goog.ui.KeyboardShortcutHandler.EventType');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.formComponent');
goog.require('src.base.control.formComponent.constant');
goog.require('src.base.control.wall.constant');
goog.require('src.base.helper.googleWrapper');
goog.require('src.site.validation.validationInterpreter');
goog.require('src.site.validation.validationInterpreter.constant');

goog.provide('src.base.control.wall.form');


//goog.events.listen

/**
 @param {Object} document The document object.
 @param {Object} submitEntry The button to attach the enter
 handling to.
 @param {function} createAKeyboardShortcutHandler The function
 used to create a google shortcut handler.
 @param {function} listen The function used to assign a handler
 to the button.
 @protected
 */
src.base.control.wall.form.createTheEnterHandler =
  function(document, submitEntry, createAKeyboardShortcutHandler,
           listen) {

    var Constant_ = src.base.control.wall.constant;
    var KeyCodes_ = goog.events.KeyCodes;
    var Shortcut_ = goog.ui.KeyboardShortcutHandler.EventType;

    var handler = createAKeyboardShortcutHandler(document);

    handler.registerShortcut(Constant_.ShortcutEnter,
                             KeyCodes_.ENTER);

    listen(
      handler,
      Shortcut_.SHORTCUT_TRIGGERED,
      function(e) {
        submitEntry.click();
      });
  };


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
 @param {Object} document The document object.
 @param {string} postTo The url to post the form data to.
 @param {string} subjectId The id of the parent subject the
 text entry will belong to.
 @param {?function} createAForm The function used to create the
 container form.
 @param {?function} createATextbox The function used to add the
 comment textbox.
 @param {?function} createALabelInput The function used to add
 a label to the textbox.
 @param {?function} createAHidden The function used to create
 the subjectId holder.
 @param {?function} setValue The function used to set the
 subject id on the form.
 @param {?function} createAButton The function used to create
 the submit button.
 @param {function} createTheEnterHandler The function used to
 create the enter button press handler.
 @param {?function} appendChild The function used to add the
 elements to the form.
 @return {Object} The created form.
 @protected
 */
src.base.control.wall.form.create =
  function(document, postTo, subjectId, createAForm, createATextbox,
           createALabelInput, createAHidden, setValue,
           createAButton, createTheEnterHandler, appendChild) {

    createAForm = createAForm ?
      createAForm :
      src.base.helper.domCreation.form;

    createATextbox = createATextbox ?
      createATextbox :
      src.base.helper.domCreation.textbox;

    createALabelInput = createALabelInput ?
      createALabelInput :
      src.base.helper.googleWrapper.createALabelInput;

    createAHidden = createAHidden ?
      createAHidden :
      src.base.helper.domCreation.hidden;

    setValue = setValue ?
      setValue :
      goog.dom.forms.setValue;

    createAButton = createAButton ?
      createAButton :
      src.base.helper.domCreation.button;

    createTheEnterHandler = createTheEnterHandler ?
      createTheEnterHandler :
      src.base.control.wall.form.createTheEnterHandler;

    appendChild = appendChild ?
      appendChild :
      goog.dom.appendChild;


    /* START */


    var Constant_ = src.base.control.wall.constant;
    var ControlConstant_ = src.base.control.controlConstant;
    var FormComponentConstant_ = src.base.control.formComponent.constant;

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
    entryTextBoxAttributes[ControlConstant_.Placeholder] = Constant_.EntryTextboxLabel;
    var textEntry = createATextbox(entryTextBoxAttributes);


    var hiddenIdAttributes = {};
    hiddenIdAttributes[ControlConstant_.Id] = Constant_.EntryHiddenId;
    hiddenIdAttributes[ControlConstant_.Name] = Constant_.EntryHiddenId;
    var hiddenId = createAHidden(hiddenIdAttributes);
    setValue(hiddenId,
             subjectId);


    var entrySubmitAttributes = {};
    entrySubmitAttributes[ControlConstant_.Class] = FormComponentConstant_.ButtonClass;
    entrySubmitAttributes[ControlConstant_.Id] = Constant_.EntrySubmit;
    entrySubmitAttributes[ControlConstant_.Type] = ControlConstant_.Button;
    var submitEntry = createAButton(entrySubmitAttributes,
                                    Constant_.EntrySubmitText);


    createTheEnterHandler(document,
                          submitEntry,
                          src.base.helper.googleWrapper.createAKeyboardShortcutHandler,
                          goog.events.listen);

    appendChild(entryForm,
                textEntry);

    appendChild(entryForm,
                hiddenId);

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
