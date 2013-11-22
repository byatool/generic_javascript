goog.require('goog.string');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.formBuilder.constant');
goog.require('src.base.control.formBuilder.control');

goog.provide('src.test.control.formBuilder.control.whenCreatingAControl');


/**
 @export
 */
src.test.control.formBuilder.control.whenCreatingAControl.describe = function () {
  
  //Using
  
  var Constant_ = src.base.control.formBuilder.constant;
  var ControlConstant_ = src.base.control.controlConstant;
  var Current_ = src.base.control.formBuilder.control;
  
  //Fields
  
  var CssClass_ = goog.string.getRandomString();  
  var Id_ = goog.string.getRandomString();
  
  var appendChild_;
  var container_;
  var controlSpec_;
  var createAClearDiv_;
  var createADiv_;
  var createALabel_;
  var createAndInitializeSelect;
  var createATextbox_;
  var dateContainer_;
  var datePickerControls_;
  var insert_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    controlSpec_ = {};
    controlSpec_[ControlConstant_.Id] = Id_;
    controlSpec_[ControlConstant_.Type] = Constant_.Textbox;
    controlSpec_[ControlConstant_.Class] = CssClass_;
    
    container_ = {};
    dateContainer_ = {};
    datePickerControls_ = [];
    
    appendChild_ = function(){};
    createAClearDiv_ = function(){};
    createADiv_ = function(){ return container_; };
    
    createADiv_ = function(attributes){
      switch(attributes[ControlConstant_.Id]) {
      case Constant_.FormRowContainer:
        return container_;
        break;
      default:
        return dateContainer_;
      }};
    
    
    createALabel_ = function() {};
    createAndInitializeSelect = function(){};
    createATextbox_ = function(){};
    insert_ = function(){};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.createControl(controlSpec_, datePickerControls_, createADiv_, createALabel_,
                                  createATextbox_, createAndInitializeSelect, appendChild_, createAClearDiv_,
                                  insert_);
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
  
  
  it('should create a textbox if it is a text type.', function() {
    var methodWasCalled = false;
    
    createATextbox_ = function(attributes){
      methodWasCalled = methodWasCalled ||
        (Constant_.Textbox !== undefined &&
         attributes[ControlConstant_.Class] === CssClass_ &&
         attributes[ControlConstant_.Id] === Id_ &&
         attributes[ControlConstant_.Name] === Id_);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should append the created textbox if it text type.', function() {
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
  
  
  it('should create a textbox if it is a date type.', function() {
    var methodWasCalled = false;
    
    controlSpec_[ControlConstant_.Type] = Constant_.Date;
    
    createATextbox_ = function(attributes){
      methodWasCalled = methodWasCalled ||
        (Constant_.Textbox !== undefined &&
         attributes[ControlConstant_.Class] === CssClass_ &&
         attributes[ControlConstant_.Id] === Id_ &&
         attributes[ControlConstant_.Name] === Id_);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should append the created textbox if it text type.', function() {
    var methodWasCalled = false;
    var element = {};
    
    controlSpec_[ControlConstant_.Type] = Constant_.Date;
    
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
  
  
  it('should create the date picker holder.', function() {
    var methodWasCalled = false;
    
    controlSpec_[ControlConstant_.Type] = Constant_.Date;
    
    createADiv_ = function(attributes){
      methodWasCalled = methodWasCalled ||
        (Constant_.Date !== undefined &&
         Constant_.DateSuffix !== undefined &&
         attributes[ControlConstant_.Id] === Id_ + Constant_.DateSuffix &&
         attributes[ControlConstant_.Name] === Id_ + Constant_.DateSuffix);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should add it to the date picker controls list.', function() {
    var methodWasCalled = false;
    var textbox = {};
    
    controlSpec_[ControlConstant_.Type] = Constant_.Date;
    
    createATextbox_ = function(){
      return textbox;
    };
    
    insert_ = function(list, item){
      methodWasCalled = list === datePickerControls_ &&
        item[0] === Id_ + Constant_.DateSuffix &&
        item[1] === textbox;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should not create a date picker if it is not a date control.', function() {
    var methodWasCalled = false;
    
    createADiv_ = function(attributes){
      methodWasCalled = attributes[ControlConstant_.Id] === Id_ + Constant_.DateSuffix;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(false);
  });
  
  
  
  it('should create a select if it is the type.', function() {
    var methodWasCalled = false;
    
    controlSpec_[ControlConstant_.Type] = Constant_.Select;
    
    createAndInitializeSelect = function(controlSpec, createASelect, initializeASelect){
      methodWasCalled = controlSpec === controlSpec_ &&
        createASelect === src.base.helper.domCreation.select &&
        initializeASelect === src.base.control.dropDownList.initialize;
    };
    
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should append the select to the parent.', function() {
    var methodWasCalled = false;
    var select = {};
    
    controlSpec_[ControlConstant_.Type] = Constant_.Select;
    
    createAndInitializeSelect = function(){
      return select;
    };
    
    
    appendChild_ = function(parent, child){
      methodWasCalled = methodWasCalled || 
        (parent === container_ && child === select);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should not create a textbox if it is a select.', function() {
    var methodWasCalled = false;
    
    controlSpec_[ControlConstant_.Type] = Constant_.Select;
    
    createATextbox_ = function(){
      methodWasCalled = true;
    };
    
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(false);
  });
   
  
  it('should append the date picker container to the parent.', function() {
    var methodWasCalled = false;
    
    controlSpec_[ControlConstant_.Type] = Constant_.Date;
    
    appendChild_ = function(parent, child){
      methodWasCalled = methodWasCalled || 
        (parent === container_ && child === dateContainer_);
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
  src.test.control.formBuilder.control.whenCreatingAControl.describe();
});
