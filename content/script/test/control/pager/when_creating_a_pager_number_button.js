goog.require('src.base.control.pager');
goog.provide('src.test.control.pager.whenCreatingAPagerNumberButton');

/**
 @export
 */
src.test.control.pager.whenCreatingAPagerNumberButton.describe = function () {
  
  //Using
  var Current_ = src.base.control.pager;
  
  
  //Fields
  var Id_ = -12;
  
  var clone_;
  var createADiv_;
  var findNode_;
  var options_;
  var pagerContainer_;
  var pagerOptions_;
  var removeAllEvents_;
  var setClick_;
  var setTextContent_;
  
  //Test Hooks
  beforeEach(function() {
    options_ = {};
    pagerContainer_ = {};
    pagerOptions_ = {};
    
    clone_ = function(){ return {}; };
    createADiv_ = function() { return {}; };
    findNode_ = function(){ return {}; };
    removeAllEvents_ = function(){};
    setClick_ = function(){};
    setTextContent_ = function(){};
  });
  
  //Support Methods
  var callTheMethod_ = function() {
    return Current_.createAPagerNumberButton(Id_, options_, pagerOptions_, pagerContainer_,
                                             findNode_, removeAllEvents_, clone_,
                                             createADiv_, setTextContent_, setClick_);
  };
  
  
  //Test Methods
  
  it('should find an existing button.', function() {
    var methodWasCalled = false;
    var item = {};
    item['id'] = Id_;
    
    findNode_ = function(element, toDo){
      methodWasCalled = element  === pagerContainer_ &&
        toDo(item);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });

  
  it('should remove all events if the button exists.', function() {
    var methodWasCalled = false;
    var existingButton = {};
    
    findNode_ = function() {
      return existingButton;
    };

    removeAllEvents_ = function(item){
      methodWasCalled = item === existingButton;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });

  
  it('should not remove any events if the button did not exist.', function() {
    var methodWasCalled = false;
    findNode_ = function(){
      return null;
    };
    
    removeAllEvents_ = function(){
      methodWasCalled = true;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(false);
  });
  
  
  it('should create a button if one did not exist.', function() {
    var methodWasCalled = false;
    
    findNode_ = function(){
      return null;
    };
    
    createADiv_ = function(attributes){
      methodWasCalled = attributes['id'] === Id_ &&
        attributes['class'] === Current_.PagerClass;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should set the text if a button is created.', function() {
    var methodWasCalled = false;
    var div = {};

    findNode_ = function(){
      return null;
    }; 
    
    createADiv_ = function(){
      return div;
    };
    
    setTextContent_ = function(element, text){
      methodWasCalled = element === div &&
        text === Id_;
    };
    
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should clone the options.', function() {
    var methodWasCalled = false;
    
    clone_ = function(options){
      methodWasCalled = options === options_;
      return {};
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });

   
  it('should disable the button that is the current page.', function() {
    var methodWasCalled = false;
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });

  
  it('should set the click event for the next pager.', function() {
    var methodWasCalled = false;
    var theButton = {};
    var clonedOptions = {};
    
    findNode_ = function() {
      return theButton;
    };
    
    clone_ = function() {
      return clonedOptions;
    };
    
    pagerOptions_[Current_.Refresh] = function(options) {
      methodWasCalled = methodWasCalled ||
        options === clonedOptions &&
        clonedOptions[Current_.Parameters][Current_.ParametersPage] === Id_;
    };
    
    setClick_ = function(button, toDo) {
      methodWasCalled = button === theButton;
      toDo();
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
};


describe('When when creating a pager number button, it', function() {
  
  src.test.control.pager.whenCreatingAPagerNumberButton.describe();
  
});
