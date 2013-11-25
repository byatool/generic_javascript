goog.require('goog.dom');
goog.require('goog.dom.forms');
goog.require('goog.string');
goog.require('goog.style');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.editableDiv.constant');
goog.require('src.base.control.editableDiv.form');
goog.require('src.base.control.formComponent.constant');
goog.require('src.base.helper.domCreation');


goog.provide('src.base.control.editableDiv');


/**
 @param {string} containerId The id of the parent container.
 @param {function} createADiv The function used to create
 the parent container.
 @return {Object} The created parent container.
 @private
 */
src.base.control.editableDiv.createTheContainer_ =
  function(containerId, createADiv) {
    var ControlConstant_ = src.base.control.controlConstant;
    
    var containerAttributes = {};
    containerAttributes[ControlConstant_.Id] = containerId;
    containerAttributes[ControlConstant_.Class] = containerId;
    return createADiv(containerAttributes);
  };


/**
 @param {Object} parentContainer The container to add the
 created text container to.
 @param {string} text The text to fill the text container with.
 @param {function} createAPre The function used to create the
 text container.
 @param {function} setTextContent The function used to set the
 inner text of the text container.
 @param {function} appendChild The functio used to append the
created text container to the parent container.
 @return {Object} The created text container.
 @private
 */
src.base.control.editableDiv.createAndAppendTheTextContainer_ =
  function(parentContainer, text, createAPre,
           setTextContent, appendChild) {
    
    var ControlConstant_ = src.base.control.controlConstant;
    var Constant_ = src.base.control.editableDiv.constant;
    
    var textContainerAttributes = {};
    textContainerAttributes[ControlConstant_.Class] = Constant_.TextContainer;
    
    var textContainer = createAPre(textContainerAttributes);
    setTextContent(textContainer, text);
    
    appendChild(parentContainer, textContainer);
    
    return textContainer;
  };


/**
 @param {Object} container The overall parent container.
 @param {string} text The text used to fill the form textarea.
 @param {string} id The id value to post with the text.
 @param {string} persistUrl The url to post the form values
 to.
 @param {function} createTheForm The function used to create
 the form.
 @param {function} appendChild The function used to append the
 created form to the parent container.
 @param {function} showElement The function used to hide the
 created form.
 @return {Object} The created form, and its options.
 @private
 */
src.base.control.editableDiv.createAndAppendTheForm_ =
  function(container, text, id, persistUrl,
           createTheForm, appendChild, showElement) {

    var ControlConstant_ = src.base.control.controlConstant;
    var Constant_ = src.base.control.editableDiv.constant;

    var formResult = createTheForm(Constant_.FormId,
                                   text,
                                   id,
                                   persistUrl,
                                   src.base.helper.domCreation.form,
                                   src.base.helper.domCreation.textarea,
                                   src.base.helper.domCreation.hidden,
                                   src.base.helper.domCreation.button,
                                   goog.dom.forms.setValue,
                                   appendChild);

    var form = formResult[ControlConstant_.CreatedControl];

    showElement(form, false);

    appendChild(container, form);

    return formResult;
  };


/* PROTECTED FUNCTIONS */

/**
 @param {Object} parentForm The form that containes the
 edit textarea.
 @param {Object} textContainer The text only container.
 @param {function} getElementByClass The function used to
 find the edit text area.
 @param {function} getValue The function used to get the
 value of the edit textarea.
 @param {function} htmlEscape The function used to clean
 up any malicious code.
 @param {function} setTextContent The function used to
 update the inner text of the text container.
 @protected
 */
src.base.control.editableDiv.applyTheEdittedText =
  function(parentForm, textContainer, getElementByClass,
           getValue, htmlEscape, setTextContent) {
    
    var Constant_ = src.base.control.editableDiv.constant;
    
    var editTextArea = getElementByClass(Constant_.EditTextArea,
                                         parentForm);
    
    var text = getValue(editTextArea);
    var cleanText = htmlEscape(text);
    
    setTextContent(textContainer, cleanText);
  };


/**
 @param {Object} form The parent form.
 @param {Object} textContainer The element that displays
 the uneditable text.
 @param {function} showElement The function used to hide the
 form, and show the textContainer.
 @param {function} revertText The function used to set the
 form text back to the text container text.
 @return {function} The cancel handler function.
 @protected
 */
src.base.control.editableDiv.createTheCancelHandler =
  function(form, textContainer, showElement,
           revertText) {
    return function() {
      showElement(form, false);
      
      revertText(form,
                 textContainer,
                 goog.dom.getRawTextContent,
                 goog.dom.getElementByClass,
                 goog.dom.forms.setValue);
      
      showElement(textContainer, true);
    };
  };



/**
 @param {Object} form The form that holds the submit button.
 @param {Object} textContainer The read only text container.
 @param {function} applyTheEdittedText The function used to
 set the text container text to the text area text.
 @return {function} The create result submit handler.
 @protected
 */
src.base.control.editableDiv.createTheSubmitResultHandler =
  function(form, textContainer, applyTheEdittedText) {
    return function() {
      applyTheEdittedText(form,
                          textContainer,
                          goog.dom.getElementByClass,
                          goog.dom.forms.getValue,
                          goog.string.htmlEscape,
                          goog.dom.setTextContent);
    };
  };

/**
 @param {Object} textContainer The text container to
 hide.
 @param {Object} editContainer The text area container
 to show.
 @param {function} showElement The function used to hide
 the text container, and show the edit container.
 @return {function} The created click handler.
 @protected
 */
src.base.control.editableDiv.createTheTextContainerClick =
  function(textContainer, editContainer, showElement) {
    return function() {
      showElement(textContainer, false);
      showElement(editContainer, true);
    };
  };


