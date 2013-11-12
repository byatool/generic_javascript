goog.require('goog.string');
goog.require('src.base.helper.domHelper');
goog.require('src.base.control.controlConstant');

goog.provide('src.test.helper.domHelper.whenCreatingAControlResult');

/**
 @export
 */
src.test.helper.domHelper.whenCreatingAControlResult.describe = function () {
  
  //Using
  
  var ControlConstant_ = src.base.control.controlConstant;
  var Current_ = src.base.helper.domHelper;
  
  
  //Fields
  
  var element_;
  var options_;
  

  //Test Hooks
   
  beforeEach(function() {
    element_ = {};
    options_ = {};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.createControlResult(element_, options_);
  };
  
  //Test Methods
  
  it('should set the created control.', function() {
    expect(callTheMethod_()[ControlConstant_.CreatedControl]).toBe(element_);
  });
  
  it('should set the created options.', function() {
    expect(callTheMethod_()[ControlConstant_.CreatedOptions]).toBe(options_);
  });
};

describe('When creating a control result, it', function() {
  src.test.helper.domHelper.whenCreatingAControlResult.describe();
});


//--namespace="src.test.helper.domHelper.whenCreatingAControlResult" ^
