goog.require('goog.string');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.editableDiv');
goog.require('src.base.control.editableDiv.constant');
goog.require('src.base.control.formComponent.constant');
goog.require('src.base.helper.domCreation');

goog.provide('src.test.control.editableDiv.whenInitializingAnEditableDiv');

/**
 @export
 */
src.test.control.editableDiv.whenInitializingAnEditableDiv.describe = function () {
  
  //Using
  
  var Current_ = src.base.control.editableDiv;
  var Constant_ = src.base.control.editableDiv.constant;
  var ControlConstant_ = src.base.control.controlConstant;
  var FormConstant_ = src.base.control.formComponent.constant;
  
  //Fields
  
  
  var ParentContainerId_ = goog.string.getRandomString();
  var ParentContainerClass_ = goog.string.getRandomString();
  var PersistUrl_ = goog.string.getRandomString();
  var Text_ = goog.string.getRandomString();
  
  var appendChild_;
  var createADiv_;
  var createFormResult_;
  var createTheForm_;
  var createTheTextContainerClick_;
  var createTheValidationRules_;
  var createAValidationWrapper_;
  var theForm_;
  var initializeTheForm_;
  var parentContainer_;
  var setCancelHandler_;
  var setClick_;
  var setTextContent_;
  var setValue_;
  var showElement_;
  var textContainer_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    theForm_ = {};
    createFormResult_ = {};
    createFormResult_[ControlConstant_.CreatedControl] = theForm_;
    
    parentContainer_ = {};
    textContainer_ = {};
    
    appendChild_ = function(){};
    
    createADiv_ = function(attributes){
      switch(attributes[ControlConstant_.Class]) {
      case ParentContainerId_:
        return parentContainer_;
        break;
        
      case Constant_.TextContainer:
        return textContainer_;
        break;
        
      default:
        return parentContainer_;                      
      }};
    
    createTheForm_ = function(){ return createFormResult_; };
    createTheTextContainerClick_ = function(){ };
    createTheValidationRules_ = function(){};
    createAValidationWrapper_ = function(){};
    initializeTheForm_ = function(){};
    setCancelHandler_ = function(){};
    setClick_ = function(){};
    showElement_ = function(){};
    setTextContent_ = function(){};
    setValue_ = function() {};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.initialize(ParentContainerId_, Text_, PersistUrl_, createADiv_, setTextContent_,
                               createTheForm_, showElement_, appendChild_, createTheTextContainerClick_,
                               setClick_, setCancelHandler_, createTheValidationRules_,
                               createAValidationWrapper_, initializeTheForm_);
  };
  
  
  //Test Methods
  
  it('should create a parent container.', function() {
    var methodWasCalled = false;
    
    createADiv_ = function(attributes) {
      methodWasCalled = methodWasCalled ||
        (attributes[ControlConstant_.Id] === ParentContainerId_ &&
         attributes[ControlConstant_.Class] === ParentContainerId_);
      
      return parentContainer_;
    };
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the text holder.', function() {
    var methodWasCalled = false;
    
    createADiv_ = function(attributes){
      methodWasCalled = methodWasCalled ||
        (Constant_.TextContainer !== undefined &&
         attributes[ControlConstant_.Class] === Constant_.TextContainer);
      
      return textContainer_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should set the text of the text container.', function() {
    var methodWasCalled = false;
    
    setTextContent_ = function(element, text){
      methodWasCalled = methodWasCalled ||
        (element === textContainer_ &&
         text === Text_);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should append the text container to the parent.', function() {
    var methodWasCalled = false;
    
    appendChild_ = function(parent, child){
      methodWasCalled = methodWasCalled || 
        (parent === parentContainer_ && child === textContainer_);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the form.', function() {
    var methodWasCalled = false;
    
    createTheForm_ = function(id, postTo, createAForm, createATextArea, createAButton, appendChild) {
      methodWasCalled = Constant_.FormId !== undefined && 
        id === Constant_.FormId &&
        postTo === PersistUrl_ &&
        createAForm === src.base.helper.domCreation.form &&
        createATextArea === src.base.helper.domCreation.textarea &&
        createAButton === src.base.helper.domCreation.button &&
        appendChild === appendChild_;
      
      return createFormResult_;
      
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should set the form visibilty.', function() {
    var methodWasCalled = false;
    
    showElement_ = function(element, show){
      methodWasCalled = methodWasCalled ||
        (element === theForm_ &&
         show === false);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should append the form to the parent container.', function() {
    var methodWasCalled = false;
    
    appendChild_ = function(parent, child){
      methodWasCalled = methodWasCalled || 
        (parent === parentContainer_ && child === theForm_);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the text container click handler.', function() {
    var methodWasCalled = false;
    
    createTheTextContainerClick_ = function(textContainer, editTextArea, showElement) {
      methodWasCalled = textContainer === textContainer_ &&
        editTextArea === theForm_ &&
        showElement === showElement_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should set the text content on click.', function() {
    var methodWasCalled = false;
    var toClick = {};
    
    createTheTextContainerClick_ = function(){
      return toClick;
    };
    
    setClick_ = function(element, toSet){
      methodWasCalled = element === textContainer_ &&
        toSet === toClick;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should set the click handler for the cancel button.', function() {
    var methodWasCalled = 0;
    
    showElement_ = function(element, showIt){
      methodWasCalled += (element === theForm_ && showIt === false) ||
        (element === textContainer_ && showIt === true);
    };
    
    setCancelHandler_ = function(form, toCall, getElementByClass, showElement,
                                 setClick){
      methodWasCalled += form === theForm_ &&
        getElementByClass === goog.dom.getElementByClass &&
        showElement === showElement_ &&
        setClick === setClick_;
      
      toCall();
    };
    
    callTheMethod_();
    
    //BAD Current there is not enough abstraction to only have the show element
    //  be called in the toCall function. There is a prior call to show element
    //  to hide the edit container.
    expect(methodWasCalled).toBe(4);
  });

  
  
  it('should create the validation handler.', function() {
    var methodWasCalled = false;
    var validation = {};
    
    createTheValidationRules_ = function(){
      return validation;
    };
    
    createAValidationWrapper_ = function(validationRules){
      methodWasCalled = validationRules === validation;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should initialize the form.', function() {
    var methodWasCalled = false;
    var validation = {};

    createAValidationWrapper_ = function(){
      return validation;
    };
     
    initializeTheForm_ = function(formId, datePickerInformation, validate, autoFillParameters, onClick){
      methodWasCalled = formId === theForm_ &&
        datePickerInformation[FormConstant_.DatepickerOptions] !== null &&
        datePickerInformation[FormConstant_.DatepickerTextboxes].length === 0 &&
        validate === validation &&
        autoFillParameters === null &&
        onClick !== null;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  it('should return the parent container.', function() {
    expect(callTheMethod_()).toBe(parentContainer_);
  });
};




describe('When initializing an editableDiv, it', function() {
  src.test.control.editableDiv.whenInitializingAnEditableDiv.describe();
});





//--namespace="src.test.control.editableDiv.whenInitializingAnEditableDiv" ^
