goog.require('goog.string');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.editableDiv.form');
goog.require('src.base.control.editableDiv.constant');

goog.provide('src.test.control.editableDiv.form.whenSettingTheCancelHandler');

/**
 @export
 */
src.test.control.editableDiv.form.whenSettingTheCancelHandler.describe = function () {
  
  //Using
  
  var Constant_ = src.base.control.editableDiv.constant;
  var ControlConstant_ = src.base.control.controlConstant;
  var Current_ = src.base.control.editableDiv.form;
  
  
  //Fields
  
  var cancelButton_;
  var form_;
  var toCall_;
  var getElementByClass_;
  var setClick_;
  
  //Test Hooks
  
  beforeEach(function() {
    cancelButton_ = {};
    form_ = {};
     
    getElementByClass_ = function() { return cancelButton_; };
    setClick_ = function(){};
    toCall_ = function() {};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.setCancelHandler(form_, toCall_, getElementByClass_, setClick_);
  };
  
  
  //Test Methods
  
  it('should find the cancel button.', function() {
    var methodWasCalled = false;
    var item = {};
    item[ControlConstant_.Id] = Constant_.ButtonCancel;
    
    getElementByClass_ = function(toFind, parent){
      methodWasCalled = methodWasCalled ||
        (Constant_.ButtonCancel !== undefined &&
         parent === form_ &&
         toFind === Constant_.ButtonCancel);
      
      return cancelButton_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should set the click handler for the cancel button.', function() {
    var methodWasCalled = 0;
    
    toCall_ = function() {
      methodWasCalled += 1;
    };
    
    setClick_ = function(element, toDo){
      methodWasCalled += element === cancelButton_;
      toDo();
    };
     
    callTheMethod_();
    
    expect(methodWasCalled).toBe(2);
  });
  
  
};

describe('When setting the cancel handler, it', function() {
  src.test.control.editableDiv.form.whenSettingTheCancelHandler.describe();
});


//--namespace="src.test.control.editableDiv.form.whenSettingTheCancelHandler" ^
