goog.require('goog.string');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.editableDiv.constant');
goog.require('src.base.control.editableDiv.form');


goog.provide('src.test.control.editableDiv.form.whenCreatingTheForm');

/**
 @export
 */
src.test.control.editableDiv.form.whenCreatingTheForm.describe = function () {
  
  //Using
  
  var Constant_ = src.base.control.editableDiv.constant;
  var ControlConstant_ = src.base.control.controlConstant;
  var Current_ = src.base.control.editableDiv.form;
  
  
  //Fields
  
  var FormId_ = goog.string.getRandomString();
  var PostTo_ = goog.string.getRandomString();
  
  var appendChild_;
  var cancelButton_;
  var createAButton_;
  var createAForm_;
  var createATextArea_;
  var editTextArea_;
  var form_;
  var submitButton_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    cancelButton_ = {};
    editTextArea_ = {};
    form_ = {};
    submitButton_ = {};
    
    appendChild_ = function(){};
    createAForm_ = function() { return form_; };
    createATextArea_ = function() { return editTextArea_;};
    
    
    createAButton_ = function(attributes){
      switch(attributes[ControlConstant_.Class]) {
      case Constant_.ButtonSubmit:
        return submitButton_;
        break;
        
      case Constant_.ButtonCancel:
        return cancelButton_;
        break;
        
      default:
        return submitButton_;                      
      }};
    
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.createTheForm(FormId_, PostTo_, createAForm_, createATextArea_,
                                  createAButton_, appendChild_);
  };
  
  //Test Methods
  it('should create the form.', function() {
    var methodWasCalled = false;
    createAForm_ = function(attributes){
      methodWasCalled = methodWasCalled ||
        (Constant_.FormId !== undefined && 
         attributes[ControlConstant_.Id] === Constant_.FormId  &&
         attributes[ControlConstant_.Class] === Constant_.FormId  &&
         attributes[ControlConstant_.Method] === ControlConstant_.Post &&
         attributes[ControlConstant_.Action] === PostTo_);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the text edit holder.', function() {
    var methodWasCalled = false;
    
    createATextArea_ = function(attributes){
      methodWasCalled = methodWasCalled ||
        (Constant_.EditTextArea !== undefined &&
         attributes[ControlConstant_.Class] === Constant_.EditTextArea);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should append the edit text area to the form.', function() {
    var methodWasCalled = false;
    
    appendChild_ = function(parent, child){
      methodWasCalled = methodWasCalled || 
        (parent === form_ && child === editTextArea_);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  it('should create the Submit button.', function() {
    var methodWasCalled = false;

    createAButton_ = function(attributes, text){
      methodWasCalled = methodWasCalled ||
        (Constant_.ButtonSubmit !== undefined &&  
         attributes[ControlConstant_.ButtonType] === ControlConstant_.Button &&
         attributes[ControlConstant_.Id] === Constant_.ButtonSubmit &&
         attributes[ControlConstant_.Class] === Constant_.ButtonSubmit) &&
        text === Constant_.ButtonSubmitText;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
   
  
  it('should append the submit button to the form.', function() {
    var methodWasCalled = false;
    
    appendChild_ = function(parent, child){
      methodWasCalled = methodWasCalled || 
        (parent === form_ && child === submitButton_);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });

  
  it('should create the Cancel button.', function() {
    var methodWasCalled = false;
    createAButton_ = function(attributes, text){
      methodWasCalled = methodWasCalled ||
        (Constant_.ButtonCancel !== undefined &&  
         attributes[ControlConstant_.ButtonType] === ControlConstant_.Button &&
         attributes[ControlConstant_.Id] === Constant_.ButtonCancel &&
         attributes[ControlConstant_.Class] === Constant_.ButtonCancel) &&
        text === Constant_.ButtonCancelText;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should append the cancel button to the form.', function() {
    var methodWasCalled = false;
    
    appendChild_ = function(parent, child){
      methodWasCalled = methodWasCalled || 
        (parent === form_ && child === cancelButton_);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should return the created form.', function() {
    expect(callTheMethod_()[ControlConstant_.CreatedControl]).toBe(form_);
  });
  
  
  it('should return the created options.', function() {
    var options = callTheMethod_()[ControlConstant_.CreatedOptions];
    var isValid = options[ControlConstant_.Action] === PostTo_;
    
    expect(isValid).toBe(true);
  });
};

describe('When creating the editable div form, it', function() {
  src.test.control.editableDiv.form.whenCreatingTheForm.describe();
});


//--namespace="src.test.control.editableDiv.form.whenCreatingTheForm"^ 
