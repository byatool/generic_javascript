goog.require('src.base.control.popupDatePicker');

goog.provide('src.test.control.popupDatePicker.whenFormattingTheDate');

/**
 @export
 */
src.test.control.popupDatePicker.whenFormattingTheDate.describe = function () {
  //Using
  
  //Fields
  var Date_ = 12;
  var Month_ = 12;
  var Year_ = 2012;
  
  var theDate_;
  
  //Test Hooks
  beforeEach(function() {
    theDate_ = {};
    theDate_.getMonth = function() { return Month_; };
    theDate_.getYear = function() { return Year_; };
    theDate_.getDate = function() { return Date_; };
  });
  
  //Support Methods
  var callTheMethod_ = function() {
    return src.base.control.popupDatePicker.formatTheDate(theDate_);
  };
  
  
  //Test Methods
  
  it('should return the correct format.', function() {
    expect(callTheMethod_()).toBe('13/12/2012');
    //That's right kids, js .getMonth method returns 0-11, not 1-12.
    //  Makes the test look odd though.
  });
};


describe('When formatting the date, it', function() {
  src.test.control.popupDatePicker.whenFormattingTheDate.describe();
});
