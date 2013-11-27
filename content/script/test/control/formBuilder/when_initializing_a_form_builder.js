goog.require('goog.object');
goog.require('goog.string');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.formBuilder');
goog.require('src.base.control.formBuilder.constant');
goog.require('src.base.control.formComponent.constant');
goog.require('src.base.control.popupDatePicker.constant');

goog.provide('src.test.control.formBuilder.whenInitializingAFormBuilder');

/**
 @export
 */
src.test.control.formBuilder.whenInitializingAFormBuilder.describe = function () {
  
  //Using
  
  var Current_ = src.base.control.formBuilder;
  var Constant_ = src.base.control.formBuilder.constant;
  var ControlConstant_ = src.base.control.controlConstant;
  var DatePickerConstant_ = src.base.control.popupDatePicker.constant;
  var FormConstant_ = src.base.control.formComponent.constant;
  var FormComponentConstant_ = src.base.control.formComponent.constant;
  
  
  //Fields
  
  var ParentContainerId_ = goog.string.getRandomString();
  var ParentContainerClass_ = goog.string.getRandomString();
  var PostTo_ = goog.string.getRandomString();
  
  var appendChild_;
  var controlSpecs_;
  var createAButton_;
  var createAControl_;
  var createADiv_;
  var createAForm_;
  var createValidation_;
  var initializeTheForm_;
  var forEach_;
  var parentContainer_;
  var parentForm_;
  var postSubmit_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    parentContainer_ = {};
    parentForm_ = {};
    controlSpecs_ = {};
    
    appendChild_ = function() {};
    createAControl_ = function() {};
    createAButton_ = function(){};
    createADiv_ = function() { return parentContainer_; };
    createAForm_ = function() { return parentForm_; };
    createValidation_ = function(){};
    forEach_ = function(){};
    initializeTheForm_ = function(){};
    postSubmit_ = function() {};
    parentContainer_ = function() {};;
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.initialize(ParentContainerId_, PostTo_, controlSpecs_, postSubmit_, createAForm_, forEach_,
                               createADiv_, createAControl_, createAButton_, appendChild_, createValidation_,
                               initializeTheForm_);
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
  
  
  it('should create the parent form.', function() {
    var methodWasCalled = false;
    
    createAForm_ = function(attributes){
      methodWasCalled = Constant_.FormId !== undefined &&
        attributes[ControlConstant_.Action] === PostTo_ &&
        attributes[ControlConstant_.Class] === Constant_.FormId &&
        attributes[ControlConstant_.Method] === ControlConstant_.Post &&
        attributes[ControlConstant_.Id] === Constant_.FormId;
      
      return parentForm_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the element per control spec.', function() {
    var methodWasCalled = false;
    var item = {};
    
    createAControl_ = function(controlSpec, datePickerControls){
      
      methodWasCalled += controlSpec === item &&
        datePickerControls.length === 0;
    };
    
    forEach_ = function(items, toDo){
      methodWasCalled += items === controlSpecs_;
      toDo(item);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(2);
  });
  
  
  it('should append the created control row to the form.', function() {
    var methodWasCalled = false;
    var controlRow = {};
    
    createAControl_ = function(){
      return controlRow;
    };
    
    
    forEach_ = function(element, toDo){
      toDo();
    };
    
    appendChild_ = function(parent, child){
      methodWasCalled = methodWasCalled || 
        (parent === parentForm_ && child === controlRow);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the Submit button.', function() {
    var methodWasCalled = false;
    
    createAButton_ = function(attributes, text){
      methodWasCalled = methodWasCalled ||
        (Constant_.FormSubmit !== undefined &&
         attributes[ControlConstant_.Id] === Constant_.FormSubmit &&
         attributes[ControlConstant_.Type] === ControlConstant_.Button &&
         attributes[ControlConstant_.Class] === FormComponentConstant_.ButtonClass);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });

   
  it('should append the submit button to the form.', function() {
    var methodWasCalled = false;
    var submitButton = {};
    
    createAButton_ = function(){
      return submitButton;
    };
    
    appendChild_ = function(parent, child){
      methodWasCalled = methodWasCalled || 
        (parent === parentForm_ && child === submitButton);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should append the form to the parent.', function() {
    var methodWasCalled = false;
    
    appendChild_ = function(parent, child){
      methodWasCalled = methodWasCalled || 
        (parent === parentContainer_ && child === parentForm_);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the validation wrapper.', function() {
    var methodWasCalled = false;
    
    createValidation_ = function(spec){
      methodWasCalled = controlSpecs_ === spec;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should initialize the form.', function() {
    var methodWasCalled = false;
    var validation = {};
    
    createValidation_ = function(){
      return validation;
    };
    
    initializeTheForm_ = function(form, datePickerOptions, validate, autoFillParameters,
                                  onClick){
      var theOptions = datePickerOptions[FormComponentConstant_.DatepickerOptions];
      
      methodWasCalled = form === parentForm_ &&
        theOptions[DatePickerConstant_.ButtonText] === '' &&
        theOptions[DatePickerConstant_.TextboxName] === 'theTextbox' &&
        datePickerOptions[FormConstant_.DatepickerTextboxes].length === 0 &&
        validate === validation &&
        autoFillParameters === null &&
        onClick === postSubmit_;
      
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
   
  it('should initialize the form with a junk function if no on submit function is given.', function() {
    var methodWasCalled = true;
    postSubmit_ = null;
    
    initializeTheForm_ = function(form, datePickerOptions, validate, autoFillParameters,
                                  onClick){
      onClick();
    };
    
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  
  it('should return the parent container.', function() {
    expect(callTheMethod_()).toBe(parentContainer_);
  });
};


describe('When initializing an formBuilder, it', function() {
  src.test.control.formBuilder.whenInitializingAFormBuilder.describe();
});

//--namespace="src.test.control.formBuilder.whenInitializingAFormBuilder" ^