/**
 @param {Object} parentForm The form that containes the
 edit textarea.
 @param {Object} textContainer The text only container.
 @param {function} getTextContent The function used to get the.
 @param {function} getElementByClass The function used to find
 the edit text area.
 @param {function} setValue The function used to set the text
 entry element value.
 @protected
 */
src.base.control.editableDiv.revertText =
  function(parentForm, textContainer, getTextContent,
           getElementByClass, setValue) {

    var Constant_ = src.base.control.editableDiv.constant;

    var text = getTextContent(textContainer);
    var editTextArea = getElementByClass(Constant_.EditTextArea,
                                         parentForm);

    setValue(editTextArea, text);
  };


/* EXPORTED FUNCTIONS */

/**
 @param {string} containerId The id for the overall container.
 @param {string} text The text to view, or edit.
 @param {string} id The id to be posted with the text.
 
 @param {string} persistUrl The url to post the edit to.
 @param {?function} createAPre The method used  to create a
 div element.
 @param {?function} setTextContent The function used to set the
 inner text of the story text holder.
 @param {?function} createTheForm The function used to create
 the text area for editing.
 @param {?function} showElement The function used to toggle the
 visibility of the text container, and the text area.
 @param {?function} appendChild The function used to append the
 various elements to the parent container.
 @param {?function} createTheTextContainerClick The function used
 to create the onclick handler for the text container.
 @param {?function} setClick The function used to handle the
 text container click.
 @param {?function} setCancelHandler The function for setting the
 click handler for the form cancel button.
 @param {?function} createTheCancelHandler The function used create
 the on click handler for the cancel button on the form.
 @param {?function} createTheSubmitResultHandler The function used to
 create the post form submit handler.
 @param {?function} createTheValidationRules The function used to
 create the validation rules for the form.
 @param {?function} createAValidationWrapper The function used to
 create the validation handler function.
 @param {?function} initializeTheForm The function used to attach
 the form components functionality to a form.
 @return {Object} The created control.
 @export
 */
src.base.control.editableDiv.initialize =
  function(containerId, text, id, persistUrl, createADiv, createAPre,
           setTextContent, createTheForm, showElement,
           appendChild, createTheTextContainerClick,
           setClick, setCancelHandler,
           createTheCancelHandler, createTheSubmitResultHandler,
           createTheValidationRules, createAValidationWrapper,
           initializeTheForm) {


    createADiv = createADiv ?
      createADiv :
      src.base.helper.domCreation.div;

    createAPre = createAPre ?
      createAPre :
      src.base.helper.domCreation.preContainer;

    setTextContent = setTextContent ?
      setTextContent :
      goog.dom.setTextContent;

    createTheForm = createTheForm ?
      createTheForm :
      src.base.control.editableDiv.form.createTheForm;

    showElement = showElement ?
      showElement :
      goog.style.showElement;

    appendChild = appendChild ?
      appendChild :
      goog.dom.appendChild;

    createTheTextContainerClick = createTheTextContainerClick ?
      createTheTextContainerClick :
      src.base.control.editableDiv.createTheTextContainerClick;

    setClick = setClick ?
      setClick :
      src.base.helper.events.setClick;

    setCancelHandler = setCancelHandler ?
      setCancelHandler :
      src.base.control.editableDiv.form.setCancelHandler;

    createTheCancelHandler = createTheCancelHandler ?
      createTheCancelHandler :
      src.base.control.editableDiv.createTheCancelHandler;

    createTheSubmitResultHandler = createTheSubmitResultHandler ?
      createTheSubmitResultHandler :
      src.base.control.editableDiv.createTheSubmitResultHandler;

    createTheValidationRules = createTheValidationRules ?
      createTheValidationRules :
      src.base.control.editableDiv.form.createTheValidationRules;

    createAValidationWrapper = createAValidationWrapper ?
      createAValidationWrapper :
      src.site.validation.validationInterpreter.createAValidationWrapper;

    initializeTheForm = initializeTheForm ?
      initializeTheForm :
      src.base.control.formComponent.initialize;


    /* START */

    var Constant_ = src.base.control.editableDiv.constant;
    var ControlConstant_ = src.base.control.controlConstant;
    var Current_ = src.base.control.editableDiv;
    var FormConstant_ = src.base.control.formComponent.constant;

    var container = Current_.createTheContainer_(containerId,
                                                 createADiv);


    var textContainer = Current_.createAndAppendTheTextContainer_(container,
                                                                  text,
                                                                  createAPre,
                                                                  setTextContent,
                                                                  appendChild);


    var formResult = Current_.createAndAppendTheForm_(container,
                                                      text,
                                                      id,
                                                      persistUrl,
                                                      createTheForm,
                                                      appendChild,
                                                      showElement);

    var form = formResult[ControlConstant_.CreatedControl];


    var textContainerClick = createTheTextContainerClick(textContainer,
                                                         form,
                                                         showElement);
    setClick(textContainer, textContainerClick);

    var onCancelClick = createTheCancelHandler(form,
                                               textContainer,
                                               showElement,
                                               src.base.control.editableDiv.revertText);

    setCancelHandler(form,
                     onCancelClick,
                     goog.dom.getElementByClass,
                     showElement,
                     setClick);


    var datePickerInformation = {};
    datePickerInformation[FormConstant_.DatepickerOptions] = {};
    datePickerInformation[FormConstant_.DatepickerTextboxes] = [];

    var validationMethod = createAValidationWrapper(createTheValidationRules());

    var submitResultHandler = createTheSubmitResultHandler(form,
                                                           textContainer,
                                                           src.base.control.editableDiv.applyTheEdittedText);

    initializeTheForm(form,
                      datePickerInformation,
                      validationMethod,
                      null,
                      submitResultHandler);

    return container;
  };
