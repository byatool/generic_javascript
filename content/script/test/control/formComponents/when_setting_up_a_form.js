goog.require('goog.string');
goog.require('src.base.control.formComponent');
goog.require('src.base.control.formComponent.constant');
goog.require('src.base.control.popupDatePicker');

goog.provide('src.test.control.formComponent.whenSettingUpAForm');

/**
 @export
 */
src.test.control.formComponent.whenSettingUpAForm.describe = function() {
  //Fields
  
  var Constant_ = src.base.control.formComponent.constant;
  var Current_ = src.base.control.formComponent;
  var PopupConstant_ = src.base.control.popupDatePicker.constant;
  
  var ContainerOne_ = goog.string.getRandomString();
  var FormId_ = goog.string.getRandomString();
  var MessageBoxId_ = goog.string.getRandomString();
  var TextboxOne_ = goog.string.getRandomString();
  
  var addElement_;
  var createADatePicker_;
  var createMessageBox_;
  var datePickerOptions_;
  var findElement_;
  var findNode_;
  var forEach_;
  var form_;
  var messageBox_;
  var textboxes_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    findElement_ = function() { return form_; };
    findNode_ = function(){};
    createMessageBox_ = function() { return messageBox_; };
    addElement_ = function() { };
    
    createADatePicker_ = function() { return {}; };
    datePickerOptions_ = {};
    datePickerOptions_[PopupConstant_.TextboxName] = '';
    
    forEach_ = function(){};
    textboxes_ = [[ContainerOne_, TextboxOne_]];
    
    form_ = {};
    messageBox_ = {};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.setupTheForm(FormId_, datePickerOptions_, textboxes_, MessageBoxId_,
                                findElement_, forEach_, findNode_, createMessageBox_, addElement_,
                                createADatePicker_);
  };
  
  
  //Test Methods
  
  it('should find the form.', function() {
    var methodWasCalled = false;
    
    findElement_ = function(formId) {
      if (!methodWasCalled) {
        methodWasCalled = formId === FormId_;
      }
      
      return {};
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create a message box.', function() {
    var methodWasCalled = false;
    
    createMessageBox_ = function(messageBoxId) {
      methodWasCalled = messageBoxId === MessageBoxId_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should add the message box to the form.', function() {
    var methodWasCalled = false;
    
    addElement_ = function(formToCheck, messageBoxToCheck) {
      if (!methodWasCalled) {
        methodWasCalled = formToCheck === form_ && messageBoxToCheck === messageBox_;
      }
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should find the future date picker container.', function() {
    var pointsHit = 0;
    var dateContainer = {};
    
    dateContainer['id'] = ContainerOne_;
    
    findNode_ = function(element, toFind) {
      pointsHit += element === form_;
      pointsHit += toFind(dateContainer) === true;
    };
    
    forEach_ = function(containerAndTextboxList, toDo) {
      pointsHit += containerAndTextboxList === textboxes_;
      toDo(textboxes_[0]);
    };
    
    callTheMethod_();
    
    expect(pointsHit).toBe(3);
  });
  
  
  
  it('should create the date picker.', function() {
    var methodWasCalled = false;

    forEach_ = function(containerAndTextboxList, toDo) {
      toDo(textboxes_[0]);
    };
    
    createADatePicker_ = function(options) {
      methodWasCalled = PopupConstant_.TextboxName !== undefined &&
        options === datePickerOptions_ &&
        options[PopupConstant_.TextboxName] === TextboxOne_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should add the date picker to the found container.', function() {
    var methodWasCalled = false;
    var createdDatePicker = {};
    var theContainer = {};
    
    
    findNode_ = function() {
      return theContainer;
    };
    
    createADatePicker_ = function(){
      return createdDatePicker;
    };
    
    
    forEach_ = function(containerAndTextboxList, toDo) {
      toDo(textboxes_[0]);
    };
    
    addElement_ = function(datePickerContainer, datePicker) {
      methodWasCalled = datePickerContainer === theContainer &&
        datePicker === createdDatePicker;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should return the form.', function() {
    expect(Constant_.Form !== undefined &&
           callTheMethod_()[Constant_.Form] === form_).toBe(true);
  });

  
  it('should return the message box.', function() {
    expect(Constant_.MessageBox !== undefined &&
           callTheMethod_()[Constant_.MessageBox] === messageBox_).toBe(true);
  });
  
};

describe('When setting up a form, it', function() {
  src.test.control.formComponent.whenSettingUpAForm.describe();
});
