goog.require('goog.string');
goog.require('src.base.control.autocomplete');
goog.provide('src.test.control.autocomplete.whenResettingAnAutocomplete');

/**
 @export
 */
src.test.control.autocomplete.whenResettingAnAutocomplete.describe = function () {
  
  
  //Using
  
  var Current_ = src.base.control.autocomplete;
  
  
  //Fields
  
  var HiddenId_ = goog.string.getRandomString();
  var InputClass_ = goog.string.getRandomString();
  
  var autocomplete_;
  var findNode_;
  var getElementByClass_;
  var options_;
  var setValue_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    autocomplete_ = {};
    options_ = {};
    options_[Current_.HiddenId] = HiddenId_;
    options_[Current_.InputClass] = InputClass_;
    
    findNode_ = function(){};
    getElementByClass_ = function(){};
    setValue_ = function(){};
  });
  
  //Support Methods
  var callTheMethod_ = function() {
    return Current_.clearTheAutocomplete(autocomplete_, options_,
                                         setValue_, findNode_,
                                         getElementByClass_);
  };
  
  
  //Test Methods
  
  it('should find the hidden element.', function() {
    var callCount = 0;
    var item = {};
    item['id'] = HiddenId_;
    
    findNode_ = function(parent, toFind){
      callCount += parent === autocomplete_ &&
        toFind(item);
    }; 
    
    callTheMethod_();
    
    expect(callCount).toBe(1);
  });
  
  
  it('should set the value of the hidden to nothing.', function() {
    var methodCount = 0;
    var hidden = {};
    
    findNode_ = function() {
      return hidden;
    };
    
    setValue_ = function(parent, value){
      methodCount += parent === hidden &&
        value === '';
    };
    
    callTheMethod_();
    
    expect(methodCount).toBe(1);
  });
  
  
  it('should find the textbox box.', function() {
    var methodWasCalled = false;
    
    getElementByClass_ = function(cssClass, parent){
      methodWasCalled = cssClass === InputClass_ &&
        parent === autocomplete_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should set the textbox value to nothing.', function() {
    var methodCount = 0;
    var textbox = {};
    
    getElementByClass_ = function(){
      return textbox;
    };
    
    setValue_ = function(parent, value){
      methodCount += parent === textbox &&
        value === '';
    };
    
    callTheMethod_();
    
    expect(methodCount).toBe(1);
  });
};


describe('When resetting an autocomplete, it', function() {
  
  src.test.control.autocomplete.whenResettingAnAutocomplete.describe();
  
});
