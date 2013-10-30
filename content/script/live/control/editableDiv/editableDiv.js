/*
 -- init :id :text :editMode :submitToUrl :callsAfterSubmit :createADiv :createATextArea :onClick
 --  Create Two divs
 --   One with only the text
 --   One with a text area populated with the text
 --    Will need a submit button
 --    Will need a cancel button
 
 --  set option[editMode]
 --    set onClick for the text container
 --  set option[submitToUrl]
 --  Create submit
 --   Send to :submitToUrl with :id :text
 --     Create a method that takes in a result, and call all :callsAfterSubmit
 --     Create a method that will update the text of the div
 --
 --  Return container and options
 */
goog.require('goog.dom');
goog.require('goog.dom.forms');
goog.require('goog.style');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.editableDiv.constant');
goog.require('src.base.control.editableDiv.form');
goog.require('src.base.control.formComponent.constant');
goog.require('src.base.helper.domCreation');


goog.provide('src.base.control.editableDiv');


/**
 @param {?string} id The optional id of the element.
 @param {string} cssClass The class of the element.
 @param {function} create The function that is used
 to create the element.
 @return {Object} The created element.
 @private
*/
src.base.control.editableDiv.createElement_ =
  function(id, cssClass, create) {
    var ControlConstant_ = src.base.control.controlConstant;
    
    var containerAttributes = {};
    
    if (id) {
      containerAttributes[ControlConstant_.Id] = id;
    }
    
    containerAttributes[ControlConstant_.Class] = cssClass;
    
    return create(containerAttributes);
    
    /*
     var container = Current_.createElement_(containerId,
     containerId,
     createADiv);
     //Text Container
     var textContainer = Current_.createElement_(null,
     Constant_.TextContainer,
     createADiv);
     */
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
 @param {string} containerId The id for the overall container.
 @param {string} text The story text.
 @param {string} persistUrl The url to post the edit to.
 @param {?function} createADiv The method used  to create a
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
  function(containerId, text, persistUrl, createADiv,
           setTextContent, createTheForm, showElement,
           appendChild, createTheTextContainerClick,
           setClick, setCancelHandler, createTheValidationRules,
           createAValidationWrapper, initializeTheForm) {
    
    createADiv = createADiv ?
      createADiv :
      src.base.helper.domCreation.div;
    
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
    
    var containerAttributes = {};
    containerAttributes[ControlConstant_.Id] = containerId;
    containerAttributes[ControlConstant_.Class] = containerId;
    var container = createADiv(containerAttributes);
    
    var textContainerAttributes = {};
    textContainerAttributes[ControlConstant_.Class] = Constant_.TextContainer;
    var textContainer = createADiv(textContainerAttributes);
    setTextContent(textContainer, text);
    appendChild(container, textContainer);
    
    var formResult = createTheForm(Constant_.FormId,
                                   persistUrl,
                                   src.base.helper.domCreation.form,
                                   src.base.helper.domCreation.textarea,
                                   src.base.helper.domCreation.button,
                                   appendChild);
    
    showElement(formResult[ControlConstant_.CreatedControl],
                false);
    
    appendChild(container, formResult[ControlConstant_.CreatedControl]);
    
    var textContainerClick = createTheTextContainerClick(textContainer,
                                                         formResult[ControlConstant_.CreatedControl],
                                                         showElement);
    
    setClick(textContainer, textContainerClick);
    
    setCancelHandler(formResult[ControlConstant_.CreatedControl],
                     function() { //This will eventually expand to call any functions passed into
                       //  the initialize
                       showElement(formResult[ControlConstant_.CreatedControl], false);
                       showElement(textContainer, true);
                     },
                     goog.dom.getElementByClass,
                     showElement,
                     setClick);
    
    var datePickerInformation = {};
    datePickerInformation[FormConstant_.DatepickerOptions] = {};
    datePickerInformation[FormConstant_.DatepickerTextboxes] = [];
    
    var validationMethod = createAValidationWrapper(createTheValidationRules());
    
    initializeTheForm(formResult[ControlConstant_.CreatedControl],
                      datePickerInformation,
                      validationMethod,
                      null,
                      function() {});

    return container;
  };
