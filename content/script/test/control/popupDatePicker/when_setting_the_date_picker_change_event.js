goog.require('goog.string');
goog.require('src.base.control.popupDatePicker');

goog.provide('src.test.control.popupDatePicker.whenSettingTheDatePickerChangeEvent');

/**
 
 @export
 */
src.test.control.popupDatePicker.whenSettingTheDatePickerChangeEvent.describe = function() {

  //Using

  var Current_ = src.base.control.popupDatePicker;
  
   
  //Fields
  
  var ChangeType_ = goog.string.getRandomString();
  var TextboxName_ = goog.string.getRandomString();
  
  var datePicker_;
  var findElement_;
  var formatTheDate_;
  var listen_;
  var setValue_;
  var textbox_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    
    findElement_ = function() { return textbox_; };
    formatTheDate_ = function() { return ''; };
    
    listen_ = function(item, eventType, toCall){
      item[eventType] = toCall;
    };
    
    setValue_ = function() {};
    
    datePicker_ = {};
    textbox_ = {};
    textbox_['focus'] = function() {};
  });
  
  
  //Support Methods
  
  var callTheMethod = function() {
    Current_.setTheDatePickerEvent(datePicker_, TextboxName_, findElement_, listen_,
                                   ChangeType_, setValue_, formatTheDate_);
  };
  
  
  //Test Methods
  
  it('should find the textbox.', function() {
    var methodWasCalled = false;
    
    findElement_ = function(textboxName) {
      methodWasCalled = textboxName === TextboxName_;
      return {};
    };
    
    callTheMethod();
    expect(methodWasCalled).toBe(true);
    
  });
  
  
  it('should set using the listen function.', function() {
    var methodWasCalled = false;
    
    listen_ = function(datePicker, changeType, setValue) {
      methodWasCalled = datePicker === datePicker_ &&
        changeType === ChangeType_;
    };
    
    callTheMethod();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should set the value.', function() {
    var eventIn = {};
    var methodWasCalled = false;
    
    setValue_ = function(textbox, event){
      methodWasCalled = textbox === textbox_ &&
        event === 'none';
    };
    
    callTheMethod();
    datePicker_[ChangeType_](eventIn);
    
    expect(methodWasCalled).toBe(true);
  });

 
  it('should call focus when the change event is fired.', function() {
    var methodWasCalled = false;
    textbox_['focus'] = function() {
      methodWasCalled = true;
    };
     
    callTheMethod();
    datePicker_[ChangeType_]({});
    
    expect(methodWasCalled).toBe(true);
  });
  
};

describe('When setting the date picker change event, it', function() {
  src.test.control.popupDatePicker.whenSettingTheDatePickerChangeEvent.describe();
});
