goog.require('goog.string');
goog.require('src.base.control.autocomplete');
goog.provide('src.test.control.autocomplete.WhenClearingTheAutoComplete');

/**
 @export
 */
src.test.control.autocomplete.WhenClearingTheAutoComplete.describe = function () {
  
  //Using
  
  var Current_ = src.base.control.autocomplete;
  
  
  //Fields
  
  var HiddenId_ = goog.string.getRandomString();
  var InputClass_ = goog.string.getRandomString();
  
  var findElementByClass_;
  var findNode_;
  var options_;
  var setValue_;
  var theAutocomplete_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    options_ = {};
    options_[Current_.InputClass] = InputClass_;
    options_[Current_.HiddenId] = HiddenId_;
    
    findElementByClass_ = function(){};
    setValue_ = function() {};
  });
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.clearTheAutocomplete(theAutocomplete_, options_, findElementByClass_,
                                         findNode_, setValue_);
  };
  
  
  //Test Methods
  
  
  it('should find the textbox.', function() {
    var methodWasCalled = false;
    
    findElementByClass_ = function(cssClass, parent) {
      methodWasCalled = cssClass === InputClass_ &&
        parent === theAutocomplete_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should clear the textbox value.', function() {
    var timesCalled = 0;
    var textbox = {};
    
    findElementByClass_ = function() {
      return textbox;
    };
    
    setValue_ = function(element, value){
      timesCalled += element === textbox &&
        value === '';
    };
    
    callTheMethod_();
    
    expect(timesCalled).toBe(1);
  });
  
  
  it('should find the hidden element.', function() {
    var methodWasCalled = false;
    var hidden = {};
    hidden['id'] = HiddenId_;
    
    findNode_ = function(autocomplete, toFind){
      methodWasCalled = autocomplete === theAutocomplete_ &&
        toFind(hidden);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  it('should clear the hidden value.', function() {
    var timesCalled = 0;
    var hidden = {};
    
    findNode_ = function() {
      return hidden;
    };
    
    setValue_ = function(element, value){
      timesCalled += element === hidden &&
        value === '';
    };
    
    callTheMethod_();
    
    expect(timesCalled).toBe(1);
  });
  
};


describe('When clearing the autocomplete, it', function() {
  
  src.test.control.autocomplete.WhenClearingTheAutoComplete.describe();
  
});
