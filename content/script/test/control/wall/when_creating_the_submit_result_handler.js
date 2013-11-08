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
  
  var form_;
  var onSubmit_;
  var result_;
  var setValue_;
  var textEntry_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    result_ = {};
    
    form_ = {};
    textEntry_ = {};
    setValue_ = function() {};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.createTheSubmitResultHandler(form_, textEntry_, onSubmit_, setValue_)(result_);
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
  
};

describe('When creating the submit result handler, it', function() {
  src.test.control.wall.form.whenCreatingTheSubmitResultHandler.describe();
});



