goog.require('goog.object');
goog.require('goog.string');
goog.require('src.base.control.formComponent.constant');
goog.require('src.base.control.wall.form');
goog.require('src.base.control.wall.constant');

goog.provide('src.test.control.wall.form.whenCreatingEmptyDatePickerOptions');

/**
 @export
 */
src.test.control.wall.form.whenCreatingEmptyDatePickerOptions.describe = function () {
  
  //Using
  
  var Constant_ = src.base.control.wall.constant;
  var Current_ = src.base.control.wall.form;
  var FormConstant_ = src.base.control.formComponent.constant; 
  
  
  //Fields
  
  
  //Test Hooks
  
  beforeEach(function() {
    
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.createEmptyDatePickerOptions();
  };
  
  //Test Methods
  
  
  it('should container the empty sub options.', function() {
    var keys = goog.object.getKeys(callTheMethod_()[FormConstant_.DatepickerOptions]);
    //
    expect(keys.length).toBe(0);
  });
  
  
  it('should contain a empty textbox list.', function() {
    expect(callTheMethod_()[FormConstant_.DatepickerTextboxes].length).toBe(0);
  });
};

describe('When creating empty date picker options, it', function() {
  src.test.control.wall.form.whenCreatingEmptyDatePickerOptions.describe();
});



