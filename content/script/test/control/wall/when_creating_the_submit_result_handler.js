goog.require('goog.string');
goog.require('src.base.control.wall.form');
goog.require('src.base.control.wall.constant');

goog.provide('src.test.control.wall.form.whenCreatingTheSubmitResultHandler');

/**
 @export
 */
src.test.control.wall.form.whenCreatingTheSubmitResultHandler.describe = function () {
  
  //Using
  
  var Constant_ = src.base.control.wall.constant;
  var Current_ = src.base.control.wall.form;
  
  
  //Fields
  
  var onSubmit_;
  var result_;
  var setValue_;
  var textEntry_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    result_ = {};
    textEntry_ = {};
    
    onSubmit_ = function() {};
    setValue_ = function() {};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.createTheSubmitResultHandler(textEntry_, onSubmit_, setValue_)(result_);
  };
  
  
  //Test Methods
  
  
  it('should remove the entered text.', function() {
    var methodWasCalled = false;
    
    setValue_ = function(textEntry, value){
      methodWasCalled = textEntry === textEntry_ &&
        value === '';
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
   
  
  it('should call the on submit function with the result.', function() {
    var methodWasCalled = false;
    
    onSubmit_ = function(result){
      methodWasCalled = result === result_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should not call a null on submit funtion.', function() {
    var noError = true;
    
    onSubmit_ = null;
    
    callTheMethod_();
    
    expect(noError).toBe(true);
  });
  
};

describe('When creating the submit result handler, it', function() {
  src.test.control.wall.form.whenCreatingTheSubmitResultHandler.describe();
});



