goog.require('src.base.control.pager');
goog.provide('src.test.control.pager.whenCreatingAPagerNumberButton');

/**
 @export
 */
src.test.control.pager.whenCreatingAPagerNumberButton.describe = function() {
  
  //Using
  var Current_ = src.base.control.pager;
  
  
  //Fields
  var Id_ = -12;
  
  var appendChild_;
  var button_;
  var clone_;
  var cloneOptions_;
  var createADiv_;
  var findNode_;
  var options_;
  var pagerContainer_;
  var pagerOptions_;
  var pageNumber_;
  var removeAllEvents_;
  var setClick_;
  var setTextContent_;
  var swap_;
  
  //Test Hooks
  beforeEach(function() {
    options_ = {};
    options_[Current_.Parameters] = {};
    options_[Current_.Parameters][Current_.Parameterspage] = Id_ + 1;
    
    pagerContainer_ = {};
    pagerOptions_ = {};
    
    
    button_ = {};
    
    appendChild_ = function() {};
    createADiv_ = function() { return button_; };
    clone_ = function() { };
    cloneOptions_ = function() {};
    findNode_ = function() { return button_; };
    removeAllEvents_ = function() {};
    setClick_ = function() {};
    setTextContent_ = function() {};
    swap_ = function() {};
  });
  
  //Support Methods
  var callTheMethod_ = function() {
    return Current_.createAPagerNumberButton(Id_, options_, pagerOptions_,
                                             pagerContainer_, findNode_, removeAllEvents_,
                                             clone_, cloneOptions_, createADiv_, appendChild_,
                                             setTextContent_, swap_, setClick_);
  };
  
  
  //Test Methods
  
  it('should find an existing button.', function() {
    var methodWasCalled = false;
    var item = {};
    item['id'] = Id_.toString();
    
    findNode_ = function(element, toDo) {
      methodWasCalled = element === pagerContainer_ &&
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
    
    removeAllEvents_ = function(item) {
      methodWasCalled = item === existingButton;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should not remove any events if the button did not exist.', function() {
    var methodWasCalled = false;
    findNode_ = function() {
      return null;
    };
    
    removeAllEvents_ = function() {
      methodWasCalled = true;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(false);
  });
  
  
  it('should create a button if one did not exist.', function() {
    var methodWasCalled = false;
    
    findNode_ = function() {
      return null;
    };
    
    createADiv_ = function(attributes) {
      methodWasCalled = attributes['id'] === Id_ &&
        attributes['class'] === Current_.PagerClass;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should set the text if a button is created.', function() {
    var methodWasCalled = false;
    var div = {};
    
    findNode_ = function() {
      return null;
    };
    
    createADiv_ = function() {
      return div;
    };
    
    setTextContent_ = function(element, text) {
      methodWasCalled = element === div &&
        text === Id_ + 1;
    };
    
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should append a button if a button is created.', function() {
    var methodWasCalled = false;
    var div = {};
    
    findNode_ = function() {
      return null;
    };
    
    createADiv_ = function() {
      return div;
    };
    
    appendChild_ = function(parent, child){
      methodWasCalled = parent === pagerContainer_ &&
        child === div;
    };
    
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should disable the button that is the current page.', function() {
    var methodWasCalled = false;
    
    options_[Current_.Parameters][Current_.ParametersPage] = Id_;
    
    swap_ = function(button, enableClass, disableClass) {
      methodWasCalled = button === button_ &&
        enableClass === Current_.PagerClass &&
        disableClass === Current_.DisabledPagerClass;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should enable the button that is not the current page.', function() {
    var methodWasCalled = false;
    
    swap_ = function(button, disableClass, enableClass) {
      methodWasCalled = button === button_ &&
        disableClass === Current_.DisabledPagerClass &&
        enableClass === Current_.PagerClass;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  
  it('should clone the options.', function() {
    var methodWasCalled = false;
    
    cloneOptions_ = function(options, newPageNumber, clone) {
      methodWasCalled = options === options_ &&
        newPageNumber === Id_ &&
        clone === clone_;
      
      return {};
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  it('should set the click event for the button.', function() {
    var methodWasCalled = false;
    var theButton = {};
    var clone = {};
    
    findNode_ = function() {
      return theButton;
    };
    
    cloneOptions_ = function() {
      
      return clone;
    };
    
    pagerOptions_[Current_.Refresh] = function(options) {
      methodWasCalled = methodWasCalled ||
        options === clone;
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
