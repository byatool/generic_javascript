goog.require('goog.string');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.formBuilder');
goog.require('src.base.control.formBuilder.constant');

goog.provide('src.test.control.formBuilder.whenInitializingAFormBuilder');

/**
 @export
 */
src.test.control.formBuilder.whenInitializingAFormBuilder.describe = function () {
  
  //Using
  
  var Current_ = src.base.control.formBuilder;
  var Constant_ = src.base.control.formBuilder.constant;
  var ControlConstant_ = src.base.control.controlConstant;
  
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
  var forEach_;
  var parentContainer_;
  var parentForm_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    parentContainer_ = {};
    controlSpecs_ = {};
    
    appendChild_ = function() {};
    createAControl_ = function() {};
    createAButton_ = function(){};
    createADiv_ = function() { return parentContainer_; };
    createAForm_ = function() { return parentForm_; };
    forEach_ = function(){};
    parentContainer_ = function() {};;
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.initialize(ParentContainerId_, PostTo_, controlSpecs_, createAForm_, forEach_,
                               createADiv_, createAControl_, createAButton_, appendChild_);
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
    
    createAControl_ = function(controlSpec, createADiv, createALabel,
                               createATextbox, appendChild, createAClearDiv){
      methodWasCalled += controlSpec === item &&
        createADiv === createADiv_ &&
        createALabel === src.base.helper.domCreation.label &&
        createATextbox === src.base.helper.domCreation.textbox &&
        appendChild === appendChild_ &&
        createAClearDiv === src.base.helper.domCreation.createAClearDiv;
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
         attributes[ControlConstant_.Class] === Constant_.FormSubmit);
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


  
  it('should append the submit button to the parent.', function() {
    var methodWasCalled = false;
    var submitButton = {};

    createAButton_ = function(){
      return submitButton;
    };
     
    appendChild_ = function(parent, child){
      methodWasCalled = methodWasCalled || 
        (parent === parentContainer_ && child === submitButton);
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
