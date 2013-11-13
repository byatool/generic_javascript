goog.require('goog.string');
goog.require('src.base.control.formComponent.constant');
goog.require('src.base.control.wall.constant');
goog.require('src.base.control.wall.form');

goog.provide('src.test.control.wall.form.whenCreatingTheEntryForm');

/**
 @export
 */
src.test.control.wall.form.whenCreatingTheEntryForm.describe = function () {
  
  //Using
  
  var Constant_ = src.base.control.wall.constant;
  var ControlConstant_ = src.base.control.controlConstant;
  var Current_ = src.base.control.wall.form;
  var FormComponentConstant_ = src.base.control.formComponent.constant;
  
  
  //Fields
  
  var PostTo_ = goog.string.getRandomString();
  var SubjectId_ = goog.string.getRandomString();
  
  var appendChild_;
  var createAButton_;
  var createAForm_;
  var createAHidden_;
  var createALabelInput_;
  var createATextbox_;
  var form_;
  var setValue_;
  var textbox_;
  var textboxLabel_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    form_ = {};
    
    appendChild_ = function(){};
    createAButton_ = function() {};
    createAForm_ = function() { return form_; };
    createAHidden_ = function(){};
    createATextbox_ = function() { return textbox_;};

    textbox_ = {};
    textboxLabel_ = {};
    textboxLabel_.decorate = function() {};
    createALabelInput_ = function(){ return textboxLabel_; };
    setValue_ = function(){};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.create(PostTo_, SubjectId_, createAForm_, createATextbox_, createALabelInput_,
                           createAHidden_, setValue_, createAButton_, appendChild_);
  };
  
  
  //Test Methods
  
  it('should create the entry form.', function() {
    var methodWasCalled = false;
    createAForm_ = function(attributes){
      methodWasCalled = methodWasCalled ||
        (Constant_.EntryForm !== undefined && 
         attributes[ControlConstant_.Id] === Constant_.EntryForm &&
         attributes[ControlConstant_.Class] === Constant_.EntryForm &&
         attributes[ControlConstant_.Method] === ControlConstant_.Post &&
         attributes[ControlConstant_.Action] === PostTo_);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the text entry.', function() {
    var methodWasCalled = false;
    
    createATextbox_ = function(attributes){
      methodWasCalled = methodWasCalled ||
        (Constant_.EntryTextbox !== undefined &&
         attributes[ControlConstant_.Class] === Constant_.EntryTextbox &&
         attributes[ControlConstant_.Id] === Constant_.EntryTextbox &&
         attributes[ControlConstant_.Name] === Constant_.EntryTextbox &&
         attributes[ControlConstant_.Placeholder] === Constant_.EntryTextboxLabel);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the subject id holder.', function() {
    var methodWasCalled = false;
    
    createAHidden_ = function(attributes){
      methodWasCalled = methodWasCalled ||
        (Constant_.EntryHiddenId !== undefined &&
         attributes[ControlConstant_.Id] === Constant_.EntryHiddenId &&
         attributes[ControlConstant_.Name] === Constant_.EntryHiddenId);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should set the value of subject id holder.', function() {
    var methodWasCalled = false;
    var hidden = {};
    
    createAHidden_ = function(){
      return hidden;
    };
    
    setValue_ = function(element, value){
      methodWasCalled = element === hidden &&
        value === SubjectId_;
    };
    
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the submit button.', function() {
    var methodWasCalled = false;
    createAButton_ = function(attributes, text){
      methodWasCalled = methodWasCalled ||
        (Constant_.EntrySubmit !== undefined &&
         Constant_.EntrySubmitText !== undefined &&
         attributes[ControlConstant_.Class] === FormComponentConstant_.ButtonClass &&
         attributes[ControlConstant_.Id] === Constant_.EntrySubmit &&
         attributes[ControlConstant_.Type] === ControlConstant_.Button) &&
        text === Constant_.EntrySubmitText;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should append the text entry to the form.', function() {
    var methodWasCalled = false;
    var textEntry = {};
    
    createATextbox_ = function(){
      return textEntry;
    };
    
    appendChild_ = function(parent, child){
      methodWasCalled = methodWasCalled || 
        (parent === form_ && child === textEntry);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  
  it('should append the id holder to the form.', function() {
    var methodWasCalled = false;
    var idHolder = {};
    
    createAHidden_ = function(){
      return idHolder;
    };
    
    appendChild_ = function(parent, child){
      methodWasCalled = methodWasCalled || 
        (parent === form_ && child === idHolder);
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
        (parent === form_ && child === submitButton);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });


  
  it('should return the created form', function() {
    expect(callTheMethod_()).toBe(form_);
  });
  
  
  
  
};

describe('When creating the entry form, it', function() {
  src.test.control.wall.form.whenCreatingTheEntryForm.describe();
});



