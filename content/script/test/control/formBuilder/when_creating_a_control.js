goog.require('goog.string');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.formBuilder');
goog.require('src.base.control.formBuilder.constant');

goog.provide('src.test.control.formBuilder.whenCreatingAControl');


/**
 @export
 */
src.test.control.formBuilder.whenCreatingAControl.describe = function () {
  
  //Using
  
  var Constant_ = src.base.control.formBuilder.constant;
  var ControlConstant_ = src.base.control.controlConstant;
  var Current_ = src.base.control.formBuilder;
  
  
  //Fields
  
  var appendChild_;
  var container_;
  var controlSpec_;
  var createAClearDiv_;
  var createADiv_;
  var createALabel_;
  var createATextbox_;

  
  //Test Hooks
  
  beforeEach(function() {
    controlSpec_ = {};
    container_ = {};

    appendChild_ = function(){};
    createAClearDiv_ = function(){};
    createADiv_ = function(){ return container_; };
    createALabel_ = function() {};
    createATextbox_ = function(){};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.createControl(controlSpec_, createADiv_, createALabel_,
                                  createATextbox_, appendChild_, createAClearDiv_);
  };
  
  
  //Test Methods
  
  it('should create the control holder.', function() {
    var methodWasCalled = false;
    
    createADiv_ = function(attributes){
      methodWasCalled = methodWasCalled ||
        (Constant_.FormRowContainer !== undefined &&
         attributes[ControlConstant_.Class] === Constant_.FormRowContainer);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the label holder.', function() {
    var methodWasCalled = false;
    var labelText = {};
    
    controlSpec_[Constant_.LabelText] = labelText;
    
    createALabel_ = function(attributes, text){
      methodWasCalled = methodWasCalled ||
        (Constant_.FormRowLabel !== undefined &&
         attributes[ControlConstant_.Class] === Constant_.FormRowLabel &&
         text === labelText);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  
  it('should create a textbox.', function() {
    var methodWasCalled = false;
    var cssClass = {};
    var id = {};
    
    controlSpec_[ControlConstant_.Class] = cssClass;
    controlSpec_[ControlConstant_.Id] = id;
    controlSpec_[ControlConstant_.Type] = Constant_.Textbox;
    
    createATextbox_ = function(attributes){
      methodWasCalled = methodWasCalled ||
        (Constant_.Textbox !== undefined &&
         attributes[ControlConstant_.Class] === cssClass &&
         attributes[ControlConstant_.Id] === id &&
         attributes[ControlConstant_.Name] === id);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
   
  
  it('should append the label to the row.', function() {
    var methodWasCalled = false;
    var label = {};
    
    createALabel_ = function(){ return label; };
    
    appendChild_ = function(parent, child){
      methodWasCalled = methodWasCalled || 
        (parent === container_ && child === label);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });


  
  it('should append the created element to the row.', function() {
    var methodWasCalled = false;
    var element = {};

    createATextbox_ = function(){
      return element;
    };
    
    appendChild_ = function(parent, child){
      methodWasCalled = methodWasCalled || 
        (parent === container_ && child === element);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
   
  
  it('should append a clear div.', function() {
    var methodWasCalled = false;
    var clearDiv = {};
    
    createAClearDiv_ = function() {
      return clearDiv;
    };
    
    appendChild_ = function(parent, child){
      methodWasCalled = methodWasCalled || 
        (parent === container_ && child === clearDiv);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should return the created control.', function() {
     expect(callTheMethod_()).toBe(container_);
  });
  
  
  
};

describe('When creating a control, it', function() {
  src.test.control.formBuilder.whenCreatingAControl.describe();
});


//--namespace="src.test.control.formBuilder.whenCreatingAControl" ^
