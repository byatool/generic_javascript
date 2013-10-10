goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.events');
goog.require('goog.ui.DatePicker');
goog.require('goog.ui.DatePicker.Events');
goog.require('src.base.control.popupDatePicker');
goog.require('src.base.control.controlConstant');

goog.provide('src.test.control.popupDatePicker.whenInitializingAPopupDatePicker');


/**
 @export
 */
src.test.control.popupDatePicker.whenInitializingAPopupDatePicker.describe = function () {
  
   // Using
  
  var Constant_ = src.base.control.popupDatePicker.constant;
  var ControlConstant_ = src.base.control.controlConstant;
  var Current_ = src.base.control.popupDatePicker;
  
  
  
  //Fields
  
  var ButtonClass_ = goog.string.getRandomString();
  var ButtonText_ = goog.string.getRandomString();
  var ContainerClass_ = goog.string.getRandomString();
  var TextboxName_ = goog.string.getRandomString();
  
  //   var PopupClass = goog.string.getRandomString();
  //   var TextboxName = goog.string.getRandomString();
  
  var appendChild_;
  var button_;
  var control_;
  var createAButton_;
  var createADiv_;
  var createdPopup_;
  var createTheDatePicker_;
  var createThePopup_;
  var datePicker_;
  var datePickerContainer_;
  var popupElement_;
  var options_;
  var setTheEvent_;
  var setTheDatePickerEvent_;
  var showPopup_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    options_ = {};
    options_[Constant_.ContainerClass] = ContainerClass_;
    options_[Constant_.ButtonClass] = ButtonClass_;
    options_[Constant_.ButtonText] = ButtonText_;
    options_[Constant_.TextboxName] = TextboxName_;
    
    control_ = {};
    createADiv_ = function(){ return control_; };
    
    button_ = {};
    createAButton_ = function() { return button_; };
    
    datePicker_ = {};
    datePickerContainer_ = {};
    createTheDatePicker_ = function() { return [datePickerContainer_, datePicker_]; };
    
    createdPopup_ = {};
    popupElement_ = {};
    createdPopup_.element_ = popupElement_;
    createThePopup_ = function() {return createdPopup_; };
    
    appendChild_ = function() {};
    
    setTheDatePickerEvent_ = function() {};
    setTheEvent_ = function() {};
    showPopup_ = function() {};
    
    
    
    // options_[Constant_.PopupClass] = PopupClass;
    
    
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return  Current_.create(options_, createADiv_, createAButton_,
                            appendChild_, createThePopup_, createTheDatePicker_,
                            setTheEvent_, setTheDatePickerEvent_,
                            showPopup_);
  };
  
  
  //Test Methods
  
  it('should create the overall container.', function() {
    var methodWasCalled = false;
    
    createADiv_ = function(attributes){
      methodWasCalled = methodWasCalled ||
        (Constant_.ContainerClass !== undefined &&
         attributes[ControlConstant_.Class] === Constant_.ContainerClass);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the popup button.', function() {
    var methodWasCalled = false;
    
    createAButton_ = function(attributes, text){
      methodWasCalled = methodWasCalled ||
        (Constant_.ButtonText !== undefined &&
         Constant_.ButtonClass !== undefined &&
         attributes[ControlConstant_.Type] === ControlConstant_.Button &&
         attributes[ControlConstant_.Class] === Constant_.ButtonClass) &&
         text === ButtonText_;
         
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });

  
  it('should append the popup button to the container.', function() {
    var methodWasCalled = false;
    
    appendChild_ = function(parent, child){
      methodWasCalled = methodWasCalled || 
        (parent === control_ && child === button_);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the date picker and container.', function() {
    var methodWasCalled = false;
    
    createTheDatePicker_ = function(cssClass, createADiv) {
      methodWasCalled = Constant_.DatePickerClass !== undefined &&
        cssClass === Constant_.DatePickerClass &&
        createADiv === createADiv_;
      
      return [datePickerContainer_, datePicker_];
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should set the change event for the date picker.', function() {
    var methodWasCalled = false;
    
    setTheDatePickerEvent_ = function(datePicker, textboxName, getElement,
                                      listen, change, setValue, formatDate) {
      methodWasCalled = datePicker === datePicker_ &&
        textboxName ===  TextboxName_ &&
        getElement === goog.dom.getElement &&
        listen === goog.events.listen &&
        change === goog.ui.DatePicker.Events.CHANGE &&
        setValue === goog.dom.forms.setValue &&
        formatDate === Current_.formatTheDate;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the popup.', function() {
    var methodWasCalled = false;
    
    createThePopup_ = function(popupClass, createADiv){
      methodWasCalled = popupClass === Constant_.PopupClass &&
        createADiv === createADiv_;
      
      return createdPopup_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should set the click event of the popup image.', function() {
    var methodWasCalled = 0;
    
    showPopup_ = function(popUp, button) {
      methodWasCalled += popUp === createdPopup_ &&
        button === button_;
      
    };
    
    setTheEvent_ = function(button, toShow) {
      methodWasCalled += button === button_;
      
      toShow();
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(2);
  });
  
  
  it('should append the popup container to the popup.', function() {
    var methodWasCalled = false;
    
    appendChild_ = function(parent, child){
      methodWasCalled = methodWasCalled || 
        (parent === popupElement_ && child === datePickerContainer_);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });

  
  it('should append the popup element to the parent.', function() {
    var methodWasCalled = false;
    
    appendChild_ = function(parent, child){
      methodWasCalled = methodWasCalled || 
        (parent === control_ && child === popupElement_);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should return the container', function() {
    expect(callTheMethod_()).toBe(control_);
  });
  


  
};


describe('When initializing an popupDatePicker, it', function() {
  src.test.control.popupDatePicker.whenInitializingAPopupDatePicker.describe();
});



